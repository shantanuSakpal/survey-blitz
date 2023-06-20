import TextareaAutosize from "react-textarea-autosize";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {updateResponse} from "../../../reducers/formResponseObjectReducer";

export const CheckboxInput = ({component, currSectionId}) => {
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const {checkboxes, question, answer} = component.component_prop_object;

    useEffect(() => {
        setSelectedOptions(answer || []);
    }, [component.component_id, answer]);

    const handleCheckboxChange = (event) => {
        const optionValue = event.target.value;
        let updatedSelectedOptions = [...selectedOptions];

        if (event.target.checked) {
            updatedSelectedOptions.push(optionValue);
        } else {
            updatedSelectedOptions = updatedSelectedOptions.filter(
                (option) => option !== optionValue
            );
        }

        setSelectedOptions(updatedSelectedOptions);

        dispatch(
            updateResponse({
                component_id: component.component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component.component_prop_object,
                    answer: updatedSelectedOptions,
                },
            })
        );
    };

    return (
        <div className="checkbox-input-container">
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

            <div className="checkboxes-container">
                {checkboxes.map((option, index) => (
                    <label key={index} className="checkbox-label">
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={handleCheckboxChange}
                            style={{margin: "0.5rem", scale: "1.5"}}
                        />
                        <span className="checkbox-text">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
