import React from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {updateSectionName} from "../../../reducers/formObjectReducer";
import CreateIcon from '@mui/icons-material/Create';

export const SectionHeader = ({}) => {
    const formComponentsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const currSectionId = useSelector((state) => state.formObject.currSectionId);

    const index = formComponentsArray.findIndex(
        (section) => section.section_id === currSectionId
    );

    const dispatch = useDispatch();

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
                    value={formComponentsArray[index].section_name}
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
                <div className="icon" onClick={() => {
                    //focus on input
                    document.getElementById("section_name").focus();


                }}><CreateIcon/></div>
                <label>Section Name</label>
            </div>
        </div>
    );
};
