import React, {useEffect, useState} from 'react';
import Button from '../buttons/button';
import {useDispatch, useSelector} from 'react-redux';
import {editFormName} from '../../reducers/formObjectReducer';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from 'react-textarea-autosize';

function EditProfile({setIsModalOpen, url, handlePublish, generateFormUrl}) {
    const formObject = useSelector((state) => state.formObject);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSaveProfile = () => {
       
        setIsModalOpen(false);
    };


    return (
        <div>
            <h2>Edit Profile</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleSaveProfile}>Save</button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default EditProfile;
