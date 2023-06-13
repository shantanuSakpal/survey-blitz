import React, { useState } from "react";
import CreateFormNavBar from "../components/Navbar";
import EditInputFeatures from "../components/create_form_page_components/EditInputFeatures";
import FormDisplay from "../components/create_form_page_components/FormDisplay";
import FormComponents from "../components/create_form_page_components/FormComponents";

function CreateForms(props) {
  let formName = "Contact Info Form";
  let date = Date.now();
  const [formComponentsArray, setFormComponentsArray] = useState([
    {
      section_components: [],
      section_id: date,
      section_name: "Untitled Section",
    },
  ]);
  const [currSectionId, setCurrSectionId] = useState(
    formComponentsArray[0].section_id
  );

  const addSection = (section) => {
    setFormComponentsArray([...formComponentsArray, section]);
  };

  //section is an object with section_id and section_components
  const removeSection = (section_id) => {
    setFormComponentsArray(
      formComponentsArray.filter((section) => section.section_id !== section_id)
    );
  };

  console.log("formComponentsArray", formComponentsArray);

  const [addInputState, setAddInputState] = useState(false); // Track the visibility of AddInput component

  const handleAddComponentClick = () => {
    setAddInputState(!addInputState); // Toggle the visibility of AddInput component
  };

  return (
    <>
      <CreateFormNavBar formName={formName} />
      <div className="columns-container">
        <FormComponents
          setCurrSectionId={setCurrSectionId}
          formComponentsArray={formComponentsArray}
          addSection={addSection}
          removeSection={removeSection}
          setFormComponentsArray={setFormComponentsArray}
          currSectionId={currSectionId}
          setAddInputState={setAddInputState}
        />
        <FormDisplay
          formComponentsArray={formComponentsArray}
          currSectionId={currSectionId}
          setFormComponentsArray={setFormComponentsArray}
          handleAddComponentClick={handleAddComponentClick}
          addInputState={addInputState}
        />
        <EditInputFeatures />
      </div>
    </>
  );
}

export default CreateForms;
