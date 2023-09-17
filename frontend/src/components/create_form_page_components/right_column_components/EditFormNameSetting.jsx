import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editFormName} from "../../../reducers/formObjectReducer";

function EditFormNameSetting() {
    const formObject = useSelector((state) => state.formObject);
    const dispatch = useDispatch();

    return (
        <div className="edit-form-name-settings">
            <div className="edit-name">
                <label>
                    Name
                </label>
                <br/>
                <input
                    type="text"
                    placeholder="Form Name"
                    value={formObject.form_name}
                    onChange={(e) => {
                        e.preventDefault()
                        dispatch(editFormName(e.target.value));
                        console.log("name,", formObject.form_name)
                    }}/>
            </div>
            <div className="edit-desc">
                <label>
                    Description
                </label>
                <br/>
                <input type="text" placeholder="Form Description"/>
            </div>

        </div>
    );
}

export default EditFormNameSetting;