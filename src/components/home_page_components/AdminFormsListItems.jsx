import React from 'react';

function AdminFormsListItems({form}) {
    return (
        <div className="form-button">

            <button>
                <p>{form.form_name}</p>
                <svg strokeWidth="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
            </button>
        </div>
    );
}

export default AdminFormsListItems;