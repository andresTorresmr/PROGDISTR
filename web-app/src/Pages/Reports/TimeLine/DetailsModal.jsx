import {
  Box,
  Divider,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useFetchAndLoad } from "../../../hooks";
import { useEffect } from "react";
import { get_sell_details } from "../../../services";
import { sellDetailsAdapter } from "../../../adapters/sell.adapter";
import { useState } from "react";

const DetailsModal = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [product, setProduct] = useState({});

  const handleCharge = async () => {
    const { data } = await callEndpoint(get_sell_details(70));
    setProduct(sellDetailsAdapter(data));
  };

  useEffect(() => {
    handleCharge();
  }, []);

  return (
    <Paper
      elevation={6}
      className="w-[500px] rounded-xl overflow-hidden flex flex-col space-y-4"
    >
      <Box className="px-5 py-5 bg-amber-500">
        <Typography variant="h6" className="text-white text-2xl">
          Detalles de la venta
        </Typography>
      </Box>
      <Box className="px-5 py-3 space-y-3 ">
        {product && (
          <>
            <Typography className="text-lg">
              Número de venta: {product.id}
            </Typography>
            <Typography className="text-lg ">
              Plataforma: {product.name}
            </Typography>
            <Typography className="text-lg ">
              Fecha de venta: {product.dateCreated}
            </Typography>

            <Typography className="text-lg">Detalles de la venta: </Typography>
            <TableContainer>
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
            <Typography className="text-3xl font-bold">
              Total: ${product.total}
            </Typography>
            <Box className="flex gap-10">
              <Typography className="text-lg">
                Pago con: ${product.pays}
              </Typography>
              <Typography className="text-lg">
                Cambio: ${product.change}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default DetailsModal;
