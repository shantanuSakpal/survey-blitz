import React from 'react';
import AdminFormsListItems from "./AdminFormsListItems";

function FormsContainer({adminForms}) {
    return (
        <div className="form-buttons-container">


            {
                adminForms &&

                adminForms.map((form, index) => {

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