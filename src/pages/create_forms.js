import React, {useState} from 'react';
import CreateFormNavBar from "../components/Navbar";
import EditInputFeatures from "../components/create_form_page_components/EditInputFeatures";
import FormDisplay from "../components/create_form_page_components/FormDisplay";
import FormComponents from '../components/create_form_page_components/FormComponents';

function CreateForms(props) {
    let formName = "Contact Info Form";
    const [formComponentsObj, setFormComponentsObj] = useState({});
    
    const addClickedComponent = (date,id) => {
        setFormComponentsObj(prevClickedElements  => ({...prevClickedElements ,[date]:id }))
        console.log(formComponentsObj);
    }
    
    const removeClickedComponent = (date) => {
        const {[date]: value, ...rest} = formComponentsObj;
        setFormComponentsObj(rest);
        console.log(formComponentsObj);
    }

    return (
        <>
            <CreateFormNavBar formName={formName}/>
            <div className="columns-container">
                <FormComponents addClickedComponent={addClickedComponent} formComponentsObj={formComponentsObj}
                removeClickedComponent={removeClickedComponent}
                />
                <FormDisplay formComponentsObj={formComponentsObj}/>
                <EditInputFeatures/>

            </div>
        </>
    );
}

export default CreateForms;