import React from 'react';
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import {useDispatch, useSelector} from "react-redux";
import {setInitialState} from "../../reducers/formObjectReducer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function AdminFormsListItems({form}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="form-card">
            <div className="name">{form.formObject.form_name}</div>
            <div className="desc">{form.formObject.form_description}</div>
            <div className="number-of-res">10 responses</div>
            <div className="form-options">


                <button
                    onClick={() => {
                        dispatch(setInitialState(form.formObject));
                        localStorage.setItem("currFormId", form.formObject.form_id)
                        navigate("/create-form")
                    }}
                >
                    <EditIcon/>
                </button>
                <button
                    onClick={() => {
                        navigate(`${form.formObject.url}`)
                    }}>
                    <VisibilityIcon/>
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("currFormId", form.formObject.form_id)
                    }}>
                    <AssessmentOutlinedIcon/>
                </button>
                <button>
                    <DeleteForeverIcon/>
                </button>

            </div>


        </div>
    );
}

export default AdminFormsListItems;