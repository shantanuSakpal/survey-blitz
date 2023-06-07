import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function AddInputs({ addClickedComponent, formComponentsObj }) {
  const divs = document.getElementsByClassName("input-name-and-logo-container");

  for (let i = 0; i < divs.length; i++) {
    divs[i].onclick = function () {
      const divId = this.id.toLowerCase();
      console.log("Div clicked:", divId);

      let date = Date.now();
      addClickedComponent(date, divId);
    };
  }

  return (
    <div className=" column left-column-container">
      <h3>Select the input type</h3>
      <div className="inputs-container">
        <div id="short_text" className="input-name-and-logo-container">
          <ShortTextIcon fontSize="small" />
          <h4>Short text</h4>
        </div>
        <div id="long_text" className="input-name-and-logo-container">
          <SubjectIcon fontSize="small" />
          <h4>Long text</h4>
        </div>
        <div id="Checkboxes" className="input-name-and-logo-container">
          <CheckBoxIcon fontSize="small" />
          <h4>Checkboxes</h4>
        </div>
        <div id="Multiple_choice" className="input-name-and-logo-container">
          <RadioButtonCheckedIcon fontSize="small" />
          <h4>Multiple choice</h4>
        </div>
        <div id="dropdown" className="input-name-and-logo-container">
          <ArrowDropDownCircleIcon fontSize="small" />
          <h4>Dropdown</h4>
        </div>
        <div id="Date" className="input-name-and-logo-container">
          <EventIcon fontSize="small" />
          <h4>Date</h4>
        </div>
        <div id="Time" className="input-name-and-logo-container">
          <AccessTimeIcon fontSize="small" />
          <h4>Time</h4>
        </div>
        <div id="Upload_file" className="input-name-and-logo-container">
          <UploadFileIcon fontSize="small" />
          <h4>Upload file</h4>
        </div>
      </div>

      <h3>Components</h3>
      <div className="form-components-container">
        {formComponentsObj && (
          <ul>
            {Object.values(formComponentsObj).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AddInputs;
