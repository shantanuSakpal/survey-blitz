import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import FormsContainer from '../components/home_page_components/FormsContainer';
import {useNavigate} from 'react-router-dom';
import Profile from "../components/home_page_components/Profile";

export const HomePage = () => {
    const {user, setUser} = useContext(UserContext);
    const [forms, setForms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const currUser = JSON.parse(localStorage.getItem('currUser'));
                if (currUser) {
                    setUser(currUser);
                    const response = await axios.get('http://localhost:3001/admin/getForms', {
                        params: {
                            email: currUser.result.email,
                            token: currUser.token,
                        }
                    });
                    const fetchedForms = response.data.forms;
                    setForms(fetchedForms);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchForms().then(r => console.log("fetched forms", forms));

    }, [navigate, setUser]);

    return (
        <div className="home-page-container">
            <Profile/>
            <h1>Welcome {user?.result.email}</h1>
            <h3>Your forms</h3>
            {forms.length === 0 ? <h3>No forms created yet</h3> :

                <FormsContainer forms={forms}/>}

        </div>
    );
};
