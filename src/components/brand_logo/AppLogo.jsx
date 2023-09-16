import React from "react";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

function AppLogo(props) {
  return (
    <div className="brand-name">
      <div className="brand-logo">
        <DynamicFormIcon />
      </div>
      <a href="/home">
        <span>Survey</span>
        <span>Blitz</span>
      </a>
    </div>
  );
}

export default AppLogo;
