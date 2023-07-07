import React, {useContext, useState} from 'react';
import OnboardingImg from '../images/onboardingimage.png';
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import google_icon from "../images/google-icon.png";
import EmailIcon from "@mui/icons-material/Email";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import UserContext from "../context/UserContext";
import AppLogo from "../components/brand_logo/AppLogo";


const SignUpPage = () => {
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
    const [verificationStatus, setVerificationStatus] = useState(false);
    const [otpInput, setOtpInput] = useState(false);


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

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const {email} = inputValues;

        // Check if any of the fields are empty
        if (!email) {
            setErrors({
                email: email ? "" : "Email is required",

            });
            return;
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({email: "Invalid email address"});
            return;
        }

        // try {
        //     // Send API request to generate OTP and send it to the user's email
        //     const response = await axios.post('/api/send-otp', { email });
        //     // Handle success and show message to the user
        //     console.log('OTP sent successfully');
        // } catch (error) {
        //     // Handle error and show message to the user
        //     console.error('Failed to send OTP',error);
        // }
        //remove all erq
        setErrors({otp: ""});
        setOtpInput(true);


    };


    const handleOtpSubmit = async (e) => {
        e.preventDefault();
//check if otp contains 6 characters

        const otp = (inputValues.otp);

        if (otp.length !== 6) {
            setErrors({otp: 'OTP must contain 6 characters'});
            return;
        }


        // try {
        //     // Send API request to verify the entered OTP
        //     const response = await axios.post('/api/verify-otp', { email, otp });
        //     // Handle success and set the verification status
        //     setVerificationStatus(true);
        //     // Show message to the user that OTP is verified and they can fill in the form
        //     console.log('OTP verified successfully');
        // } catch (error) {
        //     // Handle error and show message to the user
        //     console.error('Failed to verify OTP',error);
        // }
        if (otp === "123456") {
            setVerificationStatus(true);
        } else {
            setErrors({otp: "Invalid OTP"});
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        //capitalize first letter of all words in username
        if (inputValues.username)
            inputValues.username = inputValues.username.replace(/\b\w/g, l => l.toUpperCase());


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
                    "Password must consist of at least 6 characters, a capital letter, a number and at least one of the special characters !@#$%^&*"
            });
            return;

        }
        axios
            .post("http://localhost:3001/admin/signUp", inputValues)
            .then((res) => {

                localStorage.setItem("currUser", JSON.stringify(res.data));
                console.log("User signed in successfully");

                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 400) {
                    setErrors({email: "Email already exists, please Sign In to continue."});
                }
            });

    };

    return (
        <div className="sign-in-page">

            <div className="left-container">
                <div className="brand-logo-container">
                    <AppLogo/></div>
                {
                    !verificationStatus && !otpInput ? (
                        <div className="inner-container">
                            <div className="header">Create your free account</div>
                            <p>Already have an account?
                                <span onClick={() => {
                                    navigate('/signIn');
                                }}>Sign In
                        </span>
                            </p>
                            <div className="options">

                                <button type="button" className="login-with-google-btn">
                                    <img src={google_icon} alt="google icon"/>
                                    Sign up with Google
                                </button>
                                <div className="divider">

                                    <div className="horizontal-line"></div>
                                    <p>OR</p>
                                    <div className="horizontal-line"></div>
                                </div>


                                <div className="email-option">
                                    <div style={{width: "100%"}}>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            required
                                            onChange={handleOnChange}
                                        />
                                        {errors.email && <div className="error">{errors.email}</div>}

                                    </div>
                                    <button className="email-button"
                                            onClick={handleEmailSubmit}
                                    >
                                        <EmailIcon/>
                                        Verify Email
                                    </button>
                                </div>


                                <div className="terms-and-conditions">By signing up, you agree to our <a
                                    href="#">Terms</a> & <a
                                    href="#">Privacy Policy</a>.
                                </div>
                            </div>
                        </div>

                    ) : !verificationStatus && otpInput ? (
                        <div className="inner-container">
                            <div className="header">Check your email</div>
                            <p>Enter the 6-digit code we sent to
                                <span>{inputValues.email}</span>
                                to verify your email address.
                            </p>
                            <div className="options">

                                <div className="email-option">
                                    <div style={{width: "100%"}}>


                                        <input
                                            type="text"
                                            placeholder="6-digit OTP"
                                            name="otp"
                                            required
                                            onChange={handleOnChange}
                                        />


                                        {errors.otp && <div className="error">{errors.otp}</div>}
                                    </div>
                                    <button className="email-button"
                                            onClick={handleOtpSubmit}
                                    >

                                        Verify OTP
                                    </button>
                                </div>
                                <div className="forgot-password" onClick={() => {
                                    setOtpInput(false)
                                }}>
                                    Change email address

                                </div>


                                <div className="terms-and-conditions">By signing up, you agree to our <a
                                    href="#">Terms</a> & <a
                                    href="#">Privacy Policy</a>.
                                </div>
                            </div>
                        </div>
                    ) : verificationStatus === true ? (
                        <div className="inner-container">
                            <div className="header">Tell us more about yourself !</div>

                            <div className="options">

                                <div className="email-option">
                                    <div style={{width: "100%"}}>
                                        <label htmlFor="username">Your name</label>
                                        <input
                                            name="username"
                                            type="text"
                                            placeholder="e.g. Jhon Doe"
                                            required
                                            onChange={handleOnChange}
                                        />
                                        {errors.username && <div className="error">{errors.username}</div>}
                                    </div>

                                    <div style={{width: "100%"}}>
                                        <label htmlFor="password">Password</label>

                                        <div className="password-input">

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="At least 6 characters"
                                                name="password"
                                                required
                                                onChange={handleOnChange}
                                            />

                                            <div className="visibility-icon">
                                                {showPassword ? (
                                                    <VisibilityOffOutlinedIcon onClick={togglePasswordVisibility}/>
                                                ) : (
                                                    <VisibilityOutlinedIcon onClick={togglePasswordVisibility}/>
                                                )}
                                            </div>
                                        </div>
                                        {errors.password && <div className="error">{errors.password}</div>}
                                    </div>


                                    <div style={{width: "100%"}}>

                                        <label htmlFor="username">Confirm Password</label>
                                        <div className="password-input">

                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Same as password"
                                                name="confirmPassword"
                                                required
                                                onChange={handleOnChange}
                                            />

                                            <div className="visibility-icon">
                                                {showConfirmPassword ? (
                                                    <VisibilityOffOutlinedIcon
                                                        onClick={toggleConfirmPasswordVisibility}/>
                                                ) : (
                                                    <VisibilityOutlinedIcon onClick={toggleConfirmPasswordVisibility}/>
                                                )}
                                            </div>
                                        </div>
                                        {errors.confirmPassword && (
                                            <div className="error">{errors.confirmPassword}</div>
                                        )}

                                    </div>

                                    <button className="email-button"
                                            onClick={handleSignUpSubmit}
                                    >

                                        Sign Up
                                    </button>
                                </div>

                                <div className="terms-and-conditions">By signing up, you agree to our <a
                                    href="#">Terms</a> & <a
                                    href="#">Privacy Policy</a>.
                                </div>
                            </div>
                        </div>
                    ) : null

                }
            </div>


            <div className="right-container">
                <img src={OnboardingImg} alt="Onbarding Image"/>
            </div>
        </div>
    );
};

export default SignUpPage;
