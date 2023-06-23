import React from 'react';
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CreateFormButton from "../buttons/CreateFormButton";

function AdminFormsListItems({form}) {
    const navigate = useNavigate();
    return (
        <div className="form-card">
            <div className="name">{form.formObject.form_name}</div>
            <div className="desc">{form.formObject.form_description}</div>
            <div className="number-of-res">10 responses</div>
            <div className="form-options">


                <button>
                    <EditIcon/>
                </button>
                <button
                    onClick={() => {
                        navigate(`${form.formObject.url}`)
                    }}>
                    <VisibilityIcon/>
                </button>
                <button>
                    <AssessmentOutlinedIcon/>
                </button>

            </div>


        </div>
    );
}

export default AdminFormsListItems;