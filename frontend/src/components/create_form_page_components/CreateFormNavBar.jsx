import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PublishFormModal from "../modals/PublishFormModal";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import formImg from "../../images/form-image-1.svg";
import TableChartIcon from "@mui/icons-material/TableChart";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ShareFormModal from "../modals/ShareFormModal";
import { CircularProgress } from "@mui/material";
import { createPortal } from "react-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function CreateFormNavBar({}) {
  const formObject = useSelector((state) => state.formObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const saveFormChanges = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        form_id: formObject.form_id,
        admin_id: user.result._id,
        formObject: formObject,
        token: user.token,
      };

      // Add the form to the database
      const response = await axios.post(
        "https://surveyblitz-api.onrender.com/admin/saveChanges",
        requestBody
      );
      console.log("Form saved successfully");
      toast.success(response.data.message);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        console.error("Error:", error);
        toast.error(error.response.data.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    setUser(currUser);
  }, []);

  // useEffect(() => {
  //   // Function to save the form changes

  //   // Save the form changes every 30 seconds
  //   const saveInterval = setInterval(() => {
  //     saveFormChanges();
  //   }, 30000);

  //   // Clear the interval on component unmount
  //   return () => clearInterval(saveInterval);
  // }, []);

  return (
    <div data-role="navbar" className="create-forms-navbar">
      <div className="navbar-brand-and-title">
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
        <div
          className="btn"
          onClick={() => {
            navigate(`/analytics/${formObject.form_id}`);
          }}
          // onClick={() => {
          //   const formId = formObject.form_id;
          //   navigate(`/analytics/${formId}`);
          // }}
        >
          <TableChartIcon fontSize={"small"} />
          <p>Responses</p>
        </div>

        <a className="btn edit" href={`/form/${formObject.form_id}`}>
          <ModeEditIcon fontSize={"small"} />
          <p>Edit</p>
        </a>

        <a
          className="btn"
          href={formObject.form_url}
          target="_blank"
          // onClick={() => {
          //   window.location.href = formObject.form_url;
          // }}
        >
          <VisibilityOutlinedIcon fontSize={"small"} />
          <p>Preview</p>
        </a>
      </div>

      <div className="nav-buttons">
        <p>Last saved 30sec ago</p>
        <div
          className="next-button"
          onClick={() => {
            saveFormChanges();
          }}
        >
          {isLoading ? <CircularProgress size={15} color="primary" /> : "Save"}
        </div>
        {formObject.is_active ? (
          <div
            className="next-button"
            onClick={() => {
              setIsShareModalOpen(true);
            }}
          >
            Share
          </div>
        ) : (
          <div
            className="next-button"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Publish
          </div>
        )}
      </div>

      {isModalOpen &&
        createPortal(
          <div className="modal-overlay">
            <PublishFormModal
              setIsShareModalOpen={setIsShareModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>,
          document.body
        )}
      {isShareModalOpen &&
        createPortal(
          <div className="modal-overlay">
            <ShareFormModal setIsShareModalOpen={setIsShareModalOpen} />
          </div>,
          document.body
        )}
    </div>
  );
}

export default CreateFormNavBar;
