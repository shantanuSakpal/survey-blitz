import React from 'react';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {setInitialState} from "../../reducers/formObjectReducer";

function CreateFormButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddForm = () => {
        let date = Date.now();

        dispatch(setInitialState({
            form_id: date - 1,
            form_name: "",
            url: "",
            form_description: "",
            form_sections: [
                {
                    section_id: date,
                    section_name: "Untitled Page",
                    section_components: [],
                },
            ],
            currSectionId: date,
            currComponentId: null,
            is_active: true,
        }));
        localStorage.setItem("currFormObject", JSON.stringify({
                form_id: date - 1,
                form_name: "",
                url: "",
                form_description: "",
                form_sections: [
                    {
                        section_id: date,
                        section_name: "Untitled Page",
                        section_components: [
                            {
                                component_id: date - 1,
                                component_type: "short_text",
                                is_required: false,
                                component_prop_object: {
                                    question: "",

                                }
                            },
                        ],
                    },
                ],
                currSectionId: date,
                currComponentId: date - 1,
                is_active: true,

            })
        );
        navigate("/create-form")

    }

    return (
        <div className="form-card-container"
             onClick={() => handleAddForm()}>
            <div className="inner-container">
                <div className="icon">
                    <AddIcon/>
                </div>
                <div className="form-name">
                    New Form
                </div>
            </div>

        </div>
    );
}

export default CreateFormButton;
