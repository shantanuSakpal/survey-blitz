import React, {useState} from 'react';
import AdminFormsListItems from "./AdminFormsListItems";
import CreateFormButton from "../buttons/CreateFormButton";
import {useSelector} from "react-redux";

function FormsContainer({forms}) {


    return (
        <div className="form-card-container"
        
        >
            {
                forms ? (
                    forms.map((form, index) => {

                        return (
                            <AdminFormsListItems
                                key={index}
                                form={form}
                            />
                        )
                    })
                ) : (
                    <div>Loading Forms...</div>
                )


            }
            <CreateFormButton/>
        </div>
    );
}

export default FormsContainer;