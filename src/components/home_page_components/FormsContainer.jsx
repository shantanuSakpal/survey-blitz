import React from 'react';
import AdminFormsListItems from "./AdminFormsListItems";

function FormsContainer({forms}) {
    return (
        <div className="form-buttons-container">


            {
                forms &&

                forms.map((form, index) => {

                    return (
                        <AdminFormsListItems
                            key={index}
                            form={form}
                        />
                    )
                })
            }
        </div>
    );
}

export default FormsContainer;