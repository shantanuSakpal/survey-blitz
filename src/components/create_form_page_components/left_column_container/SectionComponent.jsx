import React, {useState} from "react";
import {DeleteButton} from "../../buttons/DeleteButton";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ConfirmDelete from "../../modals/ConfirmDelete";

export const SectionComponent = ({section_id, index}) => {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );
    const currSectionId = useSelector((state) => state.formObject.currSectionId);
    const handleSectionDelete = () => {
        setConfirmDeleteOpen(true);

        // If the component being removed is the current component, set the current component to the first component in the form

    }
    return (
        <div
            id={section_id}
            className={`section ${currSectionId === section_id ? "selected" : ""}`}>
            {
                formSectionsArray.length > 1 && (
                    <div className="drag-component-small">
                        <DragIndicatorIcon fontSize="smaller"/>
                    </div>
                )
            }


            <div className="section-name">
                {formSectionsArray[index].section_name}
            </div>

            <div
                className="delete-section-button"
                onClick={
                    //delete the item from the form
                    () => {
                        handleSectionDelete();
                    }
                }
            >
                {formSectionsArray.length > 1 && <DeleteButton color="white"/>}
            </div>
            {
                confirmDeleteOpen && (
                    <div
                    >
                        <ConfirmDelete
                            what={"page"}
                            setDeleteModalOpen={setConfirmDeleteOpen}
                            currSectionId={currSectionId}

                        />
                    </div>
                )
            }

        </div>
    );
};
