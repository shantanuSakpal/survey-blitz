import React from 'react';
import axios from "axios";

function EnterOtpModal(props) {
    const handleModalSubmit = () => {
        //write code to  validate otp
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

                />
                {/*{errors.otp && <div className="error">{errors.otp}</div>}*/}
                <button type="submit" onClick={handleModalSubmit}>
                    Submit
                </button>
            </form>
        </div>

    );
}

export default EnterOtpModal;