import React, {useContext} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import userContext from "../../context/UserContext";
import {useDispatch, useSelector} from "react-redux";
import {deleteForm} from "../../reducers/adminFormsReducer";

export default function ConfirmDelete({what, setDeleteModalOpen, form}) {
    const {user} = useContext(userContext);
    const forms = useSelector(state => state.adminFormsArray);
    const dispatch = useDispatch();
    const handleDelete = async () => {

        try {
            const {form_id, admin_id} = form;
            const token = user.token; // Replace with the actual token

            const response = await axios.post('http://localhost:3001/admin/deleteForm', {
                form_id,
                admin_id,
                token,
            });

            if (response.status === 200) {
                toast.success('Form deleted successfully');
                dispatch(deleteForm(form_id));
                // Additional actions after successful deletion
            } else {
                console.log(response);
                toast.error('Error deleting form');
                // Additional error handling
            }
        } catch (error) {
            console.log(error);
            toast.error('Error deleting form');
            // Additional error handling
        } finally {
            setDeleteModalOpen(false);
        }
    };

    return (

        <div className="confirm-delete-modal">
            <div className="card">
                <div className="header">
                    <div className="image">
                        <svg aria-hidden="true" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                             fill="none">
                            <path
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                strokeLinejoin="round" strokeLinecap="round"></path>
                        </svg>
                    </div>
                    <div className="content">
                        <span className="title">Delete {what}</span>
                        <p className="message">Are you sure you want to delete this {what}? This action cannot be
                            undone.</p>
                    </div>
                    <div className="actions" onClick={
                        () => setDeleteModalOpen(false)
                    }>
                        <button className="delete" type="button"
                                onClick={
                                    () => handleDelete()
                                }
                        >Delete
                        </button>
                        <button className="cancel" type="button"
                                onClick={
                                    () => setDeleteModalOpen(false)
                                }
                        >Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
