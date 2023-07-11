import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import {useDispatch} from 'react-redux';
import {setInitialState} from '../../reducers/formObjectReducer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDelete from '../modals/ConfirmDelete';
import formImg from '../../images/form-image-1.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from "@mui/icons-material/Close";

function AdminFormsListItem({form}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [showMoreOptionsIcon, setShowMoreOptionsIcon] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    const handleMouseEnter = () => {
        setShowMoreOptionsIcon(true);
    };

    const handleMouseLeave = () => {
        setShowMoreOptionsIcon(false);
        setShowMoreOptions(false);
    };

    const handleEdit = () => {
        dispatch(setInitialState(form.formObject));
        //save the curr form object to local storage
        localStorage.setItem("currFormObject", JSON.stringify(form.formObject))
        navigate("/create-form")
    };

    const handleView = () => {
        navigate(`${form.formObject.url}`)
    };

    const handleAnalytics = () => {
        navigate(`/analytics/${form.form_id}`)
    };

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    return (
        <>
            <div
                className="form-card-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={`more-options ${showMoreOptionsIcon ? '' : 'hide'}`}>
                    <div
                        className="more-options-icon"
                        onClick={() => setShowMoreOptions(!showMoreOptions)}
                    >
                        {
                            showMoreOptions ? (
                                <CloseIcon sx={{marginBottom: '-5px'}}/>

                            ) : (
                                <MoreVertIcon sx={{marginBottom: '-5px'}}/>
                            )
                        }
                    </div>
                    <div className={`options-modal ${showMoreOptions ? '' : 'hide'}`}>
                        <div className="option" onClick={handleEdit}>

                            Edit
                        </div>
                        <div className="option" onClick={handleView}>

                            View
                        </div>
                        <div className="option" onClick={handleAnalytics}>

                            Show Responses
                        </div>
                        <div className="option" onClick={handleDelete}>

                            Delete
                        </div>
                    </div>
                </div>

                <div className="inner-container">
                    <div className="icon">
                        <img src={formImg} alt=" img"/>
                    </div>
                    <div className="form-name">{form.formObject.form_name}</div>
                </div>


            </div>
            {deleteModalOpen && (
                <ConfirmDelete
                    form={form}
                    what="form"
                    setDeleteModalOpen={setDeleteModalOpen}
                />
            )}
        </>
    );
}

export default AdminFormsListItem;
