import React from 'react';
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import {useDispatch, useSelector} from "react-redux";
import {setInitialState} from "../../reducers/formObjectReducer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmDelete from "../modals/ConfirmDelete";


function AdminFormsListItems({form}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    ;
    return (
        <div className="form-card"

             
        >


            <label className="switch">

                {
                    form.formObject.is_active ? (
                        <div className="active">Active</div>
                    ) : (
                        <div className="inactive">Inactive</div>
                    )
                }
            </label>


            <div className="name">{form.formObject.form_name}</div>
            <div className="form-options">


                <button
                    onClick={() => {
                        dispatch(setInitialState(form.formObject));
                        //save the curr form object to local storage
                        localStorage.setItem("currFormObject", JSON.stringify(form.formObject))
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
                <button className="delete-form-button"
                        onClick={() => setDeleteModalOpen(true)}
                >
                    <DeleteForeverIcon/>
                </button>

            </div>
            {
                deleteModalOpen && (
                    <ConfirmDelete
                        form={form}
                        what={"form"}
                        setDeleteModalOpen={setDeleteModalOpen}
                    />
                )
            }


        </div>
    );
}

export default AdminFormsListItems;