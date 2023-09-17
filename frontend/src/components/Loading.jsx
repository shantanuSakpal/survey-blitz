import React from "react";
import { CircularProgress } from "@mui/material";

function Loading({ message }) {
  return (
    <div className="loading-page">
      {message ? (
        <div className="loading-message">
          <h1>{message}</h1>
        </div>
      ) : (
        <CircularProgress disableShrink sx={{ color: "#06d6a0" }} />
      )}
    </div>
  );
}

export default Loading;
