import React from 'react';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {setInitialState} from "../../reducers/formObjectReducer";

function CreateFormButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <div className="create-form-button"
             onClick={() => {
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
             }}>
            <AddIcon/>
            New
        </div>
    );
}

export default CreateFormButton;
