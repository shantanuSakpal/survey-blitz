import React, {useState} from "react";
import Button from "../buttons/button";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import {useDispatch, useSelector} from "react-redux";
import {editFormName} from "../../reducers/formObjectReducer";
import PublishFormModal from "../modals/PublishFormModal";


function CreateFormNavBar(props) {
    const formObject = useSelector((state) => state.formObject);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNext = () => {
        setIsModalOpen(true);

    };


    return (

        <div data-role="navbar" className="navbar-container">

            <WebStoriesIcon/>
            <input
                className="form-name-input"
                type="text"
                placeholder="Tap to edit form title"
                value={formObject.form_name}
                onChange={(e) => dispatch(editFormName(e.target.value))}
            />

            <div onClick={handleNext}>
                <Button name={"Next"}/>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <PublishFormModal

                        setIsModalOpen={setIsModalOpen}/>
                </div>
            )}
        </div>
    );
}

export default CreateFormNavBar;
