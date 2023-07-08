import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import FormsContainer from '../components/home_page_components/FormsContainer';
import {useNavigate} from 'react-router-dom';
import HomePageNavbar from "../components/home_page_components/HomePageNavbar";
import {useDispatch, useSelector} from "react-redux";
import {setInitialState} from "../reducers/adminFormsReducer";
import {ToastContainer} from "react-toastify";
import CreateFormButton from "../components/buttons/CreateFormButton";
import {Search} from "@mui/icons-material";

export const HomePage = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [forms, setForms] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sortType, setSortType] = useState('newest');


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
                setForms(fetchedForms);
                console.log(fetchedForms);

            }).catch((error) => {
                console.error('Error:', error);
            })
        }


    }, [setUser]);


    const handleSearch = (e) => {
        setSearchText(e.target.value);

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
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px"
                        }}>
                            <div className="search-bar">
                                <div className="icon">
                                    <Search fontSize="small"/>
                                </div>
                                <input
                                    placeholder="Search forms"
                                    value={searchText}
                                    onChange={handleSearch}

                                />
                            </div>
                            <div className="sort-button">
                                <select name="sort" id="sort"
                                        onChange={(e) => {
                                            setSortType(e.target.value);
                                        }}
                                        value={sortType}
                                >
                                    <option value="newest"

                                    >Newest first
                                    </option>
                                    <option value="oldest"

                                    >Oldest first
                                    </option>
                                    <option value="alphabetical"

                                    >Alphabetical
                                    </option>
                                </select>
                            </div>

                        </div>


                    </div>

                    <FormsContainer
                        forms={forms}
                        searchText={searchText}
                        sortType={sortType}
                    />

                </div>


            </div>
            <ToastContainer position="top-right" autoClose={2000}/>
        </>

    );
};
