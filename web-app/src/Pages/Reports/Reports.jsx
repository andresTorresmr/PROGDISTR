import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { Monthly } from "./TimeLine";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Reports = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="flex justify-center"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Ventas totales" {...a11yProps(0)} />
          <Tab label="Semanal" {...a11yProps(1)} />
          <Tab label="Mensual" {...a11yProps(2)} />
          <Tab label="Anual" {...a11yProps(2)} />
          <Tab label="Productos" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        Semanal
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Monthly />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Anual
      </TabPanel>
      <TabPanel value={value} index={4}>
        Productos
      </TabPanel>
    </>
  );
};

export default Reports;
