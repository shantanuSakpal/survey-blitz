import React from "react";
import { useNavigate } from "react-router-dom";
export default function Billing() {
  const navigate = useNavigate();
  const style1 = {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Makes the div cover the full viewport height
    color: "white",
    fontSize: "36px", // Adjust the font size as needed
  };
  const style2 = {
    color: "#18bed4",
    fontSize: "24px",
    cursor: "pointer",
    textDecoration: "underline",
    marginTop: "20px",
  };

  return (
    <div style={style1}>
      <div>The Billing feature is coming soon, stay tuned ! </div>
      <div style={style2} onClick={() => navigate("/home")}>
        Go back to home
      </div>
    </div>
  );
}
