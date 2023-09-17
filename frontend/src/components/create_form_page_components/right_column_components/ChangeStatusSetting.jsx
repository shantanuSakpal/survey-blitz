import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDeactivateForm from "../../modals/ConfirmDeactivateForm";
import { setIsActiveStatus } from "../../../reducers/formObjectReducer";
import userContext from "../../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function ChangeStatusSetting(props) {
  const formObject = useSelector((state) => state.formObject);
  const [confirmDeactivateModal, setConfirmDeactivateModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useContext(userContext);

  const handleDeactivateForm = async () => {
    try {
      const form_id = formObject.form_id;
      const admin_id = user.result._id;
      const token = user.token; // Replace with the actual token
      const status = !formObject.is_active;

      const response = await axios.post(
        "https://surveyblitz-api.onrender.com/admin/changeStatus",
        {
          form_id,
          admin_id,
          token,
          status,
        }
      );

      if (response.status === 200) {
        toast.success("Form status changed successfully");
        dispatch(setIsActiveStatus());

        // Additional actions after successful deletion
      } else {
        console.log(response);
        toast.error("Error deleting form");
        // Additional error handling
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting form");
      // Additional error handling
    } finally {
      setConfirmDeactivateModal(false);
    }
  };

  return (
    <div className="change-status-setting">
      {formObject.is_active ? (
        <div className="active"> Form Active</div>
      ) : (
        <div className="inactive">Form Inactive</div>
      )}
      <label className="switch">
        <input
          type="checkbox"
          className="checkbox"
          checked={formObject.is_active}
          readOnly
        />
        <div
          className="slider"
          onClick={() => {
            if (formObject.is_active) setConfirmDeactivateModal(true);
            else handleDeactivateForm();
          }}
        ></div>
      </label>
      {confirmDeactivateModal && formObject.is_active && (
        <ConfirmDeactivateForm
          setConfirmDeactivateModal={setConfirmDeactivateModal}
          handleDeactivateForm={handleDeactivateForm}
        />
      )}
    </div>
  );
}

export default ChangeStatusSetting;
