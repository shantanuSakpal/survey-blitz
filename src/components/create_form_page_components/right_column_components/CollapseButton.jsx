import React, {useState, useEffect} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChangeStatusSetting from "./ChangeStatusSetting";
import ChangeThemeSetting from "./ChangeThemeSetting";
import EditFormNameSetting from "./EditFormNameSetting";


const CollapseButton = ({icon, text, content}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const content = document.getElementById(`content-${text}`);
        if (isExpanded) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    }, [isExpanded, text]);

    return (
        <>
            <div className={`collapse-btn ${isExpanded ? "active" : ""}`} onClick={() => setIsExpanded(!isExpanded)}>
                <div className="icon">{icon}</div>
                <div className="text">{text}</div>
                <div className="arrow-icon">
                    {isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </div>

            </div>
            <div id={`content-${text}`} className="content">
                {
                    content === "name" ? (
                        <EditFormNameSetting/>
                    ) : (content === "theme" ? (
                        <ChangeThemeSetting/>
                    ) : (content === "status" ? (
                        <ChangeStatusSetting/>

                    ) : null))
                }
            </div>
        </>
    );
};

export default CollapseButton;
