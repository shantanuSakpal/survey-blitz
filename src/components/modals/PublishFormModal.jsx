import React, {useEffect, useState} from 'react';
import Button from '../buttons/button';
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {editFormName} from "../../reducers/formObjectReducer";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "react-textarea-autosize";

function PublishFormModal({setIsModalOpen}) {
    const formObject = useSelector((state) => state.formObject);
    const dispatch = useDispatch();

    const [url, setUrl] = useState("");

    function generateFormUrl(formName) {
        const formattedFormName = _.kebabCase(formName); // Convert form name to kebab-case
        const baseUrl = "https://example.com/forms"; // Replace with your base URL
        const newUrl = `${baseUrl}/${formattedFormName}`;
        setUrl(newUrl);
    }

    const storeForm = () => {
        const email = "shantanuesakpal1420@gmail.com";
        const requestBody = {
            email: email,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW50YW51ZXNha3BhbDE0MjBAZ21haWwuY29tIiwiaWQiOiI2NDkzZGY2MzIzYzg1MDA5NWM1ODYwMzMiLCJpYXQiOjE2ODc0MTM3ODl9.bm321vGL4i8vWm6umhLHSzjnyz5yPi5JLPYyi3nNgHU", // Replace with your authentication token
            formObject: formObject,
        };

        axios
            .post("http://localhost:3001/admin/createForm", requestBody)
            .then((response) => {
                console.log("Success:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handlePublish = () => {
        console.log("Publishing form...");
        storeForm();
        setIsModalOpen(false);
    };

    useEffect(() => {
        generateFormUrl(formObject.form_name);
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="close-modal-button" onClick={() => setIsModalOpen(false)}>
                    <CloseIcon fontSize="small"/>
                </div>
                <label>Form Title:</label>

                <br/>

                <div className="form question">
                    <TextareaAutosize
                        className="input"
                        placeholder="Tap to edit form title"
                        value={formObject.form_name}
                        onChange={(e) => {
                            dispatch(editFormName(e.target.value));
                            generateFormUrl(e.target.value);
                        }}
                        minRows={1}
                    />
                    <span className="input-border"></span>
                </div>
                <br/>
                <label>Generated URL:</label>

                <br/>
                <div className="form question">
                    <TextareaAutosize className="input" readOnly value={url} minRows={1}/>
                    <span className="input-border"></span>
                </div>
                <div className="publish-button" onClick={handlePublish}>
                    <Button name="Publish"/>
                </div>
            </div>
        </div>
    );
}

export default PublishFormModal;
