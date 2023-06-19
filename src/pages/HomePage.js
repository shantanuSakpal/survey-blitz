import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import FormsContainer from "../components/home_page_components/FormsContainer";
import CreateFormButton from "../components/buttons/CreateFormButton";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const {user, setUser} = useContext(UserContext);
    // console.log("user", user);
    const [adminForms, setAdminForms] = useState([]);

    useEffect(() => {
        // Check if user information is stored in local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch the admin form object array from the database using the email
        const fetchAdminForms = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/getForms?email=${user.email}`);
                const {forms} = response.data;
                console.log("Admin Forms:", forms);
                setAdminForms(forms)
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (user) {
            fetchAdminForms();
        }
    }, []);

    // Store the user information in local storage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    return (
        user ? (
            <div className="home-page-container">
                <CreateFormButton/>
                <h1>Welcome {user.email}</h1>
                <h3>Your forms</h3>
                {adminForms.length > 0 ? (
                    <FormsContainer adminForms={adminForms} setAdminForms={setAdminForms}/>
                ) : (
                    <p>Loading forms...</p>
                )}
            </div>
        ) : (
            <div>
                <h1>Please <a href="/signIn">Login</a> or <a href="/signUp">Sign Up</a></h1>
            </div>
        )
    );


};
