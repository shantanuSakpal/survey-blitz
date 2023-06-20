import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {updateResponse} from "../../../reducers/formResponseObjectReducer";

export const ShortTextInput = ({component, currSectionId}) => {

    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [component_prop_object, setComponent_prop_object] = useState({});

    const handleChange = (event) => {
        const updatedText = event.target.value;
        setText(updatedText);
        setComponent_prop_object({
            ...component_prop_object,
            answer: updatedText,
        });
        dispatch(
            updateResponse({
                component_id: component.component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component_prop_object,
                    answer: updatedText,
                },
            })
        );
    };

    useEffect(() => {

        setComponent_prop_object(component.component_prop_object);
        setText(component.component_prop_object.answer || "");
    }, [currSectionId]);


    return (
        <div className="short-text-input-container">
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

            <div className="form answer">
                <input
                    className="input"
                    value={text}
                    placeholder="Your answer"
                    required={component.is_required}
                    type="text"
                    onChange={handleChange}
                />
                <span className="input-border"></span>
            </div>
        </div>
    );
};
