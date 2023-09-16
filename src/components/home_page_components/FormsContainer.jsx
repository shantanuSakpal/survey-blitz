import React, {useState} from 'react';
import AdminFormsListItem from "./AdminFormsListItem";
import CreateFormButton from "../buttons/CreateFormButton";
import {useSelector} from "react-redux";

function FormsContainer({forms, sortType, searchText}) {

    const filteredForms = forms.filter((form) =>
        form.formObject.form_name.toLowerCase().includes(searchText.toLowerCase())
    );
    const sortedForms = [...filteredForms];

    if (sortType === 'alphabetical') {
        sortedForms.sort((a, b) => a.formObject.form_name.localeCompare(b.formObject.form_name));
    } else if (sortType === 'newest') {
        let date1 =
            sortedForms.sort((a, b) => b.form_id - a.form_id);
    } else if (sortType === 'oldest') {
        sortedForms.sort((a, b) => a.form_id - b.form_id);
    }

    return (
        <div className="form-cards-container"

        >
            <CreateFormButton/>


            {
                sortedForms?.length > 0 && (
                    sortedForms.map((form, index) => {

                        return (
                            <AdminFormsListItem
                                key={index}
                                form={form}

                            />
                        )
                    })
                )


            }

        </div>
    );
}

export default FormsContainer;