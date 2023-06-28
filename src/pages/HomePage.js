import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import FormsContainer from '../components/home_page_components/FormsContainer';
import {useNavigate} from 'react-router-dom';
import HomePageNavbar from "../components/home_page_components/HomePageNavbar";
import {useDispatch, useSelector} from "react-redux";
import {setInitialState} from "../reducers/adminFormsReducer";

export const HomePage = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const forms = useSelector((state) => state.adminFormsArray);


    useEffect(() => {
        //if user is not logged in, redirect to login page
        const currUser = JSON.parse(localStorage.getItem('currUser'));
        if (!currUser) {
            navigate('/signIn');
        } else {

            setUser(currUser);
        }


        const fetchForms = async () => {
            const reqBody = {

                email: currUser.result.email,
                token: currUser.token,

            }
            try {

                if (currUser) {

                    const response = await axios.post('http://localhost:3001/admin/getForms',
                        reqBody
                    );
                    const fetchedForms = response.data.forms;
                    dispatch(setInitialState(fetchedForms));
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (user !== null)
            fetchForms();

    }, [navigate, setUser]);

    return (
        user &&
        <>


            <HomePageNavbar username={user?.result.username}/>
            <div className="home-page-container">


                {
                    forms ? <h5>Create your first form</h5> : <h5>Your forms</h5>

                }

                <FormsContainer/>

            </div>
        </>

    );
};
