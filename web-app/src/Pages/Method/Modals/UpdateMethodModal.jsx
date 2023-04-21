import {
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { update_method } from "../../../services";
import { useFetchAndLoad } from "../../../hooks";
import { methodAdapter } from "../../../adapters";
import { updateMethod } from "../../../redux/states/method.state";

const UpdateMethodModal = ({
  method,
  openUpdate,
  setOpenUpdate,
  status,
  setStatus,
}) => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();
  const name = useRef();
  const dispatch = useDispatch();

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let method_upt;

    method_upt = {
      idMethod: method.id,
      name: name.current.value,
      status: status,
    };

    try {
      dispatch(updateMethod(methodAdapter(method_upt)));
      const fetch = await callEndpoint(update_method(method_upt, method.id));
      if (fetch.status == 200) {
        enqueueSnackbar("Plataforma actualizada exitosamente.", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "success",
          autoHideDuration: 2000,
        });
        setOpenUpdate(false);
      } else {
        throw Error("Error al actualizar el registro");
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openUpdate}
      onClose={() => {
        setOpenUpdate(false);
        setStatus("");
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openUpdate}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            sx={{ textAlign: "center" }}
            component="h2"
          >
            Actualizar plataforma
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ mt: 3, mb: 2, minWidth: "100%" }} size="medium">
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                defaultValue={method.name}
                inputRef={name}
                autoFocus
              />
            </FormControl>

            <FormControl sx={{ width: "100%", mb: 2 }} size="small">
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={status}
                label="status"
                onChange={handleChangeStatus}
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={2}>Inactivo</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              Guardar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateMethodModal;
