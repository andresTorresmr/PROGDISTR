import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useFetchAndLoad } from "../../../hooks";
import {
  get_month_report,
  get_product_monthly_report,
} from "../../../services";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { product_report_Adapter } from "../../../adapters";

ChartJS.register(ArcElement, Tooltip, Legend);

const Monthly = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [labels, setLabels] = useState([]);
  const [chartData, setData] = useState({});
  const [productReport, setProductReport] = useState([]);
  const [month, setMonth] = useState("");
  const months = [
    {
      id: 4,
      name: "Abril",
    },
    {
      id: 5,
      name: "Mayo",
    },
  ];

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const handleLoadProdducts = async (monthid) => {
    setData([]);
    let info;
    const { data } = await callEndpoint(get_month_report(monthid));
    info = data;
    for (let product of info) {
      product = product_report_Adapter(product);
    }
  };

  const handleCharge = async (monthid) => {
    setData({});
    let chartRender;
    let nameChart = [];
    let dataChart = [];
    let productReport = [];
    const { data } = await callEndpoint(get_month_report(monthid));
    const products_report = await callEndpoint(
      get_product_monthly_report(monthid)
    );

    productReport = products_report.data;
    productReport.map((item, index) => {
      productReport[index] = product_report_Adapter(item);
    });

    for (let day of data) {
      nameChart.push(day.day);
      dataChart.push(day.total);
    }
    chartRender = {
      labels: nameChart,
      datasets: [
        {
          label: "Ventas ($) ",
          data: dataChart,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setData(chartRender);

    setProductReport(productReport);
  };

  const handleChange = (event) => {
    setMonth(event.target.value);
    console.log(event.target);
    handleCharge(event.target.value);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Mes</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={month}
          label="Mes"
          onChange={handleChange}
        >
          {months.map((month) => (
            <MenuItem value={month.id} key={month.id}>
              {month.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Selecciona un mes para revisar el reporte
        </FormHelperText>
      </FormControl>
      {/* <Button variant="contained" onClick={() => handleCharge(4)}>
        Leer mes
      </Button> */}

      <div className="w-full flex items-center md:items-start gap-10 md:gap-0 flex-col-reverse  md:flex-row">
        {!isObjEmpty(chartData) && (
          <Paper
            className="w-full md:w-1/3 rounded-3xl py-10 px-8"
            elevation={3}
          >
            <Typography variant="h5">Reporte de productos</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Ventas (unidad)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productReport.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.sells}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        <div className=" w-1/2 md:w-1/3">
          <h1 className="text-center">{}</h1>
          {!isObjEmpty(chartData) && <Doughnut data={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default Monthly;
