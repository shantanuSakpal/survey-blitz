import React from "react";
import {ComponentTreeItem} from "./ComponentTreeItem";
import {DeleteButton} from "../buttons/DeleteButton";
import {useDispatch} from "react-redux";
import {
    removeSection,
    setCurrSectionId,
} from "../../reducers/formObjectReducer";
import {useSelector} from "react-redux";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export const SectionComponent = ({section_id, index}) => {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );
    const currSectionId = useSelector((state) => state.formObject.currSectionId);

    const dispatch = useDispatch();

    return (
        <div id={section_id}
             className={`component-tree-section-style  ${currSectionId === section_id ? "selected" : ""}`}>
            {
                formSectionsArray.length > 1 && (
                    <div className="drag-component">
                        <DragIndicatorIcon/>
                    </div>
                )
            }

            <div className="component-tree-section-header">

                <div className="component-tree-section-name">
                    {formSectionsArray[index].section_name}
                </div>

                {/*<div*/}
                {/*    className="delete-section-button"*/}
                {/*    onClick={*/}
                {/*        //delete the item from the form*/}
                {/*        () => {*/}
                {/*            localStorage.setItem("currSectionId", section_id)*/}
                {/*            dispatch(removeSection(section_id));*/}
                {/*            // If the component being removed is the current component, set the current component to the first component in the form*/}

                {/*        }*/}
                {/*    }*/}
                {/*>*/}
                {/*    {formSectionsArray.length > 1 && <DeleteButton color="white"/>}*/}
                {/*</div>*/}
            </div>

            <div>
                {formSectionsArray[index].section_components.map((component, index) => {
                    return (
                        <div className="section-component" key={index}>
                            <ComponentTreeItem
                                component_id={component.component_id}
                                component_type={component.component_type}
                                section_id={section_id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
