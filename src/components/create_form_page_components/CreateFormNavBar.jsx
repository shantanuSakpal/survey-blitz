import React from "react";
import Button from "../buttons/button";
import WebStoriesIcon from "@mui/icons-material/WebStories";

function CreateFormNavBar(props) {
  return (
    <div data-role="navbar" className="navbar-container">
      <WebStoriesIcon />
      <h2>{props.formName}</h2>

      <div>
        <Button name={"Publish"} />
      </div>
    </div>
  );
}

export default CreateFormNavBar;
