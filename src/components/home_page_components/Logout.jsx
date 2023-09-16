import React from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove JWT from local storage
        localStorage.removeItem("currUser");

        // Redirect to the login page
        navigate('/signIn');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
