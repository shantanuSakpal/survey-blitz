import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ inputValues });
    axios
      .post("http://localhost:3001/admin/signIn", inputValues)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/signUp");
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
