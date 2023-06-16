import React from "react";
import EditInputFeatures from "../components/create_form_page_components/EditInputFeatures";
import FormDisplay from "../components/create_form_page_components/FormDisplay";
import FormComponents from "../components/create_form_page_components/FormComponents";
import CreateFormNavBar from "../components/create_form_page_components/CreateFormNavBar";

function CreateForms(props) {
    let formName = "Contact Info Form";


    return (
        <>
            <CreateFormNavBar formName={formName}/>
            <div className="columns-container">
                <FormComponents/>
                <FormDisplay/>
                <EditInputFeatures/>
            </div>
        </>
    );
}

export default CreateForms;
