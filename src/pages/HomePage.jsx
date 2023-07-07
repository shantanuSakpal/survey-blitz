import React, {useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import FormsContainer from '../components/home_page_components/FormsContainer';
import {useNavigate} from 'react-router-dom';
import HomePageNavbar from "../components/home_page_components/HomePageNavbar";
import {useDispatch, useSelector} from "react-redux";
import {setInitialState} from "../reducers/adminFormsReducer";
import {ToastContainer} from "react-toastify";
import CreateFormButton from "../components/buttons/CreateFormButton";

export const HomePage = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const forms = useSelector((state) => state.adminFormsArray);


    const currUser = JSON.parse(localStorage.getItem('currUser'));
    useEffect(() => {
        //if user is not logged in, redirect to login page
        if (!currUser) {
            navigate('/signIn');
        } else {

            setUser(currUser);
        }

        if ((currUser)) {

            const reqBody = {
                email: currUser.result.email,
                token: currUser.token,
            }

            axios.post('http://localhost:3001/admin/getForms',
                reqBody
            ).then((response) => {
                const fetchedForms = response.data.forms;
                dispatch(setInitialState(fetchedForms));

            }).catch((error) => {
                console.error('Error:', error);
            })
        }


    }, [setUser]);


    const handleSearch = (e) => {


    }


    return (
        currUser &&
        <>


            <div className="home-page-container">
                <HomePageNavbar page={"home"}
                                username={currUser?.result.username}

                />

                <div className="home-page-right-container">
                    <div className="search-and-sort-container ">
                        <h4>Your Forms</h4>

                    </div>
                    {/*{*/}
                    {/*    forms ? <>*/}

                    {/*        <FormsContainer*/}
                    {/*            forms={forms}*/}
                    {/*        />*/}
                    {/*    </> : <h5>Create your first form</h5>*/}

                    {/*}*/}
                    {/*<CreateFormButton/>*/}
                </div>


            </div>
            <ToastContainer position="top-right" autoClose={2000}/>
        </>

    );
};
