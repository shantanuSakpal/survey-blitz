import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AddInput from "./AddInput";

function EditInputFeatures(props) {
    const formObject = useSelector(
        (state) => state.formObject
    );
    const currSectionId = formObject.currSectionId
    const currSectionIndex = formObject.form_sections.findIndex(
        (section) => section.section_id === currSectionId
    );


    return (
        <div className="column right-column-container"

        >


            {
                (currSectionIndex !== -1 && formObject.form_sections[currSectionIndex].section_components.length > 0) ? (
                    <AddInput/>
                ) : null
            }


        </div>
    );
}

export default EditInputFeatures;