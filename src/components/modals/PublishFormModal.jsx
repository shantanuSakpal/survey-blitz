import React, {useEffect} from 'react';
import Button from '../buttons/button';
import {useDispatch, useSelector} from 'react-redux';
import {editFormName} from '../../reducers/formObjectReducer';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from 'react-textarea-autosize';

function PublishFormModal({setIsModalOpen, url, handlePublish, generateFormUrl}) {
    const formObject = useSelector((state) => state.formObject);
    const dispatch = useDispatch();

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
