import React from "react";
import EditInputFeatures from "../components/create_form_page_components/right_column_components/EditInputFeatures";
import FormDisplay from "../components/create_form_page_components/middle_column_container/FormDisplay";
import FormComponents from "../components/create_form_page_components/left_column_container/FormComponents";
import CreateFormNavBar from "../components/create_form_page_components/CreateFormNavBar";
import { useDispatch } from "react-redux";
import { setInitialState } from "../reducers/formObjectReducer";

function CreateForms() {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  //get the curr Form object from local storage
  const currForm = JSON.parse(localStorage.getItem("currFormObject"));
  //set initial state of the form
  const dispatch = useDispatch();
  dispatch(setInitialState(currForm));

  return currForm != null ? (
    <div className="create-forms-page-container">
      <CreateFormNavBar
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
      <div className="columns-container">
        <FormComponents />
        <FormDisplay />
        <EditInputFeatures settingsOpen={settingsOpen} />
      </div>
    </div>
  ) : (
    <div>
      <h1>Form not found</h1>
      <a href="/">Home</a>
    </div>
  );
}

export default CreateForms;
