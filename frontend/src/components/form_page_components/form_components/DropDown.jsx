import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {updateResponse} from "../../../reducers/formResponseObjectReducer";

export const DropDown = ({component, currSectionId}) => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState("");
    const {options, question} = component.component_prop_object;

    useEffect(() => {
        setSelectedOption(component.component_prop_object.answer || "");
    }, [component.component_prop_object.answer]);

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;

        setSelectedOption(selectedValue);

        dispatch(
            updateResponse({
                component_id: component.component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component.component_prop_object,
                    answer: selectedValue,
                },
            })
        );
    };

    return (
        <div className="dropdown-input-container">
            <div className="form question">
                <TextareaAutosize
                    className="input"
                    placeholder="Question"
                    value={question}
                    readOnly
                    minRows={1}
                />
                <span className="input-border"></span>
            </div>

            <div className="dropdown-container">
                <select
                    className="dropdown-select"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    <option value="">Select an option</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
