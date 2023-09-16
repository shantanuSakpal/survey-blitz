import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsActiveStatus } from "../../reducers/formObjectReducer";
import PublishFormModal from "../modals/PublishFormModal";
import ConfirmOverwrite from "../modals/ConfirmOverwrite";
import _ from "lodash";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDeactivateForm from "../modals/ConfirmDeactivateForm";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import formImg from "../../images/form-image-1.svg";
import TableChartIcon from "@mui/icons-material/TableChart";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CloseIcon from "@mui/icons-material/Close";

function CreateFormNavBar({ settingsOpen, setSettingsOpen }) {
  const formObject = useSelector((state) => state.formObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    setUser(currUser);
    generateFormUrl(formObject.form_name);
  }, []);

  function generateFormUrl(formName) {
    const formattedFormName = _.kebabCase(formName); // Convert form name to kebab-case
    const baseUrl = "https://example.com/forms"; // Replace with your base URL
    const newUrl = `${baseUrl}/${formattedFormName}`;
    setUrl(newUrl);
  }

  const storeForm = async () => {
    try {
      const requestBody = {
        email: user.result.email,
        token: user.token, // Replace with your authentication token
        formObject: formObject,
      };

      // Add the form to the database
      const response = await axios.post(
        "http://localhost:3001/admin/createForm",
        requestBody
      );
      console.log("Form stored successfully", response);
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsUpdateModalOpen(true);
        console.log("open modal");
      } else {
        console.error("Error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  const updateForm = async () => {
    try {
      const requestBody = {
        email: user.result.email,
        token: user.token, // Replace with your authentication token
        formObject: formObject,
      };

      // Add the form to the database
      const response = await axios.post(
        "http://localhost:3001/admin/updateForm",
        requestBody
      );
      console.log("Form stored successfully");
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  };

  const handlePublish = () => {
    console.log("Publishing form...");
    storeForm();
    setIsModalOpen(false);
  };
  const handleUpdateForm = () => {
    console.log("Publishing form...");
    updateForm();
    setIsUpdateModalOpen(false);
  };

  const handleNext = () => {
    setIsModalOpen(true);
  };

  return (
    <div data-role="navbar" className="create-forms-navbar">
      <div className="navbar-brand-and-title" onClick={() => navigate("/home")}>
        <div className="brand-name">
          <div className="brand-logo" onClick={() => navigate("/home")}>
            <DynamicFormIcon />
          </div>
        </div>

        <div className="form-name-container">
          <div className="form-icon">
            <img src={formImg} alt=" img" />
          </div>
          <div className="form-name">{formObject.form_name}</div>
        </div>
      </div>

      <div className="form-options-container">
        <div className="responses">
          <TableChartIcon fontSize={"small"} />
          <p>Responses</p>
        </div>
        <div className="edit">
          <ModeEditIcon fontSize={"small"} />
          <p>Edit</p>
        </div>
      </div>

      <div className="nav-buttons">
        <div
          className={`settings ${settingsOpen ? "settings-open" : ""}`}
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          {settingsOpen ? (
            <>
              <CloseIcon fontSize={"small"} />
              <p>Settings</p>
            </>
          ) : (
            <>
              <SettingsSuggestIcon fontSize={"small"} />
              <p>Settings</p>
            </>
          )}
        </div>
        <div className="next-button" onClick={handleNext}>
          Next
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <PublishFormModal
            handlePublish={handlePublish}
            url={url}
            generateFormUrl={generateFormUrl}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      )}
      {isUpdateModalOpen && (
        <div className="modal-overlay">
          <ConfirmOverwrite
            handleUpdateForm={handleUpdateForm}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
          />
        </div>
      )}
    </div>
  );
}

export default CreateFormNavBar;
