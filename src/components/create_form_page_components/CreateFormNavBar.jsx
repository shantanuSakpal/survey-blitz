import React, {useContext, useEffect, useState} from "react";
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
import {toast} from 'react-toastify';
import AppLogo from "../brand_logo/AppLogo";


function CreateFormNavBar(props) {
    const formObject = useSelector((state) => state.formObject);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:3001/admin/createForm', requestBody);
            console.log('Form stored successfully', response);
            toast.success(response.data.message);

        } catch (error) {

            if (error.response && error.response.status === 400) {
                setIsUpdateModalOpen(true);
                console.log("open modal")
            } else {
                console.error('Error:', error);
                toast.error(error.response.data.message)
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
            const response = await axios.post('http://localhost:3001/admin/updateForm', requestBody);
            console.log('Form updated successfully');
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            console.error('Error:', error);
        }
    }


    const handlePublish = () => {
        console.log('Publishing form...');
        storeForm().then(() => {
            navigate("/home")

        });
        setIsModalOpen(false);
    };
    const handleUpdateForm = () => {
        console.log('Publishing form...');
        updateForm().then(() => {
            navigate("/home")

        });
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

            <div className="navbar-brand"
                 onClick={() => navigate("/home")}
            >
                <AppLogo/>
            </div>
            {/*<div className="edit-form-name">*/}
            {/*    <input*/}
            {/*        className="form-name-input"*/}
            {/*        type="text"*/}
            {/*        placeholder="Tap to edit form title"*/}
            {/*        value={formObject.form_name}*/}
            {/*        onChange={(e) => dispatch(editFormName(e.target.value))}*/}
            {/*    />*/}
            {/*    <div className="icon"><BorderColorIcon/></div>*/}
            {/*</div>*/}

            <div className="nav-buttons">
                <div className="next-button" onClick={handleNext}>Next</div>
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
