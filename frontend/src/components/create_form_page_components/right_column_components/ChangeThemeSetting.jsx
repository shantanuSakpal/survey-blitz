import React from "react";
import {ThemeContext} from "../../../context/ThemeContext";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "../../../reducers/formObjectReducer";

function ChangeThemeSetting(props) {
    const formObject = useSelector((state) => state.formObject);

    const dispatch = useDispatch();
    const changeTheme = (x) => {
        dispatch(setTheme(x));

    };

    return (
        <div className="theme-toggle-btn-container">
            <div
                className={`theme-toggle theme-light ${formObject?.theme === "white" ? "selected" : ""}`}
                onClick={() => {
                    changeTheme("white");
                }}
            ></div>
            <div
                className={`theme-toggle theme-pink ${formObject?.theme === "pink" ? "selected" : ""}`}
                onClick={() => {
                    changeTheme("pink");
                }}
            ></div>
            <div
                className={`theme-toggle theme-blue ${formObject?.theme === "blue" ? "selected" : ""}`}
                onClick={() => {
                    changeTheme("blue");
                }}
            ></div>
        </div>
    );
}

export default ChangeThemeSetting;
