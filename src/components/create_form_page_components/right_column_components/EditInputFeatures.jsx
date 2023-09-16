import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AddInput from "./AddInput";
import Settings from "./Settings";

function EditInputFeatures({settingsOpen}) {
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
                settingsOpen ? (

                        <Settings/>
                    )
                    : (

                        <div className="add-input-container">
                            <AddInput/>
                        </div>


                    )
            }


        </div>
    );
}

export default EditInputFeatures;