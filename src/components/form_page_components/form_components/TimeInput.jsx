import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {updateResponse} from "../../../reducers/formResponseObjectReducer";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import {MobileTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const TimeInput = ({component, currSectionId}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(dayjs(new Date()));
    const [component_prop_object, setComponent_prop_object] = useState({});

    useEffect(() => {
        setComponent_prop_object(component.component_prop_object);
        if (component.component_prop_object.answer) {
            setValue(dayjs(component.component_prop_object.answer, "HH:mm"));
        } else {
            setValue(dayjs(new Date()));
        }
    }, [component, currSectionId]);

    const handleTimeChange = (newValue) => {
        setValue(newValue);

        dispatch(
            updateResponse({
                component_id: component.component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component.component_prop_object,
                    answer: newValue.format("HH:mm"),
                },
            })
        );
    };

    return (
        <div className="time-input-container">
            <div className="form question">
                <TextareaAutosize
                    className="input"
                    placeholder="Question"
                    value={component.component_prop_object.question}
                    readOnly
                    minRows={1}
                />
                <span className="input-border"></span>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                    label="Select time"
                    value={value}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{margin: "0.5rem"}}
                />
            </LocalizationProvider>
        </div>
    );
};
