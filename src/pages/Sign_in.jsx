import React, {useContext, useState} from 'react';
import OnboardingImg from '../images/onboardingimage.png';
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import google_icon from "../images/google-icon.png";
import EmailIcon from "@mui/icons-material/Email";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AppLogo from "../components/brand_logo/AppLogo";

const SignInPage = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [forgotPassword, setForgotPassword] = useState(false);
    const [otpInput, setOtpInput] = useState(false);
    const [resetPassword, serResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
        setErrors({...errors, [name]: ""});
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();

        const {email, password} = inputValues;

        // Check if any of the fields are empty
        if (!email || !password) {
            setErrors({
                email: email ? "" : "Email is required",
                password: password ? "" : "Password is required"
            });
            return;
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({email: "Invalid email address"});
            return;
        }


        axios
            .post("http://localhost:3001/admin/signIn", inputValues)
            .then((res) => {
                localStorage.setItem("currUser", JSON.stringify(res.data));
                console.log("User signed in successfully");
                navigate("/home");

            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 404) {
                    setErrors({email: "Email does not exist. Please Sign Up to continue."})
                } else if (err.response.status === 400) {
                    setErrors({password: "Incorrect Password"})
                }
            });
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
        //     serResetPassword(true);
        //     // Show message to the user that OTP is verified and they can fill in the form
        //     console.log('OTP verified successfully');
        // } catch (error) {
        //     // Handle error and show message to the user
        //     console.error('Failed to verify OTP',error);
        // }
        if (otp === "123456") {
            serResetPassword(true);
        } else {
            setErrors({otp: "Invalid OTP"});
        }
    };

    const handleEmailSubmit = (e) => {

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
        setOtpInput(true);

    }

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        const {password, confirmPassword} = inputValues;

        // Check if any of the fields are empty
        if (!password || !confirmPassword) {
            setErrors({

                password: password ? "" : "Password is required",
                confirmPassword: confirmPassword ? "" : "Confirm Password is required",

            });
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
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setErrors({confirmPassword: "Passwords do not match"});
            return;
        }
        axios.post("http://localhost:3001/admin/resetPassword", {
            email: inputValues.email,
            newpassword: inputValues.password,

        }).then((res) => {
                console.log(res.data);
                axios
                    .post("http://localhost:3001/admin/signIn", inputValues)
                    .then((res) => {
                        localStorage.setItem("currUser", JSON.stringify(res.data));
                        console.log("User signed in successfully");
                        navigate("/home");

                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 404) {
                            setErrors({email: "Email does not exist. Please Sign Up to continue."})
                        } else if (err.response.status === 400) {
                            setErrors({password: "Incorrect Password"})
                        }
                    });
            }
        ).catch((err) => {
            console.log(err);

        });


    }


    return (
        <div className="sign-in-page">

            <div className="left-container">
                <div className="brand-logo-container">
                    <AppLogo/></div>

                {
                    !forgotPassword && !otpInput && !resetPassword ? (
                            <div className="inner-container">
                                <div className="header">Welcome to Form Generator</div>
                                <p>Don't have an account?
                                    <span onClick={() => {
                                        navigate('/signUp');
                                    }}>Create for free!
                                    </span>
                                </p>
                                <div className="options">

                                    <button type="button" className="login-with-google-btn">
                                        <img src={google_icon} alt="google icon"/>
                                        Sign in with Google
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
                                        <div style={{width: "100%"}}>
                                            <div className="password-input">

                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password"
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
                                        <button className="email-button"
                                                onClick={handleSignInSubmit}
                                        >
                                            <EmailIcon/>
                                            Sign in with Email
                                        </button>
                                    </div>

                                    <div className="forgot-password"
                                         onClick={() => {
                                             setForgotPassword(true)
                                         }}
                                    >
                                        Forgot Password?

                                    </div>

                                    <div className="terms-and-conditions">By signing in, you agree to our <a
                                        href="#">Terms</a> & <a
                                        href="#">Privacy Policy</a>.
                                    </div>
                                </div>
                            </div>)
                        : forgotPassword && !otpInput && !resetPassword ? (
                            <div className="inner-container">
                                <div className="header">Enter your email</div>
                                <p>
                                    We will send a verification code to your email address.</p>


                                <div className="options">

                                    <div className="email-option">

                                        <div style={{width: "100%"}}>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                name="email"
                                                required
                                                value={inputValues.email}
                                                onChange={handleOnChange}
                                            />
                                            {errors.email && <div className="error">{errors.email}</div>}

                                        </div>

                                        <button className="email-button"
                                                onClick={handleEmailSubmit}
                                        >
                                            <EmailIcon/>
                                            Send code
                                        </button>
                                    </div>


                                    <div className="terms-and-conditions">By signing in, you agree to our <a
                                        href="#">Terms</a> & <a
                                        href="#">Privacy Policy</a>.
                                    </div>
                                </div>
                            </div>

                        ) : otpInput && !resetPassword ? (
                            <div className="inner-container">
                                <div className="header">Check your email</div>
                                <p>Enter the 6-digit verification code we sent to
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
                                                value={inputValues.otp}
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
                        ) : resetPassword ? (
                            <div className="inner-container">
                                <div className="header">Reset Password</div>

                                <div className="options">

                                    <div className="email-option">


                                        <div style={{width: "100%"}}>
                                            <label htmlFor="password">New Password</label>

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
                                                onClick={handleResetPasswordSubmit}
                                        >

                                            Sign In
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

export default SignInPage;
