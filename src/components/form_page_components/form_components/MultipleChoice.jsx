import TextareaAutosize from "react-textarea-autosize";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {updateResponse} from "../../../reducers/formResponseObjectReducer";

export const MultipleChoice = ({component, currSectionId}) => {
    const dispatch = useDispatch();
    const [selectedChoice, setSelectedChoice] = useState("");
    const [component_prop_object, setComponent_prop_object] = useState({});

    useEffect(() => {
        setComponent_prop_object(component.component_prop_object);
        setSelectedChoice(component.component_prop_object.answer || "");
    }, [component.component_prop_object]);

    const handleChoiceChange = (event) => {
        const choiceValue = event.target.value;

        setSelectedChoice(choiceValue);

        dispatch(
            updateResponse({
                component_id: component.component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component_prop_object,
                    answer: choiceValue,
                },
            })
        );
    };

    return (
        <div className="multiple-choice-input-container">
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

            <div className="choices-container">
                {component.component_prop_object.options.map((choice, index) => (
                    <label key={index} className="choice-label">
                        <input
                            type="radio"
                            value={choice}
                            checked={selectedChoice === choice}
                            onChange={handleChoiceChange}
                            style={{margin: "0.5rem", scale: "1.5"}}
                        />
                        <span className="choice-text">{choice}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
