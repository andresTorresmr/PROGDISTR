import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { Daily } from "./TimeLine";

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
          <Typography>{children}</Typography>
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Ventas totales" {...a11yProps(0)} />
          <Tab label="Diario" {...a11yProps(1)} />
          <Tab label="Semanal" {...a11yProps(2)} />
          <Tab label="Mensual" {...a11yProps(2)} />
          <Tab label="Anual" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Daily />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Diario
      </TabPanel>
      <TabPanel value={value} index={2}>
        Semanal
      </TabPanel>
      <TabPanel value={value} index={3}>
        Mensual
      </TabPanel>
      <TabPanel value={value} index={4}>
        Anual
      </TabPanel>
    </>
  );
};

export default Reports;
