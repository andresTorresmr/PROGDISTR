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
import { methodAdapter, productAdapter } from "../../../adapters";
import { useFetchAndLoad } from "../../../hooks";
import { setProduct } from "../../../redux/states/product.state";
import { insert_method, insert_product } from "../../../services";
import { SnackbarProvider, useSnackbar } from "notistack";
import { setMethod } from "../../../redux/states/method.state";

const AddMethodModal = ({ open, setOpen, brands }) => {
  const [brandValue, setBrandValue] = React.useState("");
  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();
  const name = useRef();
  const stock = useRef();
  const unitPrice = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    let method_data;
    e.preventDefault();
    method_data = {
      name: name.current.value,
    };
    try {
      // console.log(product_data);
      const { data } = await callEndpoint(insert_method(method_data));
      dispatch(setMethod(methodAdapter(data[0])));

      enqueueSnackbar("Plataforma agregada exitosamente.", {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "success",
        autoHideDuration: 2000,
      });
      setOpen(false);
    } catch (error) {
      enqueueSnackbar(error.message, {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleChange = (event) => {
    setBrandValue(event.target.value);
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
            Agregar plataforma
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ mt: 3, mb: 2, minWidth: "100%" }} size="medium">
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                inputRef={name}
                autoFocus
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

export default AddMethodModal;
