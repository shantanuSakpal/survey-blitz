import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../../reducers/formObjectReducer";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import _ from "lodash";

export const NewFormModal = ({ setModalOpen }) => {
  const { user, setUser } = React.useContext(UserContext);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState("");

  let formUrl = null;

  const closeModal = (message) => {
    setModalOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formName.trim() === "") {
      setError("Form name cannot be empty");
    } else if (formName.trim().length > 50) {
      setError("Form name cannot exceed 50 characters");
    } else if (formDesc.trim().length > 200) {
      setError("Form description cannot exceed 200 characters");
    } else {
      handleContinue(formName.trim(), formDesc.trim());
    }
  };

  function generateFormUrl(formName) {
    const adminId = user.result._id;
    const formattedFormName = _.kebabCase(formName);
    const randomString = Math.random().toString(36).substring(2, 7);
    const baseUrl = "https://surveyblitz.onrender.com"; //
    formUrl = `${baseUrl}/${adminId}/${formattedFormName + "-" + randomString}`;
    console.log(formUrl);
  }

  const handleContinue = async (formName, formDesc) => {
    setLoading(true);

    generateFormUrl(formName);
    //

    let date = Date.now();
    const formObject = {
      form_id: date - 1,
      form_name: formName,
      form_description: formDesc,
      form_url: formUrl,
      form_sections: [
        {
          section_id: date,
          section_name: "Untitled Page",
          section_components: [
            {
              component_id: date - 1,
              component_type: "short_text",
              is_required: true,
              component_prop_object: {
                question: "",
              },
            },
          ],
        },
      ],
      currSectionId: date,
      currComponentId: date - 1,
      is_active: false,
      theme: "white",
    };
    try {
      const requestBody = {
        email: user.result.email,
        token: user.token, // Replace with your authentication token
        formObject: formObject,
      };

      // Add the form to the database
      const response = await axios.post(
        "https://surveyblitz-api.onrender.com/admin/createForm",
        requestBody
      );
      console.log("Form created successfully");
      toast.success(response.data.message);
      setLoading(false);
      navigate(`/form/${formObject.form_id}`);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        console.error("Error:", error);
        toast.error(error.response.data.message);
      }
    }

    dispatch(setInitialState(formObject));
    localStorage.setItem("currFormObject", JSON.stringify(formObject));
  };

  return (
    <div
      className="new-form-modal-container"
      onClick={(e) => {
        e.stopPropagation(); // Stop propagation of the click event
        if (e.target.className === "new-form-modal-container")
          closeModal("Modal was closed");
      }}
    >
      <form>
        <div className="modal">
          <div className="close" onClick={() => closeModal("Modal was closed")}>
            &times;
          </div>

          <div className="modal-header">Create new form</div>

          <div className="modal-content">
            <div className="form-group">
              <label htmlFor="form-name">Form name</label>
              <input
                type="text"
                className="form-control"
                id="form-name"
                placeholder="Enter form name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="form-name">Form Description</label>
              <input
                type="text"
                className="form-control"
                id="form-desc"
                placeholder="Leave blank if not needed"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-submit" onClick={onSubmit}>
              {loading ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                <>Continue</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
