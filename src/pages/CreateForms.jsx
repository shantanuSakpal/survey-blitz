import React from "react";
import EditInputFeatures from "../components/create_form_page_components/EditInputFeatures";
import FormDisplay from "../components/create_form_page_components/FormDisplay";
import FormComponents from "../components/create_form_page_components/FormComponents";
import CreateFormNavBar from "../components/create_form_page_components/CreateFormNavBar";
import {useDispatch} from "react-redux";
import {setInitialState} from "../reducers/formObjectReducer";

function CreateForms() {

    //get the curr Form object from local storage
    const currForm = JSON.parse(localStorage.getItem('currFormObject'));
    //set initial state of the form
    const dispatch = useDispatch();
    dispatch(setInitialState(currForm));


    return (

        (currForm != null) ? (
            <> <CreateFormNavBar/>
                <div className="columns-container">
                    <FormComponents/>
                    <FormDisplay/>
                    <EditInputFeatures/>
                </div>
            </>
        ) : (
            <div>
                <h1>Form not found</h1>
                <a href="/">Home</a>
            </div>
        )

    );
}

export default CreateForms;