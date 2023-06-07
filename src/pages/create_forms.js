import React, {useState} from 'react';
import CreateFormNavBar from "../components/Navbar";
import AddInputs from "../components/AddInputs";
import EditInputFeatures from "../components/EditInputFeatures";
import FormDisplay from "../components/FormDisplay";

function CreateForms(props) {
    let formName = "Contact Info Form";
    const [formComponentsObj, setFormComponentsObj] = useState({});
    
    const addClickedComponent = (date,id) => {
        setFormComponentsObj(prevClickedElements  => ({...prevClickedElements ,[date]:id }))
        console.log(formComponentsObj);
    }

    return (
        <>
            <CreateFormNavBar formName={formName}/>
            <div className="columns-container">
                <AddInputs addClickedComponent={addClickedComponent} formComponentsObj={formComponentsObj}/>
                <FormDisplay formComponentsObj={formComponentsObj}/>
                <EditInputFeatures/>

            </div>
        </>
    );
}

export default CreateForms;