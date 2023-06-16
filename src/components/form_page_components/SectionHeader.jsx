import React, {useState} from 'react';
import {useSelector} from "react-redux";

function SectionHeader({currentSectionIndex}) {
    //get the section header from formObject
    const formResponseObject = useSelector((state) => state.formResponseObject);
    const formSections = formResponseObject.form_sections;

    const currentSection = formSections[currentSectionIndex];


    return (

        <div className="form-section-header">
            {currentSection.section_name}
        </div>

    );
}

export default SectionHeader;