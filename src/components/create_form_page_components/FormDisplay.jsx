import React from "react";

import {SectionHeader} from "./inputComponents/SectionHeader";
import {FormComponentContainer} from "./inputComponents/FormComponentContainer";
import {useSelector} from "react-redux";
import {AddInputButton} from "../buttons/AddInputButton";

function FormDisplay() {
    const formObject = useSelector(
        (state) => state.formObject
    );
    const formSectionsArray = formObject.form_sections
    const currSectionId = formObject.currSectionId

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
            <AddInputButton/>

        </div>
    );
}

export default FormDisplay;
