import React, {useContext, useEffect, useState} from "react";
import Button from "../buttons/button";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import {useDispatch, useSelector} from "react-redux";
import {editFormName} from "../../reducers/formObjectReducer";
import PublishFormModal from "../modals/PublishFormModal";
import ConfirmOverwrite from "../modals/ConfirmOverwrite";
import _ from "lodash";
import UserContext from "../../context/UserContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import BorderColorIcon from '@mui/icons-material/BorderColor';


function CreateFormNavBar(props) {
    const formObject = useSelector((state) => state.formObject);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(formObject)

    const [url, setUrl] = useState('');

    function generateFormUrl(formName) {
        const formattedFormName = _.kebabCase(formName); // Convert form name to kebab-case
        const baseUrl = 'https://example.com/forms'; // Replace with your base URL
        const newUrl = `${baseUrl}/${formattedFormName}`;
        setUrl(newUrl);
    }

    const {user, setUser} = useContext(UserContext);
    const storeForm = async () => {
        try {
            const requestBody = {
                email: user.result.email,
                token: user.token, // Replace with your authentication token
                formObject: formObject,
            };

            // Add the form to the database
            await axios.post('http://localhost:3001/admin/createForm', requestBody);
            console.log('Form stored successfully');
            navigate("/")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setIsUpdateModalOpen(true);
                console.log("open modal")
            } else {
                console.error('Error:', error);
            }
        }
    };
    const updateForm = async () => {
        try {
            const requestBody = {
                email: user.result.email,
                token: user.token, // Replace with your authentication token
                formObject: formObject,
            };

            // Add the form to the database
            await axios.post('http://localhost:3001/admin/updateForm', requestBody);
            console.log('Form stored successfully');
            navigate("/")
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const handlePublish = () => {
        console.log('Publishing form...');
        storeForm();
        setIsModalOpen(false);
    };
    const handleUpdateForm = () => {
        console.log('Publishing form...');
        updateForm();
        setIsUpdateModalOpen(false);
    }

    useEffect(() => {
        generateFormUrl(formObject.form_name);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


    const handleNext = () => {
        setIsModalOpen(true);

    };


    return (

        <div data-role="navbar" className="create-forms-navbar">

            <div className="navbar-header">
                <div className="navbar-logo"><DynamicFormIcon/></div>
                <a href="/">
                    Forms<span>Generator</span>
                </a>
            </div>
            <div className="edit-form-name">
                <input
                    className="form-name-input"
                    type="text"
                    placeholder="Tap to edit form title"
                    value={formObject.form_name}
                    onChange={(e) => dispatch(editFormName(e.target.value))}
                />
                <div className="icon"><BorderColorIcon/></div>
            </div>

            <div onClick={handleNext}>
                <Button name={"Next"}/>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <PublishFormModal
                        handlePublish={handlePublish}
                        url={url}
                        generateFormUrl={generateFormUrl}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            )}
            {isUpdateModalOpen && (
                <div className="modal-overlay">
                    <ConfirmOverwrite
                        handleUpdateForm={handleUpdateForm}
                        setIsUpdateModalOpen={setIsUpdateModalOpen}/>
                </div>
            )}
        </div>
    );
}

export default CreateFormNavBar;
