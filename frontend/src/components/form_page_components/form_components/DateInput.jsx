import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {updateResponse} from "../../../reducers/formResponseObjectReducer";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export const DateInput = ({component, currSectionId}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(dayjs(new Date()));
    const [component_prop_object, setComponent_prop_object] = useState({});

    useEffect(() => {
        setComponent_prop_object(component.component_prop_object);
        if (component.component_prop_object.answer) {
            setValue(dayjs(component.component_prop_object.answer));
        } else {
            setValue(dayjs(new Date()));
        }
    }, [currSectionId]);

    const handleDateChange = (newValue) => {
        setValue(newValue);

        dispatch(
            updateResponse({
                component_id: component.component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component.component_prop_object,
                    answer: newValue.format("YYYY-MM-DD"),
                },
            })
        );
    };

    return (
        <div className="date-input-container">
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
                <DatePicker
                    label="Select date"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{margin: "0.5rem"}}
                />
            </LocalizationProvider>
        </div>
    );
};
