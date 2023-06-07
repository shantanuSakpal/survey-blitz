import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function AddInputs(props) {
    return (
        <div className=" column left-column-container">
            <h3>Select the input type</h3>
            <div className="inputs-container">
                <div className="input-name-and-logo-container">
                    <ShortTextIcon fontSize="small"/>
                    <h4>Short text</h4>

                </div>
                <div className="input-name-and-logo-container">
                    <SubjectIcon fontSize="small"/>
                    <h4>Long text</h4>

                </div>
                <div className="input-name-and-logo-container">
                    <ArrowDropDownCircleIcon fontSize="small"/>
                    <h4>Dropdown</h4>

                </div>
                <div className="input-name-and-logo-container">
                    <EventIcon fontSize="small"/>
                    <h4>Date</h4>

                </div>
                <div className="input-name-and-logo-container">
                    <AccessTimeIcon fontSize="small"/>
                    <h4>Time</h4>

                </div>
                <div className="input-name-and-logo-container">
                    <UploadFileIcon fontSize="small"/>
                    <h4>Upload file</h4>

                </div>
                <div className="input-name-and-logo-container">
                    <CheckBoxIcon fontSize="small"/>
                    <h4>Checkboxes</h4>

                </div>
                <div className="input-name-and-logo-container">
                    <RadioButtonCheckedIcon fontSize="small"/>
                    <h4>Multiple choice</h4>

                </div>
                

            </div>
            <h3>Components</h3>
            <div className="form-components-container">
                form components
            </div>
        </div>
    );
}

export default AddInputs;