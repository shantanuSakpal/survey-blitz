import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import ConfirmDelete from "../modals/ConfirmDelete";

export const DeleteButton = ({ color }) => {
  return (
    <div>
      <DeleteForeverIcon
        fontSize="small"
        sx={{
          marginRight: "10px",
          color: "gray",
          ":hover": { color: color },
          transition: "all 0.1s ease-in-out",
        }}
      />
    </div>
  );
};
