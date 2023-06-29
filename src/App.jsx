import React, {useState, useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import CreateForms from "./pages/CreateForms";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import "./stylesheets/index.css";
import {FormPage} from "./pages/FormPage";
import {HomePage} from "./pages/HomePage";
import UserContext from "./context/UserContext";
import ResponseSubmitted from "./pages/ResponseSubmitted";

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currUser"));
        setUser(storedUser);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Routes>
                {user ? (
                    <>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/create-form" element={<CreateForms/>}/>
                    </>
                ) : (
                    <Route path="/" element={<Navigate replace to="/signIn"/>}/>
                )}
                <Route path="/:id/:form_name" element={<FormPage/>}/>
                <Route path="/responseSubmitted" element={<ResponseSubmitted/>}/>
                {
                    !user ? (
                        <>
                            <Route exact path="/signIn" element={<SignIn/>}/>
                            <Route exact path="/signUp" element={<SignUp/>}/></>
                    ) : (
                        <Route path="*" element={<Navigate replace to="/"/>}/>

                    )
                }
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
