import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AddInput from "./AddInput";
import Settings from "./Settings";

function EditInputFeatures({}) {
    const formObject = useSelector((state) => state.formObject);
    return (
        <div className="column right-column-container">
            <Settings/>

            <div className="add-input-container">
                <p>Change the input type</p>
                <AddInput/>
            </div>
        </div>
    );
}

export default EditInputFeatures;
