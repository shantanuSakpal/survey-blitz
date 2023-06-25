import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SectionHeader from "../components/form_page_components/SectionHeader";
import SectionContainer from "../components/form_page_components/SectionContainer";
import PrevSectionButton from "../components/buttons/form_page_buttons/PrevSectionButton";
import NextSectionButton from "../components/buttons/form_page_buttons/NextSectionButton";
import SubmitFormButton from "../components/buttons/form_page_buttons/SubmitFormButton";
import axios from "axios";
import {setInitialState} from "../reducers/formResponseObjectReducer";
import {v4 as uuidv4} from "uuid";
import {useNavigate} from "react-router-dom";

function generateUserId() {
    const existingUserId = localStorage.getItem("userId");
    if (existingUserId) {
        return existingUserId;
    }
    const newUserId = uuidv4();
    localStorage.setItem("userId", newUserId);
    return newUserId;
}

export const FormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the form data from the API
        //get the form_url from url
        const currentUrl = window.location.href;
        //only keep url after second last slash
        const formUrlArray = currentUrl.split("/");
        const formUrl = formUrlArray[formUrlArray.length - 2] + "/" + formUrlArray[formUrlArray.length - 1];
        console.log("formUrl", formUrl);
        const currUserId = localStorage.getItem("userId")


        const fetchForm = async () => {

            try {
                // Check if the user has already filled the form
                // const userFormResponse = await axios.get(`http://localhost:3001/getUserResponse/${currUserId}`);
                // if (userFormResponse.data.formObject) {
                //     const userForm = userFormResponse.data.formObject;
                //     console.log("userForm", userForm)
                //     dispatch(setInitialState(userForm)); // Set the initial state with the user's form data
                // } else
                {
                    // Fetch the form data from the API
                    console.log("no user response found")
                    const response = await axios.get(`http://localhost:3001/getFormQuestions/${formUrl}`);
                    const form = response.data.result.formObject;
                    dispatch(setInitialState(form)); // Set the initial state with the form data from the URL
                }
            } catch (error) {
                console.error("Error:", error);
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
        //get userId from local storage

        const requestBody = {
            user_id: generateUserId(),
            formObject: formResponseObject
        };

        axios
            .post("http://localhost:3001/saveResponse", requestBody)
            .then((response) => {
                console.log("Success:", response.data);
                navigate("/")
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
            return component.is_required === true
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
