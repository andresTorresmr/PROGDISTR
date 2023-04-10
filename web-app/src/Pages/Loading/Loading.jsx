import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-[99%] fixed flex items-center justify-center">
      <CircularProgress className="text-slate-700" size={150} thickness={1} />
    </div>
  );
};

export default Loading;
