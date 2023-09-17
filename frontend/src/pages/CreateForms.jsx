import React, { useEffect } from "react";
import EditInputFeatures from "../components/create_form_page_components/right_column_components/EditInputFeatures";
import FormDisplay from "../components/create_form_page_components/middle_column_container/FormDisplay";
import FormComponents from "../components/create_form_page_components/left_column_container/FormComponents";
import CreateFormNavBar from "../components/create_form_page_components/CreateFormNavBar";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../reducers/formObjectReducer";
import { ToastContainer } from "react-toastify";
import UserContext from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useState } from "react";

function CreateForms() {
  const { user, setUser } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const form_id = window.location.pathname.split("/")[2];
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const formObject = useSelector((state) => state.formObject);

  //get the form from db using form id and token
  useEffect(() => {
    // const beforeUnloadListener = (e) => {
    //   e.preventDefault();
    //   e.returnValue = "";
    // };

    // // Add the beforeunload event listener when the component mounts
    // window.addEventListener("beforeunload", beforeUnloadListener);

    const getForm = async () => {
      const requestBody = {
        form_id: form_id,
        token: user.token,
      };
      try {
        const response = await axios.post(
          "http://localhost:3001/admin/getFormById",
          requestBody
        );
        setLoading(false);

        dispatch(setInitialState(response.data.form.formObject));
        localStorage.setItem(
          "currFormObject",
          JSON.stringify(response.data.form.formObject)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data);
          setError(error.response.data.message);
        } else {
          console.error("Error:", error);
          setError(error.response.data.message);
          toast.error(error.response.data.message);
        }
      }
    };
    getForm();
  }, []);

  return !loading && formObject ? (
    <div className="create-forms-page-container">
      <ToastContainer position="top-right" autoClose={1000} />

      <CreateFormNavBar />
      <div className="columns-container">
        <FormComponents />
        <FormDisplay />
        <EditInputFeatures />
      </div>
    </div>
  ) : (
    <Loading message={error} />
  );
}

export default CreateForms;
