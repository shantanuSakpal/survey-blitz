import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateForms from "./pages/CreateForms";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import "./stylesheets/index.css";
import { FormPage } from "./pages/FormPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page-container" id="page">
            <HomePage />
          </div>
        }
      />
      <Route
        path="/create-form"
        element={
          <div className="page-container" id="page">
            <CreateForms />
          </div>
        }
      />
      <Route
        path="/view-form"
        element={
          <div className="page-container" id="page">
            <FormPage />
          </div>
        }
      />
      <Route exact path="/signIn" element={<SignIn />} />
      <Route exact path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
