import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { setComponentPropObject } from "../../../reducers/formObjectReducer";
import { TextareaAutosize } from "@mui/base";
import { MobileTimePicker } from "@mui/x-date-pickers";

export const TimeInput = ({ component_id, currSectionId }) => {
  const [value, setValue] = useState(dayjs(new Date()));
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [component_prop_object, setComponent_prop_object] = useState({});

  const handleChange = (event) => {
    const updatedText = event.target.value;
    setText(updatedText);
    setComponent_prop_object({
      ...component_prop_object,
      question: updatedText,
    });
    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          question: updatedText,
        },
      })
    );
  };

  useEffect(() => {
    const currComponent = formSectionsArray
      .find((section) => section.section_id === currSectionId)
      .section_components.find(
        (component) => component.component_id === component_id
      );
    setComponent_prop_object(currComponent.component_prop_object);
    setText(currComponent.component_prop_object.question);
  }, [formSectionsArray, currSectionId, component_id]);
  return (
    <>
      <div className="time-input-container">
        <div className="form question">
          <TextareaAutosize
            className="input"
            placeholder="Question"
            value={text}
            onChange={handleChange}
            minRows={1}
          />
          <span className="input-border"></span>
        </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          label="select time"
          defaultValue={dayjs(new Date())}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          sx={{ margin: "0.5rem" }}
        />
      </LocalizationProvider>
    </>
  );
};
