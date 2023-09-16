import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ConfirmDeactivateForm from "../../modals/ConfirmDeactivateForm";
import {setIsActiveStatus} from "../../../reducers/formObjectReducer";

function ChangeStatusSetting(props) {
    const formObject = useSelector((state) => state.formObject);
    const [confirmDeactivateModal, setConfirmDeactivateModal] = useState(false);
    const dispatch = useDispatch();


    const handleDeactivateForm = () => {

        dispatch(setIsActiveStatus())
        setConfirmDeactivateModal(false)
    }

    return (
        <div className="change-status-setting">
            {
                formObject.is_active ? (
                    <div className="active"> Form Active</div>
                ) : (
                    <div className="inactive">Form Inactive</div>
                )
            }
            <label className="switch">
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

export default ChangeStatusSetting;