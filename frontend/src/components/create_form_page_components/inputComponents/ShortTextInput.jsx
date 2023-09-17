import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setComponentPropObject} from "../../../reducers/formObjectReducer";
import TextareaAutosize from "react-textarea-autosize";
import InputDescription from "./InputDescription";
import ValidateResponsesComponent from "./ValidateResponsesComponent";

export const ShortTextInput = ({component_id, currSectionId}) => {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [component_prop_object, setComponent_prop_object] = useState({});
    //find the current component in the form_sections array
    const currComponent = formSectionsArray
        .find((section) => section.section_id === currSectionId)
        .section_components.find(
            (component) => component.component_id === component_id
        );

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
        <div className="short-text-input-container">
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
            {
                currComponent.component_prop_object.is_description && (
                    <InputDescription

                        component_id={component_id}
                        currSectionId={currSectionId}
                    />
                )

            }


            <div className="form answer">
                <input
                    className="input"
                    readOnly
                    placeholder="Short text answer"
                    required=""
                    type="text"
                />
                <span className="input-border"></span>
            </div>
            {
                currComponent.component_prop_object.is_validation && (
                    <ValidateResponsesComponent
                        component_id={component_id}
                        currSectionId={currSectionId}
                    />
                )
            }
        </div>
    );
};
