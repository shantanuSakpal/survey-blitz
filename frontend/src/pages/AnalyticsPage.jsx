import React, { useContext, useEffect, useState } from "react";
import HomePageNavbar from "../components/home_page_components/HomePageNavbar";
import UserContext from "../context/UserContext";
import axios from "axios";
import Loading from "../components/Loading";
import ResponsesTable from "../components/analytics_page_components/ResponsesTable";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../reducers/adminFormsReducer";
import { useNavigate } from "react-router-dom";

function AnalyticsPage(props) {
  //get the form id from the url that is get everything after /analytics/

  const formId = window.location.pathname.split("/")[2];
  //get data from the backend
  const [responsesArray, setResponsesArray] = useState(null);
  const [formQuestionsObject, setFormQuestionsObject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forms = useSelector((state) => state.adminFormsArray);
  const currUser = JSON.parse(localStorage.getItem("currUser"));
  useEffect(() => {
    //if user is not logged in, redirect to login page
    if (!currUser) {
      navigate("/signIn");
    }
    // else {
    //
    //     setUser(currUser);
    // }

    if (currUser) {
      const reqBody = {
        email: currUser.result.email,
        token: currUser.token,
      };

      axios
        .post("https://surveyblitz-api.onrender.com/admin/getForms", reqBody)
        .then((response) => {
          const fetchedForms = response.data.forms;
          dispatch(setInitialState(fetchedForms));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
    //get the form responses from the backend
    const reqBody = {
      formId: formId,
      userId: currUser?.result._id,
      token: currUser?.token,
    };
    axios
      .post(
        `https://surveyblitz-api.onrender.com/getFormResponses/${formId}`,
        reqBody
      )
      .then((res) => {
        //set the responses
        setResponsesArray(res.data.responses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`https://surveyblitz-api.onrender.com/admin/getFormById`, {
        form_id: formId,
        token: currUser?.token,
      })
      .then((res) => {
        setFormQuestionsObject(res.data.form.formObject);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formId, currUser?.token, currUser?.result._id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="analytics-page-container">
      <div className="home-page-left-sidebar">
        {forms && (
          <HomePageNavbar
            page={"analytics"}
            username={currUser?.result.username}
            forms={forms}
          />
        )}
      </div>
      <div className="analytics-page-right-container">
        <div className="form-response-header">
          {formQuestionsObject?.form_name}
        </div>

        {responsesArray && formQuestionsObject && responsesArray.length > 0 ? (
          <ResponsesTable
            formQuestionsObject={formQuestionsObject}
            responsesArray={responsesArray}
          />
        ) : formQuestionsObject.is_active ? (
          <div>This form currently active and has no responses.</div>
        ) : (
          <div>This form currently inactive and has no responses.</div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;
