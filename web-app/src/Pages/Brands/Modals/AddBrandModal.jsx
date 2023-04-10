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
import { brandAdapter } from "../../../adapters";
import { useFetchAndLoad } from "../../../hooks";
import { setBrand } from "../../../redux/states/brand.state";
import { insert_brand } from "../../../services";
import { SnackbarProvider, useSnackbar } from "notistack";

const AddBrandModal = ({ open, setOpen }) => {
  const [status, setStatus] = React.useState("");
  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();
  const name = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    let brand;
    e.preventDefault();
    brand = {
      name: name.current.value,
    };
    try {
      const { data } = await callEndpoint(insert_brand(brand));

      dispatch(setBrand(brandAdapter(data[0])));
      enqueueSnackbar("Marca agregada exitosamente.", {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "success",
        autoHideDuration: 2000,
      });
      setOpen(false);
    } catch (error) {
      enqueueSnackbar(error.message, {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
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
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            sx={{ textAlign: "center" }}
            component="h2"
          >
            Agregar marca
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ mt: 3, mb: 2, minWidth: "100%" }} size="medium">
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                inputRef={name}
              />
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

export default AddBrandModal;
