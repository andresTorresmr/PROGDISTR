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
import { updateBrand } from "../../../redux/states/brand.state";
import { useSnackbar } from "notistack";
import { update_brand } from "../../../services";
import { useFetchAndLoad } from "../../../hooks";

const UpdateBrandModal = ({
  brand,
  openUpdate,
  setOpenUpdate,
  brand_status,
  setBrand_status,
}) => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const name = useRef(brand.name);

  const handleChange = (event) => {
    setBrand_status(event.target.value);
  };
  const handleSubmit = async (e) => {
    let brand_upt;
    e.preventDefault();
    brand_upt = {
      id: brand.id,
      name: name.current.value,
      status: brand_status,
    };
    try {
      dispatch(updateBrand(brand_upt));
      const fetch = await callEndpoint(update_brand(brand_upt, brand.id));
      if (fetch.status == 200) {
        enqueueSnackbar("Marca actualizada exitosamente.", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "success",
          autoHideDuration: 2000,
        });
        setOpenUpdate(false);
      } else {
        throw Error("Error al actualizar el registro");
      }

      // dispatch(setBrand(brandAdapter(data[0])));
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
        setBrand_status("");
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
            Actualizar marca
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ mt: 3, mb: 2, minWidth: "100%" }} size="medium">
              <TextField
                id="outlined-basic"
                label="Nombre"
                defaultValue={brand.name}
                variant="outlined"
                inputRef={name}
              />
            </FormControl>
            <FormControl sx={{ mb: 2, minWidth: "100%" }} size="small">
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={brand_status}
                label="status"
                onChange={handleChange}
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

export default UpdateBrandModal;
