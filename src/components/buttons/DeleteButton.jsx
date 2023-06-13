import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import ConfirmDelete from "../modals/ConfirmDelete";

export const DeleteButton = ({ color }) => {
  return <DeleteForeverIcon fontSize="small" color={color} />;
};
