import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircleOutline,
  RadioButtonChecked,
  ShortText,
  Subject,
  ArrowDropDownCircle,
  Event,
  AccessTime,
  UploadFile,
} from "@mui/icons-material";
import { changeInputType } from "../../../reducers/formObjectReducer";

export default function AddInput() {
  const currSectionId = useSelector((state) => state.formObject.currSectionId);
  const currComponentId = useSelector(
    (state) => state.formObject.currComponentId
  );
  const dispatch = useDispatch();
  const formObject = useSelector((state) => state.formObject);
  let currComponent = formObject.form_sections
    .find((section) => section.section_id === currSectionId)
    .section_components.find(
      (component) => component.component_id === currComponentId
    );

  if (currComponent === undefined) {
    currComponent = formObject.form_sections.find(
      (section) => section.section_id === currSectionId
    ).section_components[0];
  }
  let currComponentType = currComponent.component_type;

  const handleOptionChange = (event) => {
    dispatch(
      changeInputType({
        section_id: currSectionId,
        component_id: currComponentId,
        component_type: event.target.value,
      })
    );
  };

  const inputOptions = [
    {
      id: "short_text",
      label: "Short text",
      icon: <ShortText fontSize="smaller" />,
    },
    {
      id: "long_text",
      label: "Long text",
      icon: <Subject fontSize="smaller" />,
    },
    {
      id: "checkboxes",
      label: "Checkboxes",
      icon: <CheckCircleOutline fontSize="smaller" />,
    },
    {
      id: "multiple_choice",
      label: "Multiple choice",
      icon: <RadioButtonChecked fontSize="smaller" />,
    },
    {
      id: "dropdown",
      label: "Dropdown",
      icon: <ArrowDropDownCircle fontSize="smaller" />,
    },
    { id: "date", label: "Date", icon: <Event fontSize="smaller" /> },
    { id: "time", label: "Time", icon: <AccessTime fontSize="smaller" /> },
    {
      id: "upload_file",
      label: "Upload file",
      icon: <UploadFile fontSize="smaller" />,
    },
  ];

  return (
    <select
      className="add-input-select"
      value={currComponentType}
      onChange={handleOptionChange}
    >
      <option value="" disabled>
        Select an option
      </option>
      {inputOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
