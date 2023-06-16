import React from "react";
import Button from "../buttons/button";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import {useSelector} from "react-redux";
import {saveAs} from 'file-saver';

function CreateFormNavBar(props) {
    // Get the form object from the state or wherever it is stored
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formObject = useSelector((state) =>
        state.formObject
    );

    const handlePublish = () => {

        // Convert the form object to JSON string
        const jsonString = JSON.stringify(formObject);

        // Create a Blob with the JSON string
        const blob = new Blob([jsonString], {type: 'application/json'});

        // Save the Blob as a file
        saveAs(blob, 'formObject.js');
        console.log("published")
    };

    return (
        <div data-role="navbar" className="navbar-container">
            <WebStoriesIcon/>
            <h2>{props.formName}</h2>

            <div
                onClick={() =>
                    handlePublish()
                }>
                <Button name={"Publish"}/>
            </div>
        </div>
    );
}

export default CreateFormNavBar;
