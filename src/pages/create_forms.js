import React from 'react';
import CreateFormNavBar from "../components/Navbar";
import AddInputs from "../components/AddInputs";
import EditInputFeatures from "../components/EditInputFeatures";
import FormDisplay from "../components/FormDisplay";

function CreateForms(props) {
    let formName = "Contact Info Form";
    return (
        <>
            <CreateFormNavBar formName={formName}/>
            <div className="columns-container">
                <AddInputs/>
                <FormDisplay/>
                <EditInputFeatures/>

            </div>
        </>
    );
}

export default CreateForms;