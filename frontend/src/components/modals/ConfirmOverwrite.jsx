import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Button from "../buttons/button";

function ConfirmOverwrite({setIsUpdateModalOpen, handleUpdateForm}) {
    console.log("confirm overwrite")
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="close-modal-button" onClick={() => setIsUpdateModalOpen(false)}>
                    <CloseIcon fontSize="small"/>
                </div>
                <div style={{color: "red"}}>Form with same name already exists, are you sure you want to overwrite?
                </div>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <div className="publish-button " onClick={() => {
                        handleUpdateForm()
                        setIsUpdateModalOpen(false)
                    }}>
                        <Button name="Yes"/>
                    </div>
                    <div className="publish-button" onClick={() => {

                    }}>
                        <Button name="No"/>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ConfirmOverwrite;