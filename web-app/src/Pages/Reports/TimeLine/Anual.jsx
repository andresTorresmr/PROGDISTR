import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useFetchAndLoad } from "../../../hooks";
import { anual_report_service } from "../../../services";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";
import Loading from "../../Loading/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

const Anual = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [dataSet, setDataSet] = useState({
    labels: "",
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const handleCharge = async () => {
    let chartRender;
    let chartLabels = [];
    let chartDataSet = [];
    const { data } = await callEndpoint(anual_report_service());
    for (let month of data) {
      chartLabels.push(month.month);
      chartDataSet.push(month.total);
    }
    chartRender = {
      labels: chartLabels,
      datasets: [
        {
          label: "Ventas mensuales ($)",
          data: chartDataSet,
          backgroundColor: "rgba(51, 65, 85, 0.5 )",
        },
      ],
    };
    setDataSet(chartRender);
  };

  useEffect(() => {
    handleCharge();
  }, []);

  return (
    <>
      {!loading && dataSet ? (
        <div className="flex flex-col items-center justify-center">
          <Typography variant="h3">Reporte anual</Typography>
          <div className="h-3/4  w-3/4">
            <Bar options={options} data={dataSet} />
          </div>
        </div>
      ) : (
        // <Bar options={options} data={dataSet} />
        <Loading />
      )}
    </>
  );
};

export default Anual;
