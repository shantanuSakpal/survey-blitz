import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../context/UserContext";
import { CircularProgress } from "@mui/material";
import {
  editFormUrl,
  setIsActiveStatus,
} from "../../reducers/formObjectReducer";
import axios from "axios";
import { toast } from "react-toastify";

function PublishFormModal({ setIsModalOpen, setIsShareModalOpen }) {
  const formObject = useSelector((state) => state.formObject);
  const { user, setUser } = React.useContext(UserContext);
  const [formUrl, setFormUrl] = useState("");
  const [formUrlEnd, setFormUrlEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (formObject) {
      //formUlrend is the url end
      let temp = formObject.form_url.split("/").pop();
      setFormUrl(formObject.form_url);
      setFormUrlEnd(temp);
    }
  }, [formObject]);

  const checkUrlValid = (e) => {
    // Check for empty URL
    if (!e.target.value.trim()) {
      setError("URL cannot be empty");
      return;
    }

    // Check for valid characters (letters, numbers, and dash)
    const regex = /^[a-zA-Z0-9-]+$/;
    if (!e.target.value.match(regex)) {
      setError("URL can only contain letters, numbers, and dash");
      return;
    }
    setError("");
    setFormUrlEnd(e.target.value);
    let newFormUrl = `https://surveyblitz.onrender.com/${user.result._id}/${e.target.value}`;
    setFormUrl(newFormUrl);
    dispatch(editFormUrl(newFormUrl));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //change in formObject
    dispatch(setIsActiveStatus());
    setLoading(true);
    try {
      const requestBody = {
        form_id: formObject.form_id,
        admin_id: user.result._id,
        formObject: formObject,
        token: user.token,
      };

      // Add the form to the database
      const response = await axios.post(
        "https://surveyblitz-api.onrender.com/admin/publishForm",
        requestBody
      );
      console.log("Form published successfully");
      toast.success(response.data.message);
      setLoading(false);
      setIsModalOpen(false);
      setIsShareModalOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        console.error("Error:", error);
        toast.error(error.response.data.message);
      }
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="new-form-modal-container"
      onClick={(e) => {
        e.stopPropagation(); // Stop propagation of the click event
        if (e.target.className === "new-form-modal-container") closeModal();
      }}
    >
      <form>
        <div className="modal">
          <div className="close" onClick={() => closeModal()}>
            &times;
          </div>

          <div className="modal-header">{formObject.form_name}</div>

          <div className="modal-content">
            <div className="form-group">
              <label htmlFor="form-name">Customize your link and publish</label>

              <input
                type="text"
                className="form-control"
                id="form_url"
                value={formUrlEnd}
                onChange={(e) => {
                  checkUrlValid(e);
                }}
              />
              {error && <div className="error">{error}</div>}
            </div>

            <div className="form-group">
              <label>Preview</label>
              <div>{formUrl}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-submit" onClick={onSubmit}>
              {loading ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                <>Publish</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PublishFormModal;
