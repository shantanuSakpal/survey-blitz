import React from "react";
import TextField from "@mui/material/TextField";

export const LongTextInput = (props) => {
  return (
    <div>
      {/* <h3 className="input-label">{props.label}</h3> */}
      <TextField
        id="outlined-basic"
        label={props.label}
        placeholder={props.placeholder}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
    </div>
  );
};
