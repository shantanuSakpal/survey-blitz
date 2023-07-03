import React, {useState} from 'react';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import AccountSettings from "../modals/AccountSettings";
import {ToastContainer} from 'react-toastify';

function HomePageNavbar({username, page}) {

    const handleLogout = () => {
        // Remove JWT from local storage
        localStorage.removeItem("currUser");

    };
    const [modalOpen, setModalOpen] = useState(false);


    return (
        <div className="home-page-navbar">
            <nav className="navbar">
                <div className="container">

                    <div className="navbar-header">
                        <div className="navbar-logo"><DynamicFormIcon/></div>
                        <a href="/">
                            Forms<span>Generator</span>
                        </a>
                    </div>

                    <div className="navbar-menu" id="open-navbar1">
                        <ul className="navbar-nav">
                            {
                                (page !== "analytics") ? (
                                    <div className="search">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                                            <g>
                                                <path
                                                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                            </g>
                                        </svg>
                                        <input className="input" type="search" placeholder="Search forms..."/>
                                    </div>
                                ) : null
                            }

                            <div className="profile" onClick={() => {
                                setModalOpen(true);
                            }}>
                                <div className="username">{username}</div>
                                <div className="icon"><BorderColorIcon/></div>
                            </div>

                        </ul>
                    </div>
                    {
                        modalOpen && <AccountSettings
                            setModalOpen={setModalOpen}
                        />
                    }
                    <ToastContainer position="top-right" autoClose={2000}/>
                </div>
            </nav>
        </div>
    );
}

export default HomePageNavbar;