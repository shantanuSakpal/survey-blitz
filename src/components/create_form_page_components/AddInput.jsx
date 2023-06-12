import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function AddInput({ currSectionId, setFormComponentsArray }) {
  const setSectionObj = (inputObj) => {
    if (currSectionId === null) {
      return;
    }

    setFormComponentsArray((formComponentsArray) => {
      const updatedArray = formComponentsArray.map((section) => {
        if (section.section_id === currSectionId) {
          return {
            ...section,
            section_components: [...section.section_components, inputObj],
          };
        }
        return section;
      });
      return updatedArray;
    });
  };

  // Rest of the component code...

  const addInput = (inputType) => {
    let inputObj = {
      input_id: Date.now(),
      input_type: inputType,
    };

    setSectionObj(inputObj);
  };

  const inputOptions = [
    {
      id: "short_text",
      label: "Short text",
      icon: <ShortTextIcon fontSize="small" />,
    },
    {
      id: "long_text",
      label: "Long text",
      icon: <SubjectIcon fontSize="small" />,
    },
    {
      id: "Checkboxes",
      label: "Checkboxes",
      icon: <CheckCircleOutlineIcon fontSize="small" />,
    },
    {
      id: "Multiple_choice",
      label: "Multiple choice",
      icon: <RadioButtonCheckedIcon fontSize="small" />,
    },
    {
      id: "dropdown",
      label: "Dropdown",
      icon: <ArrowDropDownCircleIcon fontSize="small" />,
    },
    { id: "Date", label: "Date", icon: <EventIcon fontSize="small" /> },
    { id: "Time", label: "Time", icon: <AccessTimeIcon fontSize="small" /> },
    {
      id: "Upload_file",
      label: "Upload file",
      icon: <UploadFileIcon fontSize="small" />,
    },
  ];

  return (
    <div id="addInput" className="inputs-container hide">
      <h3>Select the input type</h3>
      {inputOptions.map((option) => (
        <div
          key={option.id}
          id={option.id.toLowerCase()}
          className="input-name-and-logo-container"
          onClick={() => addInput(option.id.toLowerCase())}
        >
          {option.icon}
          <h4>{option.label}</h4>
        </div>
      ))}
    </div>
  );
}
