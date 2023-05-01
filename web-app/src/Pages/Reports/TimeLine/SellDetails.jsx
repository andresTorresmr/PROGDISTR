import {
  Modal,
  Typography,
  Button,
  Fade,
  Paper,
  ListItemText,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import React from "react";
import DetailsModal from "./DetailsModal";
import { useFetchAndLoad } from "../../../hooks";
import { useState } from "react";
import { sellDetailsAdapter } from "../../../adapters/sell.adapter";
import { useEffect } from "react";
import { get_sell_details } from "../../../services";

const SellDetails = ({ open, setOpen, id = 70 }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    overflow: "hidden",
  };

  const { loading, callEndpoint } = useFetchAndLoad();
  const [product, setProduct] = useState({});

  const handleCharge = async () => {
    const { data } = await callEndpoint(get_sell_details(id));
    console.log(sellDetailsAdapter(data));
    setProduct(sellDetailsAdapter(data));
  };

  useEffect(() => {
    handleCharge();
    console.log(id);
  }, [id]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} elevation={6} component={Paper}>
          <Box sx={{ padding: 3, backgroundColor: "#f59e0b", color: "white" }}>
            <Typography variant="h6">Detalles de la venta</Typography>
          </Box>
          <Box sx={{ paddingInline: 3, paddingBlock: 3 }}>
            {product && (
              <>
                <Typography sx={{ mb: 1 }}>
                  Número de venta: {product.id}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Plataforma: {product.name}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Fecha de venta: {product.dateCreated}
                </Typography>

                <Typography sx={{ mb: 1 }}>Detalles de la venta: </Typography>
                <TableContainer sx={{ mb: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Unidades</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Importe</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.details &&
                        product.details.map((detail, index) => (
                          <TableRow key={index}>
                            <TableCell>{detail.quantity}</TableCell>
                            <TableCell>
                              <ListItemText
                                primary={detail.product}
                                secondary={detail.brand}
                              />
                            </TableCell>
                            <TableCell>${detail.sellPrice}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography
                  sx={{ mb: 1, fontSize: "25px", fontWeight: "bold" }}
                  className="text-3xl font-bold"
                >
                  Total: ${product.total}
                </Typography>
                <Box className="flex gap-10">
                  <Typography sx={{ mb: 1 }}>
                    Pago con: ${product.pays}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    Cambio: ${product.change}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SellDetails;
