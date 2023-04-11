import { Modal, Typography, Button, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { delete_product } from "../../../services";
import { useFetchAndLoad } from "../../../hooks";
import { deleteProduct } from "../../../redux/states/product.state";

const DeleteProductModal = ({ id, openDelete, setOpenDelete }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, callEndpoint } = useFetchAndLoad();

  const handleDelete = async () => {
    try {
      dispatch(deleteProduct(id));
      const response = await callEndpoint(delete_product(id));
      if (response.status == 200) {
        enqueueSnackbar("Registro eliminado exitosamente.", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "success",
          autoHideDuration: 2000,
        });
        setOpenDelete(false);
      } else {
        throw Error("Error al eliminar el registro");
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
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openDelete}
      onClose={() => {
        setOpenDelete(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openDelete}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            sx={{ textAlign: "center", mb: 5 }}
            component="h2"
          >
            ¿Seguro que deseas eliminar este registro?
          </Typography>

          <Box sx={{ display: "flex", gap: 5 }}>
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              type="submit"
              autoFocus
              onClick={() => setOpenDelete(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              type="submit"
              color="error"
              onClick={handleDelete}
            >
              Si, eliminar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteProductModal;
