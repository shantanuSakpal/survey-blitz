import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from "./Logout";

function Profile(props) {
    return (
        <div className="profile">
            <AccountCircleIcon/>
            <div>Your Profile</div>
            <Logout/>
        </div>
    );
}

export default Profile;