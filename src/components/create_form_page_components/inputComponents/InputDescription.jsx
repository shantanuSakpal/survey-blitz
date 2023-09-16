import React, {useEffect, useState} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import {useDispatch, useSelector} from "react-redux";
import {setComponentPropObject} from "../../../reducers/formObjectReducer";

function InputDescription({component_id, currSectionId}) {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [component_prop_object, setComponent_prop_object] = useState({});
    //find the current component in the form_sections array

    const handleChange = (event) => {
        const updatedText = event.target.value;
        setText(updatedText);
        setComponent_prop_object({
            ...component_prop_object,
            description: updatedText,
        });
        dispatch(
            setComponentPropObject({
                component_id: component_id,
                section_id: currSectionId,
                component_prop_object: {
                    ...component_prop_object,
                    description: updatedText,
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
        setText(currComponent.component_prop_object.description);
    }, [formSectionsArray, currSectionId, component_id]);

    return (
        <div className="form description">
            <TextareaAutosize
                className="input"
                placeholder="Description"
                value={text}
                onChange={handleChange}
                minRows={1}
            />
            <span className="input-border"></span>
        </div>
    );
}

export default InputDescription;