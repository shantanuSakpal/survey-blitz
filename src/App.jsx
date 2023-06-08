import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateForms from "./pages/create_forms";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import "./stylesheets/index.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page-container" id="page">
            <CreateForms />
          </div>
        }
      />
      <Route exact path="/signIn" element={<SignIn />} />
      <Route exact path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
