import React, {useState} from 'react';
import CreateFormNavBar from "../components/Navbar";
import EditInputFeatures from "../components/create_form_page_components/EditInputFeatures";
import FormDisplay from "../components/create_form_page_components/FormDisplay";
import FormComponents from '../components/create_form_page_components/FormComponents';

function CreateForms(props) {
    let formName = "Contact Info Form";
    const [formComponentsArray, setFormComponentsArray] = useState([]);
    
    const addSection = (section) => {
        setFormComponentsArray([...formComponentsArray, section])
    }
    
    
    //section is an object with section_id and section_components
    const removeSection = (section_id) => {
        setFormComponentsArray(formComponentsArray.filter((section) => section.section_id !== section_id))
    }
    
    console.log("formComponentsArray", formComponentsArray);
    

    return (
        <>
            <CreateFormNavBar formName={formName}/>
            <div className="columns-container">
                <FormComponents  
                formComponentsArray={formComponentsArray}
                addSection={addSection}
                removeSection={removeSection}
                setFormComponentsArray={setFormComponentsArray}
               
                />
                <FormDisplay formComponentsArray={formComponentsArray}/>
                <EditInputFeatures/>

            </div>
        </>
    );
}

export default CreateForms;