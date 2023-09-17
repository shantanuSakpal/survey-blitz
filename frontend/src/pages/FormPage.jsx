import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "../components/form_page_components/SectionHeader";
import SectionContainer from "../components/form_page_components/SectionContainer";
import PrevSectionButton from "../components/buttons/form_page_buttons/PrevSectionButton";
import NextSectionButton from "../components/buttons/form_page_buttons/NextSectionButton";
import SubmitFormButton from "../components/buttons/form_page_buttons/SubmitFormButton";
import axios from "axios";
import { setInitialState } from "../reducers/formResponseObjectReducer";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

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
  const [isLoading, setIsLoading] = useState(true);
  const inputRefs = useRef([]);

  const formResponseObject = useSelector((state) => state.formResponseObject);

  let formSections = null;
  if (formResponseObject) {
    formSections = formResponseObject.form_sections;
  }
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleSubmitForm = () => {
    console.log("submitting form...");
    //get userId from local storage

    const requestBody = {
      user_id: generateUserId(),
      formObject: formResponseObject,
    };

    axios
      .post("https://surveyblitz-api.onrender.com/saveResponse", requestBody)
      .then((response) => {
        toast.success(response.data.message);
        console.log("Success:", response.data);
        navigate("/responseSubmitted");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.response.data.message);
      });
  };

  //check if all required fields are filled
  const checkRequiredFields = () => {
    console.log("checking required fields...");
    console.log(
      "formResponseObject",
      formResponseObject.form_sections[0].section_components
    );
    // get the current section
    const currentSection = formSections[currentSectionIndex];
    // check the currSection.section_components array and check whether the is_required is true, if it is and the component_prop_object.answer is empty, then return false
    const requiredFields = currentSection.section_components.filter(
      (component) => {
        return component.is_required === true;
      }
    );
    // loop through the requiredFields array and check whether the answer is empty or doesn't meet the validation criteria
    let hasUnfilledFields = false;

    for (let i = 0; i < requiredFields.length; i++) {
      const answer = requiredFields[i]?.component_prop_object.answer;
      // If the answer is empty, mark the input as unfilled
      if (!answer || answer === "" || answer.length === 0) {
        //  Add CSS class to make the border red
        const inputRef = inputRefs.current[i];
        if (inputRef) {
          inputRef.classList.add("unfilled-input");
        }
        hasUnfilledFields = true;
      } else {
        // If the input was filled, remove the red border (if it was previously marked as unfilled)
        const inputRef = inputRefs.current[i];
        if (inputRef) {
          inputRef.classList.remove("unfilled-input");
        }
      }

      if (hasUnfilledFields) {
        // Scroll to the first unfilled input
        inputRefs.current[0].scrollIntoView({ behavior: "smooth" });
        return false;
      }

      const validation = requiredFields[i].component_prop_object.validation;

      if (validation && requiredFields[i].component_prop_object.is_validation) {
        const { type, comparison, answer_limit } = validation;

        if (type === "Number") {
          const numAnswer = Number(answer);
          const numLimit = Number(answer_limit);

          if (
            (comparison === "Less than" && numAnswer >= numLimit) ||
            (comparison === "Greater than" && numAnswer <= numLimit) ||
            (comparison === "Equal to" && numAnswer !== numLimit)
          ) {
            alert(
              `Answer should be ${comparison} ${answer_limit}! your answer is ${numAnswer}`
            );
            return false;
          }
        }

        if (type === "Email") {
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(answer)) {
            alert("Please enter a valid email address!");
            return false;
          }
        }

        if (type === "Contains") {
          if (!answer.includes(answer_limit)) {
            alert(`Answer should contain "${answer_limit}"!`);
            return false;
          }
        }

        if (type === "Length") {
          const answerLength = answer.length;
          const numLimit = Number(answer_limit);

          if (
            (comparison === "Less than" && answerLength >= numLimit) ||
            (comparison === "Greater than" && answerLength <= numLimit) ||
            (comparison === "Equal to" && answerLength !== numLimit)
          ) {
            alert(`Answer length should be ${comparison} ${answer_limit}!`);
            return false;
          }
        }

        if (type === "Regular Expression") {
          // Validate answer using a custom regular expression pattern
          const regex = new RegExp(answer_limit);
          if (!regex.test(answer)) {
            alert("Answer does not match the required pattern!");
            return false;
          }
        }
      }
    }
    return true;
    // if all required fields are filled and meet the validation criteria, then move to the next section
  };

  useEffect(() => {
    // Fetch the form data from the API
    //get the form_url from url
    const form_url = window.location.href;
    //divide uel in array
    const urlArray = form_url.split("/");
    const admin_id = urlArray[urlArray.length - 2];

    dispatch(setInitialState(null));

    const fetchForm = () => {
      axios
        .post(`https://surveyblitz-api.onrender.com/getFormQuestions`, {
          admin_id: admin_id,
          form_url: form_url,
        })
        .then((response) => {
          dispatch(setInitialState(response.data.result.formObject));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchForm();
  }, [dispatch]);

  useEffect(() => {
    if (formResponseObject) {
      inputRefs.current = inputRefs.current.slice(0, formSections.length);
    }
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : formResponseObject && formResponseObject.is_active ? (
    <div
      className={`form-page-container ${formResponseObject?.theme}`}
      id="page"
    >
      <div className={`form-container ${formResponseObject?.theme}`}>
        <div className={`form-header ${formResponseObject?.theme}`}>
          <div className="form-name">{formResponseObject.form_name}</div>
          <div className="form-description">
            {formResponseObject.form_description}
          </div>
        </div>

        <SectionHeader currentSectionIndex={currentSectionIndex} />

        <SectionContainer
          inputRefs={inputRefs}
          currentSectionIndex={currentSectionIndex}
        />

        <div className={`form-section-footer`}>
          {currentSectionIndex > 0 && (
            <div
              className={`prev-section-button`}
              onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
            >
              <button className={formResponseObject?.theme}>Previous</button>
            </div>
          )}
          {currentSectionIndex < formSections.length - 1 && (
            <div
              className={`next-section-button`}
              onClick={() => {
                if (checkRequiredFields())
                  setCurrentSectionIndex(currentSectionIndex + 1);
              }}
            >
              <button className={formResponseObject?.theme}>Next</button>
            </div>
          )}
          {currentSectionIndex === formSections.length - 1 && (
            <div
              className="next-section-button"
              onClick={() => {
                if (checkRequiredFields()) {
                  handleSubmitForm();
                }
              }}
            >
              <button className={formResponseObject?.theme}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="form-page-container" id="page">
      <div className="form-container">
        <div className="form-header">
          <div className="form-name">
            This form owner is no longer taking responses.
          </div>
        </div>
      </div>
    </div>
  );
};
