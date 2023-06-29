import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Button from "../buttons/button";

function ConfirmDeactivateForm({handleDeactivateForm, setConfirmDeactivateModal}) {
    console.log("confirm overwrite")
    return (
        <div className="confirm-deactivate-modal">
            <div className="container">
                <div className="close-modal-button" onClick={() => setConfirmDeactivateModal(false)}>
                    <CloseIcon fontSize="small"/>
                </div>
                <div className="error">Users will no longer be able to access this form, are you sure you want to
                    deactivate?
                </div>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <div className="publish-button " onClick={() => {
                        handleDeactivateForm()
                        setConfirmDeactivateModal(false)
                    }}>
                        <Button name="Yes"/>
                    </div>
                    <div className="publish-button" onClick={() => {

                        setConfirmDeactivateModal(false)
                    }}>
                        <Button name="No"/>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ConfirmDeactivateForm;