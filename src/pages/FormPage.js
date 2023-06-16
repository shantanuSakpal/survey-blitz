import React, {useState} from "react";
import {useSelector} from "react-redux";
import SectionHeader from "../components/form_page_components/SectionHeader";
import SectionContainer from "../components/form_page_components/SectionContainer";
import PrevSectionButton from "../components/buttons/form_page_buttons/PrevSectionButton";
import NextSectionButton from "../components/buttons/form_page_buttons/NextSectionButton";

export const FormPage = () => {
    //import the form object state
    const formResponseObject = useSelector((state) => state.formResponseObject);


    const formSections = formResponseObject.form_sections;

    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);


    return (
        formResponseObject && (
            <div className="form-container">
                <div className="form-header">
                    <div className="form-name">
                        {formResponseObject.form_name}</div>
                    <div className="form-description">
                        {formResponseObject.form_description}
                    </div>
                </div>

                <SectionHeader
                    currentSectionIndex={currentSectionIndex}
                />


                <SectionContainer
                    currentSectionIndex={currentSectionIndex}
                />
               
                <div className="form-section-footer">
                    {currentSectionIndex > 0 && (
                        <div className="prev-section-button"
                             onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
                        >
                            <PrevSectionButton/>
                        </div>
                    )}
                    {currentSectionIndex < formSections.length - 1 && (
                        <div className="next-section-button"
                             onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                        >
                            <NextSectionButton/>
                        </div>
                    )}


                </div>


            </div>


        )
    )
};
