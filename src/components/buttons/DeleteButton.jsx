import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const DeleteButton = (props) => {
  return (
    <DeleteForeverIcon
      fontSize="small"
      sx={{
        marginRight: "10px",
        color: "gray",
        ":hover": { color: props.color },
        transition: "all 0.1s ease-in-out",
      }}
    />
  );
};
