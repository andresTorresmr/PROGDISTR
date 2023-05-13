import {
  Box,
  IconButton,
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
import { get_all_sells } from "../../../services";
import { useEffect } from "react";
import { useState } from "react";
import { sellAdapter } from "../../../adapters/sell.adapter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SellDetails from "./SellDetails";
import Loading from "../../Loading/Loading";
import { enqueueSnackbar } from "notistack";

const SellsReports = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [sells, setSells] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(70);

  const handleCharge = async () => {
    try {
      let sellCharge;
      const { data } = await callEndpoint(get_all_sells());
      sellCharge = data;

      sellCharge.map((sell, index) => {
        sellCharge[index] = sellAdapter(sell);
      });
      setSells(sellCharge);
    } catch (error) {
      if (error.response.status === 401) {
        alert("Error de token");
      }
      enqueueSnackbar(error.message, {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleOpen = (id_product) => {
    setOpen(true);
    setId(id_product);
  };

  useEffect(() => {
    handleCharge();
  }, []);

  return (
    <>
      <SellDetails open={open} setOpen={setOpen} id={id} />
      <Box className="flex flex-col items-center gap-10 md:gap-20">
        <Typography variant="h3">Historial de ventas</Typography>
        {loading && sells ? (
          <Loading />
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table
              sx={{ minWidth: 250 }}
              aria-label="simple table"
              className=""
            >
              <TableHead className="">
                <TableRow className="">
                  <TableCell
                    className="text-slate-700 font-semibold text-md"
                    align="right"
                  >
                    #
                  </TableCell>
                  <TableCell
                    className="text-slate-700 font-semibold text-md"
                    align="center"
                  >
                    Plataforma
                  </TableCell>
                  <TableCell
                    className="text-slate-700 font-semibold text-md"
                    align="center"
                  >
                    total
                  </TableCell>
                  <TableCell
                    className="text-slate-700 font-semibold text-md"
                    align="center"
                  >
                    Fecha de venta
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody className="">
                {sells.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      {item.id}
                    </TableCell>
                    <TableCell align="center">{item.platform}</TableCell>
                    <TableCell align="center">${item.total}</TableCell>

                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(item.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default SellsReports;
