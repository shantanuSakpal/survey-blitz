import React from "react";
import {CloseInputButton} from "../buttons/CloseInputButton";
import {AddInputButton} from "../buttons/AddInputButton";
import AddInput from "./AddInput";
import {SectionHeader} from "./inputComponents/SectionHeader";
import {FormComponentContainer} from "./inputComponents/FormComponentContainer";
import {useSelector} from "react-redux";

function FormDisplay() {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const currSectionId = useSelector((state) => state.formObject.currSectionId);

    const addInputState = useSelector((state) => state.formObject.addInputState);


    return (
        <div id="middle_column" className=" middle-column-container">
            {
                //find the section with the currentSectionId from the formSectionsArray and render its name and form_components
                formSectionsArray &&
                formSectionsArray.map((section) => {
                    if (section.section_id === currSectionId) {
                        return (
                            <div key={section.section_id}
                            >
                                <div>
                                    <SectionHeader/>
                                </div>
                                {section.section_components.map((component) => (
                                    <FormComponentContainer
                                        key={component.component_id}
                                        component_id={component.component_id}
                                        component_type={component.component_type}
                                    />
                                ))}

                            </div>

                        );
                    }
                    return null;
                })
            }
            <div className="add-input-container">

                <AddInput/>
                {
                    //if addInputState is true, then show the AddInput component
                    addInputState ? (
                        <CloseInputButton/>
                    ) : (
                        <AddInputButton currSectionId={currSectionId}/>
                    )
                }
                {/*<h3>*/}
                {/*    Add Input to Section*/}
                {/*</h3>*/}
            </div>
        </div>
    );
}

export default FormDisplay;
