import React, {useContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EnterOtpModal from "../components/modals/EnterOtpModal";

function SignUp() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        otp: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
        setErrors({...errors, [name]: ""});
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({inputValues});

        const {email, password, confirmPassword, username} = inputValues;

        // Check if any of the fields are empty
        if (!email || !password || !confirmPassword || !username) {
            setErrors({
                email: email ? "" : "Email is required",
                password: password ? "" : "Password is required",
                confirmPassword: confirmPassword ? "" : "Confirm Password is required",
                username: username ? "" : "Username is required",
                otp: ""
            });
            return;
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({email: "Invalid email address"});
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setErrors({confirmPassword: "Passwords do not match"});
            return;
        }

        // Check password requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setErrors({
                password:
                    "Password must have at least 6 characters, one capital letter, and one special character  '!@#$%^&*'"
            });
            return;
        }

        // Check username contains only capital and small letters and space

        // const usernameRegex = /^[a-zA-Z]+$/;
        // if (!usernameRegex.test(username)) {
        //     setErrors({username: "Username can only contain capital and small letters"});
        //     return;
        // }

        setShowModal(true);
    };

    const handleModalSubmit = () => {
        const {otp} = inputValues;

        // Check if OTP is valid
        if (!otp.match(/^\d{6}$/)) {
            setErrors({otp: "Invalid OTP"});
            return;
        }

        setUser(inputValues);

        axios
            .post("http://localhost:3001/admin/signUp", inputValues)
            .then((res) => {
                console.log(res.data);
                navigate("/");
                localStorage.setItem("currUser", JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log(err);
                navigate("/signIn");
            });
    };

    return (
        <div className="sign-up-page">
            <form id="container">
                <h3 id="Heading">Create your free account!</h3>
                <span>
          Already have an account? <a href="/signIn">Log In</a>
        </span>

                <div className="row">
                    <div className="icon">
                        <PersonIcon/>
                    </div>
                    <input
                        name="username"
                        type="text"
                        placeholder="Full Name"
                        required
                        onChange={handleOnChange}
                    />
                </div>
                {errors.username && <div className="error">{errors.username}</div>}

                <div className="row">
                    <div className="icon">
                        <EmailIcon/>
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        onChange={handleOnChange}
                    />
                </div>
                {errors.email && <div className="error">{errors.email}</div>}

                <div className="row">
                    <div className="icon">
                        <VpnKeyIcon/>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        required
                        onChange={handleOnChange}
                    />
                    <div className="show-icon">
                        {showPassword ? (
                            <VisibilityOffIcon onClick={togglePasswordVisibility}/>
                        ) : (
                            <VisibilityIcon onClick={togglePasswordVisibility}/>
                        )}
                    </div>
                </div>
                {errors.password && <div className="error">{errors.password}</div>}

                <div className="row">
                    <div className="icon">
                        <VpnKeyIcon/>
                    </div>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        onChange={handleOnChange}
                    />
                    <div className="show-icon">
                        {showConfirmPassword ? (
                            <VisibilityOffIcon onClick={toggleConfirmPasswordVisibility}/>
                        ) : (
                            <VisibilityIcon onClick={toggleConfirmPasswordVisibility}/>
                        )}
                    </div>
                </div>
                {errors.confirmPassword && (
                    <div className="error">{errors.confirmPassword}</div>
                )}

                <button type="submit" onClick={handleSubmit}>
                    Sign Up
                </button>
            </form>

            {showModal && (
                <EnterOtpModal/>
            )}
        </div>
    );
    //Shan@123
}

export default SignUp;
