import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Profile(props) {
    return (
        <div className="profile">
            <AccountCircleIcon/>
            <div>Your Profile</div>
        </div>
    );
}

export default Profile;