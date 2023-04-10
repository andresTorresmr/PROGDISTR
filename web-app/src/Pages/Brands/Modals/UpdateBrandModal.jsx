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

const UpdateBrandModal = ({ id, openUpdate, setOpenUpdate }) => {
  const [brand_status, setBrand_status] = React.useState("");
  const name = useRef();

  const handleChange = (event) => {
    setBrand_status(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (e) => {
    let brand;
    e.preventDefault();
    brand = {
      id,
      name: name.current.value,
      status: brand_status,
    };
    try {
      console.log(brand);
      // const { data } = await callEndpoint(insert_brand(brand));

      // dispatch(setBrand(brandAdapter(data[0])));
      // enqueueSnackbar("Marca agregada exitosamente.", {
      //   anchorOrigin: { vertical: "top", horizontal: "right" },
      //   variant: "success",
      //   autoHideDuration: 2000,
      // });
      // setOpen(false);
    } catch (error) {
      enqueueSnackbar(error.message, {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "success",
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
