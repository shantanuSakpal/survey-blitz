import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../buttons/button";

function ConfirmDeactivateForm({
                                   handleDeactivateForm,
                                   setConfirmDeactivateModal,
                               }) {
    return (
        <div
            className="confirm-deactivate-modal"
            onClick={(e) => {
                e.stopPropagation(); // Stop propagation of the click event
                if (e.target.className === "confirm-deactivate-modal")
                    setConfirmDeactivateModal(false);
            }}
        >
            <div className="container">
                <div
                    className="close-modal-button"
                    onClick={() => setConfirmDeactivateModal(false)}
                >
                    <CloseIcon fontSize="small"/>
                </div>
                <div className="error">
                    Users will no longer be able to access this form, are you sure you
                    want to deactivate?
                </div>
                <div className="buttons-container">
                    <div
                        className="publish-button "
                        onClick={() => {
                            handleDeactivateForm();
                            setConfirmDeactivateModal(false);
                        }}
                    >
                        Yes
                    </div>
                    <div
                        className="publish-button"
                        onClick={() => {
                            setConfirmDeactivateModal(false);
                        }}
                    >
                        No
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeactivateForm;
