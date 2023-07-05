import React, {useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import FormsContainer from '../components/home_page_components/FormsContainer';
import {useNavigate} from 'react-router-dom';
import HomePageNavbar from "../components/home_page_components/HomePageNavbar";
import {useDispatch, useSelector} from "react-redux";
import {setInitialState} from "../reducers/adminFormsReducer";
import {ToastContainer} from "react-toastify";

export const HomePage = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const forms = useSelector((state) => state.adminFormsArray);
    const [filtered_forms, setFilteredForms] = React.useState(null);


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
                    setFilteredForms(forms)
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (user !== null)
            fetchForms();

    }, [navigate, setUser]);


    const handleSearch = (e) => {
        if (e === "")
            setFilteredForms(forms)
        else {
            setFilteredForms(forms.filter((form) => form.formObject.form_name.toLowerCase().includes(e.toLowerCase())));
        }

    }


    return (
        user &&
        <>


            <HomePageNavbar page={"home"}
                            username={user?.result.username}
                            handleSearch={handleSearch}
            />
            <div className="home-page-container">

                {
                    filtered_forms ? <h5>Your forms</h5> : <h5>Create your first form</h5>

                }
                <FormsContainer
                    forms={filtered_forms}
                />

            </div>
            <ToastContainer position="top-right" autoClose={2000}/>
        </>

    );
};
