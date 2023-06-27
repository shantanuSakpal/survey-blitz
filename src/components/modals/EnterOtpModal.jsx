import React, {useContext} from 'react';
import axios from "axios";
import Button from "../buttons/button";
import {useNavigate} from "react-router-dom";
import UserContext from "../../context/UserContext";

function EnterOtpModal({errors, setErrors, inputValues, handleOnChange}) {


    const navigate = useNavigate();
    const handleModalSubmit = () => {
        if (inputValues.otp !== "123456") {
            setErrors({otp: "Invalid OTP"});
            return false;
        }

        axios
            .post("http://localhost:3001/admin/signUp", inputValues)
            .then((res) => {

                localStorage.setItem("currUser", JSON.stringify(res.data));
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 400) {
                    setErrors({email: "Email already exists, please Sign In to continue."});
                }
            });
    };


    return (

        <div className="modal-container">

            <form className="modal-content">
                <h3>Enter the OTP sent to your email</h3>
                <input
                    type="text"
                    placeholder="OTP"
                    name="otp"
                    required
                    onChange={handleOnChange}

                />
                {errors.otp && <div className="error">{errors.otp}</div>}
                <div
                    onClick={handleModalSubmit}
                >

                    <Button name="Submit"/>
                </div>


            </form>
        </div>

    );
}

export default EnterOtpModal;