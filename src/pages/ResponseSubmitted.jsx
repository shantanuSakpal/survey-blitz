import React from 'react';
import {useNavigate} from "react-router-dom";

function ResponseSubmitted(props) {
    const navigate = useNavigate();
    return (
        <div>

            Your response has been submitted! Thank you!
            <br/>
            <div style={{color: "blue", cursor: "pointer"}} onClick={() => navigate("/")}>Back Home</div>
        </div>
    );
}

export default ResponseSubmitted;