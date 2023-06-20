import React, {useState} from "react";
import {useSelector} from "react-redux";
import SectionHeader from "../components/form_page_components/SectionHeader";
import SectionContainer from "../components/form_page_components/SectionContainer";
import PrevSectionButton from "../components/buttons/form_page_buttons/PrevSectionButton";
import NextSectionButton from "../components/buttons/form_page_buttons/NextSectionButton";
import SubmitFormButton from "../components/buttons/form_page_buttons/SubmitFormButton";
import axios from "axios";

export const FormPage = () => {
    //import the form object state
    const formResponseObject = useSelector((state) => state.formResponseObject);


    const formSections = formResponseObject.form_sections;

    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);


    const handleSubmitForm = () => {
        console.log("submitting form...")
        const requestBody = {
            admin_id: "admin",
            form_id: formResponseObject.form_id,
            formObject: formResponseObject
        };

        axios
            .post("http://localhost:3001/admin/submitForm", requestBody)
            .then((response) => {
                console.log("Success:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

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
                    {currentSectionIndex === formSections.length - 1 && (
                        <div className="next-section-button"
                             onClick={() => handleSubmitForm()}
                        >
                            <SubmitFormButton/>
                        </div>
                    )}


                </div>


            </div>


        )
    )
};
