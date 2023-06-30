import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {removeSection, updateSectionName} from "../../../reducers/formObjectReducer";
import CreateIcon from '@mui/icons-material/Create';
import {DeleteButton} from "../../buttons/DeleteButton";
import ConfirmDelete from "../../modals/ConfirmDelete";

export const SectionHeader = ({}) => {

    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const currSectionId = useSelector((state) => state.formObject.currSectionId);

    const index = formSectionsArray.findIndex(
        (section) => section.section_id === currSectionId
    );

    const dispatch = useDispatch();
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    return (
        <div className="section-header">
            <div className="section-name">
                <input
                    className="section-name-input"
                    id="section_name"
                    required=""
                    type="text"
                    onClick={(e) => {
                        if (e.target) {
                            e.target.setSelectionRange(0, e.target.value.length);
                        }
                    }}
                    value={formSectionsArray[index].section_name}
                    onChange={(e) => {
                        dispatch(
                            updateSectionName({
                                section_id: currSectionId,
                                section_name: e.target.value,
                            })
                        );
                    }}
                />
                <span className="section-name-highlight"></span>
                <span className="section-name-bar"></span>
                <div className="icons-container">
                    <div className="icon" onClick={() => {
                        //focus on input
                        document.getElementById("section_name").focus();


                    }}><CreateIcon/></div>
                    <div
                        className="delete-section-button"
                        onClick={
                            //delete the item from the form
                            () => {
                                setConfirmDeleteOpen(true);
                            }
                        }
                    >
                        {formSectionsArray.length > 1 && <DeleteButton/>}
                    </div>
                </div>
                <label>Page Title</label>

            </div>
            {
                confirmDeleteOpen && (
                    <div
                    >
                        <ConfirmDelete
                            what={"section"}
                            setDeleteModalOpen={setConfirmDeleteOpen}
                            currSectionId={currSectionId}

                        />
                    </div>
                )
            }
        </div>
    );
};
