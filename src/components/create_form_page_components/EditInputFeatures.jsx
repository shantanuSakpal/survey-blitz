import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setInitialState, setIsActiveStatus} from "../../reducers/formObjectReducer";
import ConfirmDeactivateForm from "../modals/ConfirmDeactivateForm";
import AddInput from "./AddInput";

function EditInputFeatures(props) {
    const formObject = useSelector(
        (state) => state.formObject
    );
    const dispatch = useDispatch();
    const [confirmDeactivateModal, setConfirmDeactivateModal] = useState(false);
    const currSectionId = formObject.currSectionId
    const currSectionIndex = formObject.form_sections.findIndex(
        (section) => section.section_id === currSectionId
    );


    const handleDeactivateForm = () => {

        dispatch(setIsActiveStatus())
        setConfirmDeactivateModal(false)
    }
    return (
        <div className="column right-column-container"

        >
            <div className="status">
                <div>Form Status</div>
                <div className="divider"></div>
                <label className="switch">
                    {
                        formObject.is_active ? (
                            <div className="active">Active</div>
                        ) : (
                            <div className="inactive">Inactive</div>
                        )
                    }
                    <input type="checkbox" className="checkbox"
                           checked={formObject.is_active}
                           readOnly
                    />
                    <div className="slider"
                         onClick={() => {
                             if (formObject.is_active)
                                 setConfirmDeactivateModal(true)
                             else
                                 handleDeactivateForm()

                         }
                         }
                    ></div>

                </label>
            </div>

            {
                (currSectionIndex !== -1 && formObject.form_sections[currSectionIndex].section_components.length > 0) ? (
                    <AddInput/>
                ) : null
            }

            {
                confirmDeactivateModal && formObject.is_active && (
                    <ConfirmDeactivateForm
                        setConfirmDeactivateModal={setConfirmDeactivateModal}
                        handleDeactivateForm={handleDeactivateForm}
                    />
                )
            }
        </div>
    );
}

export default EditInputFeatures;