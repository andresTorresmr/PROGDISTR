import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useFetchAndLoad } from "../../../hooks";
import { get_month_report } from "../../../services";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const Monthly = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [labels, setLabels] = useState([]);
  const [chartData, setData] = useState({});
  const [month, setMonth] = useState("");
  const months = [
    {
      id: 1,
      name: "Enero",
    },
    {
      id: 2,
      name: "Febrero",
    },
    {
      id: 3,
      name: "Marzo",
    },
    {
      id: 4,
      name: "Abril",
    },
    {
      id: 5,
      name: "Mayo",
    },
    {
      id: 6,
      name: "Junio",
    },
    {
      id: 7,
      name: "Julio",
    },
    {
      id: 8,
      name: "Agosto",
    },
    {
      id: 9,
      name: "Septiembre",
    },
    {
      id: 10,
      name: "Octubre",
    },
    {
      id: 11,
      name: "Noviembre",
    },
    {
      id: 12,
      name: "Diciembre",
    },
  ];

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const handleCharge = async (month) => {
    let chartRender;
    let nameChart = [];
    let dataChart = [];
    const { data } = await callEndpoint(get_month_report(month));
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
  };

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="flex justify-center items-center flex-col">
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
            <MenuItem value={month.id}>{month.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Selecciona un mes para revisar el reporte
        </FormHelperText>
      </FormControl>
      <Button variant="contained" onClick={() => handleCharge(4)}>
        Leer mes
      </Button>
      <div className="w-1/5">
        <h1 className="text-center">Marzo</h1>
        {!isObjEmpty(chartData) && <Doughnut data={chartData} />}
      </div>
    </div>
  );
};

export default Monthly;
