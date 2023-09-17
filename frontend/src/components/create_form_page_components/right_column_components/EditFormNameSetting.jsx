import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFormName } from "../../../reducers/formObjectReducer";
import { editFormDesc } from "../../../reducers/formObjectReducer";

import { useState } from "react";

function EditFormNameSetting() {
  const formObject = useSelector((state) => state.formObject);
  const [formName, setFormName] = useState(formObject?.form_name);
  const [formDesc, setFormDesc] = useState(formObject?.form_description);
  const dispatch = useDispatch();

  return (
    <div className="edit-form-name-settings">
      <div className="edit-name">
        <label>Name</label>
        <br />
        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => {
            e.preventDefault();
            setFormName(e.target.value);
            dispatch(editFormName(e.target.value));
            console.log("name,", formObject.form_name);
          }}
        />
      </div>
      <div className="edit-desc">
        <label>Description</label>
        <br />
        <input
          type="text"
          placeholder="Form Description"
          value={formDesc}
          onChange={(e) => {
            e.preventDefault();
            setFormDesc(e.target.value);
            dispatch(editFormDesc(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default EditFormNameSetting;
