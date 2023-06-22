import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SectionHeader from "../components/form_page_components/SectionHeader";
import SectionContainer from "../components/form_page_components/SectionContainer";
import PrevSectionButton from "../components/buttons/form_page_buttons/PrevSectionButton";
import NextSectionButton from "../components/buttons/form_page_buttons/NextSectionButton";
import SubmitFormButton from "../components/buttons/form_page_buttons/SubmitFormButton";
import axios from "axios";
import {setInitialState} from "../reducers/formResponseObjectReducer";

export const FormPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch the form data from the API
        //get the form_url from url
        const currentUrl = window.location.href;
        //only keep url after second last slash
        const formUrlArray = currentUrl.split("/");
        const formUrl = formUrlArray[formUrlArray.length - 2] + "/" + formUrlArray[formUrlArray.length - 1];
        console.log("formUrl", formUrl);

        const fetchForm = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/${formUrl}`);
                const form = response.data.result.formObject;
                console.log("form", form);
                dispatch(setInitialState(form)); // Dispatch the action to store the form in the reducer
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchForm();
    }, [dispatch]);


    const formResponseObject = useSelector((state) => state.formResponseObject);

    let formSections = null;
    if (formResponseObject) {
        formSections = formResponseObject.form_sections;
    }
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)


    const handleSubmitForm = () => {
        console.log("submitting form...")
        console.log("formResponseObject", formResponseObject)
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

    //check if all required fields are filled
    const checkRequiredFields = () => {
        console.log("checking required fields...")
        //get the current section
        const currentSection = formSections[currentSectionIndex];
        console.log("currentSection", currentSection);
        //check the currSection.section_components array and check whether the is_required is true, if it is and the ocomponent_prop.opbject.answer is empty, then return false
        const requiredFields = currentSection.section_components.filter((component) => {
            return component.is_required === true;
        });
        console.log("requiredFields", requiredFields);
        //loop through the requiredFields array and check whether the answer is empty
        for (let i = 0; i < requiredFields.length; i++) {
            if (!requiredFields[i].component_prop_object.answer) {
                alert("Please answer all required questions !");
                return false;
            }

        }
        //if all required fields are filled, then move to the next section
        setCurrentSectionIndex(currentSectionIndex + 1);

    }

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
                             onClick={() => {
                                 checkRequiredFields();

                             }}
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
