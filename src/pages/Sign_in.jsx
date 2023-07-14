import React, {useEffect, useState} from 'react';
import OnboardingImg from '../images/onboardingimage.png';
import google_icon from "../images/google-icon.png";
import EmailIcon from "@mui/icons-material/Email";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AppLogo from "../components/brand_logo/AppLogo";
import {CircularProgress} from "@mui/material";

const SignInPage = () => {
    const navigate = useNavigate();
    // const {user, setUser} = useContext(UserContext);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [forgotPassword, setForgotPassword] = useState(false);
    const [otpInput, setOtpInput] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resendOtpDisabled, setResendOtpDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30); // 30 seconds
    const [loading, setLoading] = useState(false)
    const [serverOtp, setServerOtp] = useState("89982745620")

    useEffect(() => {
        // Start the countdown when the component mounts
        let timer = null;

        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else {
            setResendOtpDisabled(false);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [countdown]);


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

        if (name === "otp" && value.length > 6) {
            // If the length of the OTP is more than 6, truncate it to 6 characters
            setInputValues({...inputValues, [name]: value.substring(0, 6)});

        } else {
            setInputValues({...inputValues, [name]: value});
            setErrors({...errors, [name]: ""});
        }
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
                    setErrors({email: "Email does not exist. Please create a new account."})
                } else if (err.response.status === 400) {
                    setErrors({password: "Incorrect Password"})
                }
            });
    };


    const handleOtpSubmit = async () => {
//check if otp contains 6 characters

        const otp = (inputValues.otp);
        if (otp.length !== 4) {
            setErrors({otp: 'OTP must contain 4 characters'});
            return;
        }


        if (Number(otp) === serverOtp) {
            setResetPassword(true);
        } else {
            setErrors({otp: "Invalid OTP"});
        }
    };

    const handleResendOtp = async () => {
        const email = inputValues.email;

        // Reset the countdown and disable the "Resend OTP" button for 30 seconds
        try {
            setResendOtpDisabled(true);
            setLoading(true);
            // Send API request to verify the entered OTP
            const response = await axios.post('http://localhost:3001/admin/sendOTP', {email});
            // Handle success and set the setOtpInput status
            if (response.status === 200) {
                setLoading(false)
                setCountdown(30);
                setServerOtp(response.data.otp)
            }


        } catch (error) {
            setLoading(false)
            // Handle error and show message to the user
            console.log(error)
            //set error message
            setErrors({otp: "Something went wrong, please try again."})
        }


    };

    const handleEmailSubmit = async (e) => {
        //clear otp error
        setErrors({otp: ""});
        //clear otp input
        setInputValues({...inputValues, otp: ""});

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


        // Reset the countdown and disable the "Resend OTP" button for 30 seconds
        try {
            setResendOtpDisabled(true);
            setLoading(true);
            // Send API request to verify the entered OTP
            const response = await axios.post('http://localhost:3001/admin/sendOTP', {email});
            // Handle success and set the setOtpInput status
            if (response.status === 200) {
                setLoading(false)
                setCountdown(30);
                setOtpInput(true);
                setServerOtp(response.data.otp)


            }

        } catch (error) {
            setLoading(false)
            // Handle error and show message to the user
            console.log(error)
            //set error message
            setErrors({email: "Something went wrong, please try again."})
        }


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
                                                        <VisibilityOutlinedIcon onClick={togglePasswordVisibility}/>
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon onClick={togglePasswordVisibility}/>
                                                    )}
                                                </div>
                                            </div>
                                            {errors.password && <div className="error">{errors.password}</div>}
                                        </div>
                                        <button className="email-button"
                                                onClick={handleSignInSubmit}
                                        >
                                            <EmailIcon/>
                                            Sign in
                                        </button>
                                    </div>

                                    <div className="forgot-password"
                                         onClick={() => {
                                             setForgotPassword(true)
                                         }}
                                    >
                                        Forgot Password?

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

                                        <button className={`email-button ${loading ? "loading" : ""}`}
                                                onClick={() => {
                                                    if (!loading) {

                                                        handleEmailSubmit();
                                                    }
                                                }}

                                        >
                                            {
                                                loading ? (
                                                        <CircularProgress
                                                            size={25}
                                                            sx={{color: "aliceblue"}}/>
                                                    )
                                                    : (
                                                        <>
                                                            <EmailIcon/>
                                                            Send code
                                                        </>
                                                    )
                                            }
                                        </button>
                                    </div>


                                </div>
                            </div>

                        ) : otpInput && !resetPassword ? (
                            <div className="inner-container">
                                <div className="header">Check your email</div>
                                <p>Enter the 6-digit verification code sent to
                                    <span>{inputValues.email}</span>

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
                                        <button className={`email-button ${loading ? "loading" : ""}`}
                                                onClick={() => {
                                                    if (!loading) {
                                                        handleOtpSubmit();
                                                    }
                                                }}
                                        >

                                            {
                                                loading ? (
                                                        <CircularProgress
                                                            size={25}
                                                            sx={{color: "aliceblue"}}/>
                                                    )
                                                    : (
                                                        <>
                                                            Verify OTP
                                                        </>
                                                    )
                                            }
                                        </button>
                                    </div>
                                    <div className="forgot-password" onClick={() => {
                                        setOtpInput(false)
                                    }}>
                                        Change email address

                                    </div>
                                    <div className={` forgot-password ${resendOtpDisabled ? "disabledLink" : ""}`}
                                    >
                                        {resendOtpDisabled ? (
                                            <span>Resend OTP (0:{countdown})</span>

                                        ) : (
                                            <span onClick={handleResendOtp}>Resend OTP</span>
                                        )}

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
                                                        <VisibilityOutlinedIcon onClick={togglePasswordVisibility}/>
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon onClick={togglePasswordVisibility}/>
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
                                                        <VisibilityOutlinedIcon onClick={toggleConfirmPasswordVisibility}/>
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon
                                                            onClick={toggleConfirmPasswordVisibility}/>
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


                                </div>
                            </div>
                        ) : null
                }


            </div>


            <div className="right-container">
                <img src={OnboardingImg} alt="Onbarding Image"/>
                <div className="terms-and-conditions">By signing in, you agree to our <a
                    href="#">Terms</a> & <a
                    href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
