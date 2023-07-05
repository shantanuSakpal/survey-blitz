import React, {useState} from 'react';
import AdminFormsListItems from "./AdminFormsListItems";
import CreateFormButton from "../buttons/CreateFormButton";
import {useSelector} from "react-redux";

function FormsContainer({forms}) {


    return (
        <div className="form-card-container"

        >
            {
                forms.length > 0 ? (
                    forms.map((form, index) => {

                        return (
                            <AdminFormsListItems
                                key={index}
                                form={form}
                            />
                        )
                    })
                ) : (
                    <div>No forms found.</div>
                )


            }
            <CreateFormButton/>
        </div>
    );
}

export default FormsContainer;