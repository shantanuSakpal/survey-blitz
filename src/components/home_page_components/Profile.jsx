import React, {useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";
import EditProfile from "../modals/EditProfile";

function Profile(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Remove JWT from local storage
        localStorage.removeItem("currUser");

        // Redirect to the login page
        navigate('/signIn');
    };

    const handleEditProfile = () => {
        // Open the modal
        setIsModalOpen(true);

    };

    return (
        <div className="profile">
            <div className="profile-header" onClick={handleDropdownToggle}>
                <AccountCircleIcon/>
                <div>Your Profile</div>
            </div>
            {isDropdownOpen && (
                <div className="dropdown">
                    <div onClick={handleEditProfile}>Edit Profile</div>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            )}
            {isModalOpen && (
                <EditProfile setIsModalOpen={setIsModalOpen}

                />
            )}
        </div>
    );
}

export default Profile;
