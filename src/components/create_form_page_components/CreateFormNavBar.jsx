import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editFormName, setIsActiveStatus} from "../../reducers/formObjectReducer";
import PublishFormModal from "../modals/PublishFormModal";
import ConfirmOverwrite from "../modals/ConfirmOverwrite";
import _ from "lodash";
import UserContext from "../../context/UserContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {toast} from 'react-toastify';
import AppLogo from "../brand_logo/AppLogo";
import ConfirmDeactivateForm from "../modals/ConfirmDeactivateForm";


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
    //get currUser fron local storage

    const [confirmDeactivateModal, setConfirmDeactivateModal] = useState(false);
    useEffect(() => {
        const currUser = JSON.parse(localStorage.getItem('currUser'));
        setUser(currUser);
    }, []);
    const handleDeactivateForm = () => {

        dispatch(setIsActiveStatus())
        setConfirmDeactivateModal(false)
    }


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
            navigate("/home")
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
            console.log('Form stored successfully');
            toast.success(response.data.message)
            navigate("/home")
        } catch (error) {
            toast.error(error.response.data.message)
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

            <div className="navbar-brand"
                 onClick={() => navigate("/home")}
            >
                <AppLogo/>
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


            <div className="nav-buttons">
                <div className="status">

                    {
                        formObject.is_active ? (
                            <div className="active"> Form Active</div>
                        ) : (
                            <div className="inactive">Form Inactive</div>
                        )
                    }
                    <label className="switch">
                        <input type="checkbox" className="checkbox"
                               checked={formObject.is_active}
                               readOnly
                        />
                        <div className="slider"
                             onClick={() => {
                                 if (formObject.is_active)
                                     setConfirmDeactivateModal(true)
                                 else
                                     handleDeactivateForm()

                             }
                             }
                        ></div>

                    </label>
                </div>
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
            {
                confirmDeactivateModal && formObject.is_active && (
                    <ConfirmDeactivateForm
                        setConfirmDeactivateModal={setConfirmDeactivateModal}
                        handleDeactivateForm={handleDeactivateForm}
                    />
                )
            }

        </div>
    );
}

export default CreateFormNavBar;
