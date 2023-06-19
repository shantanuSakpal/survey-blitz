import React from 'react';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function CreateFormButton() {
    const navigate = useNavigate();

    return (
        <div className="create-form-button"
             onClick={() => navigate("/create-form")}>
            <AddIcon/>
        </div>
    );
}

export default CreateFormButton;
