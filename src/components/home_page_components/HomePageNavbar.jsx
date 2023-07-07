import React, {useState} from 'react';

import FeedIcon from '@mui/icons-material/Feed';
import AccountSettings from "../modals/AccountSettings";
import AppLogo from "../brand_logo/AppLogo";
import Profile from "./Profile";

function HomePageNavbar({username, form_name, handleSearch, page}) {
    const count = 5;
    //get the url after / and store in const
    const path = window.location.pathname.substring(1);


    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="home-page-left-sidebar">


            <div className="brand-logo-container">
                <AppLogo/>
            </div>


            <div className="links-container">
                <div className={`link ${path === "home" ? "selected" : ""}`}>
                    <FeedIcon fontSize="smaller"/>
                    <p>Forms</p>
                    <span>{count}</span>
                </div>
                <div className="link">
                    <FeedIcon fontSize="smaller"/>
                    <p>Usage</p>
                    <span>{count}</span>
                </div>
                <div className="link">
                    <FeedIcon fontSize="smaller"/>
                    <p>Users</p>
                    <span>{count}</span>
                </div>
                <div className="link">
                    <FeedIcon fontSize="smaller"/>
                    <p>Billing</p>
                    <span>{count}</span>
                </div>
                <div className="link">
                    <FeedIcon fontSize="smaller"/>
                    <p>Forms</p>
                    <span>{count}</span>
                </div>
            </div>


            <Profile
                setModalOpen={setModalOpen}
                username={username}
            />


            {
                modalOpen && <AccountSettings
                    setModalOpen={setModalOpen}
                />
            }


        </div>
    );
}

export default HomePageNavbar;