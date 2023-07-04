import React, {useContext, useEffect, useState} from 'react';
import HomePageNavbar from "../components/home_page_components/HomePageNavbar";
import UserContext from "../context/UserContext";
import axios from "axios";
import Loading from "../components/Loading";
import ResponsesTable from "../components/analytics_page_components/ResponsesTable";

function AnalyticsPage(props) {
    const {user} = useContext(UserContext);
    //get the form id from the url that is get everything after /analytics/
    const formId = window.location.pathname.split("/")[2];
    //get data from the backend
    const [responsesArray, setResponsesArray] = useState(null);
    const [formQuestionsObject, setFormQuestionsObject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //get the form responses from the backend
        const reqBody = {
            formId: formId,
            userId: user?.result._id,
            token: user?.token,

        }
        axios.post(`http://localhost:3001/getFormResponses/${formId}`, reqBody)
            .then((res) => {
                //set the responses
                setResponsesArray(res.data.responses);
                console.log("responses array", res.data.responses)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.post(`http://localhost:3001/admin/getFormById`, {form_id: formId, token: user?.token})
            .then((res) => {

                setFormQuestionsObject(res.data.form.formObject);
                console.log("formObject", res.data.form.formObject)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [formId, user?.token, user?.result._id])

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (

        <div className="analytics-page-container">
            <HomePageNavbar
                username={user?.result.username}
                form_name={formQuestionsObject?.form_name}
                page={"analytics"}/>

            {
                responsesArray && formQuestionsObject && responsesArray.length > 0 ? (

                    <ResponsesTable
                        formQuestionsObject={formQuestionsObject}
                        responsesArray={responsesArray}
                    />


                ) : (
                    <div>This form currently has no responses.</div>
                )
            }
        </div>
    );
}

export default AnalyticsPage;
