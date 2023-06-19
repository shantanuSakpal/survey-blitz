import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import CreateForms from "./pages/CreateForms";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import "./stylesheets/index.css";
import {FormPage} from "./pages/FormPage";
import {HomePage} from "./pages/HomePage";
import UserContext from "./context/UserContext";

function App() {

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="page-container" id="page">
                            <HomePage/>
                        </div>
                    }
                />
                <Route
                    path="/create-form"
                    element={

                        <CreateForms/>

                    }
                />
                <Route
                    path="/view-form"
                    element={
                        <div className="form-page-container" id="page">
                            <FormPage/>
                        </div>
                    }
                />
                <Route exact path="/signIn" element={<SignIn/>}/>
                <Route exact path="/signUp" element={<SignUp/>}/>
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
