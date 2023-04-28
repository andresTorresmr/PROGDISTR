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
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBrand } from "../../../redux/states/brand.state";
import { useSnackbar } from "notistack";
import { update_brand, update_product } from "../../../services";
import { useFetchAndLoad } from "../../../hooks";
import { updateProduct } from "../../../redux/states/product.state";
import { productAdapter } from "../../../adapters";

const UpdateProductModal = ({
  product,
  brands,
  openUpdate,
  setOpenUpdate,
  status,
  setStatus,
  brandValue,
  setBrandValue,
}) => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();
  const name = useRef();
  const stock = useRef();
  const unitPrice = useRef();
  const sellPrice = useRef();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setBrandValue(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let product_upt;
    let brandName = brands.filter((item) => item.id == brandValue);
    brandName = brandName[0].name;

    product_upt = {
      idProduct: product.id,
      name: name.current.value,
      idBrand: brandValue,
      brand: brandName,
      stock: stock.current.value,
      unitPrice: unitPrice.current.value,
      sellPrice: sellPrice.current.value,
      status: status,
    };

    try {
      dispatch(updateProduct(productAdapter(product_upt)));
      const fetch = await callEndpoint(update_product(product_upt, product.id));
      if (fetch.status == 200) {
        enqueueSnackbar("Producto actualizado exitosamente.", {
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
            Actualizar producto
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ mt: 3, mb: 2, minWidth: "100%" }} size="medium">
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                defaultValue={product.name}
                inputRef={name}
                autoFocus
              />
            </FormControl>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl sx={{ width: "60%" }} size="small">
                <InputLabel id="marca">Marca</InputLabel>
                <Select
                  labelId="marca"
                  id="marca"
                  value={brandValue}
                  label="marca"
                  onChange={handleChange}
                >
                  {brands &&
                    brands.map((brand) => (
                      <MenuItem value={brand.id ? brand.id : ""} key={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "40%" }} size="small">
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
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
              <FormControl sx={{ width: "50%" }} size="medium">
                <TextField
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                  defaultValue={product.stock}
                  inputRef={stock}
                />
              </FormControl>
              <FormControl sx={{ width: "50%" }} size="medium">
                <TextField
                  id="outlined-basic"
                  label="Precio unitario"
                  variant="outlined"
                  defaultValue={product.unitPrice}
                  inputRef={unitPrice}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
              <FormControl sx={{ width: "50%" }} size="medium">
                <TextField
                  id="outlined-basic"
                  label="Precio de venta"
                  variant="outlined"
                  defaultValue={product.sellPrice}
                  inputRef={sellPrice}
                />
              </FormControl>
            </Box>

            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              Guardar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateProductModal;
