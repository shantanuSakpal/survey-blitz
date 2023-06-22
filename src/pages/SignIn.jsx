import React, {useContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";


function SignIn() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({inputValues});
        axios
            .post('http://localhost:3001/admin/signIn', inputValues)
            .then((res) => {
                console.log("user data", res.data);
                setUser(res.data); // Set the user information in the context
                navigate('/');
                //set user info in local storage
                localStorage.setItem('currUser', JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log(err);
                navigate('/signUp');
            });
    };

    return (
        <>
            <div className="header">
                <h1>Signin</h1>
            </div>
            <div className="userInput">
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={handleOnChange}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    onChange={handleOnChange}
                />
            </div>
            <div className="submitButton">
                <button onClick={handleSubmit}>sign in</button>
            </div>
        </>
    );
}

export default SignIn;
