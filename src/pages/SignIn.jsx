import React, {useContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SignIn() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showPassword, setShowPassword] = useState(false);


    const [inputValues, setInputValues] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
        setErrors({...errors, [name]: ""});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({inputValues});

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
        <div className="sign-in-page">
            <form id="container">
                <h3 id="Heading">Sign In</h3>
                <span>
          Don't have an account? <br/> <a href="/signUp">Create for free !</a>
        </span>

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

                <button type="submit" onClick={handleSubmit}>
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default SignIn;
