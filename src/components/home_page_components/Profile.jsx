import React, {useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Profile({username}) {


    return (
        <div className="profile">
            <div className="profile-header">
                <div><AccountCircleIcon/></div>
                <div>{username}</div>
            </div>


        </div>
    );
}

export default Profile;
