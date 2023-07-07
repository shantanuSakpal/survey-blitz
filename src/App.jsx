import React, {useState, useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import CreateForms from "./pages/CreateForms";
import "./stylesheets/index.css";
import {FormPage} from "./pages/FormPage";
import {HomePage} from "./pages/HomePage";
import UserContext from "./context/UserContext";
import ResponseSubmitted from "./pages/ResponseSubmitted";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/Loading";
import SignInPage from "./pages/Sign_in";
import SignUpPage from "./pages/Sign_Up";
import axios from "axios";

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currUser = JSON.parse(localStorage.getItem("currUser"));
        console.log(currUser)
        //get the user data from backend using currUser.id
        //
        // if (currUser) {
        //
        //     const reqBody = {
        //         id: currUser.result._id,
        //         token: currUser.token,
        //     };
        //     axios.post(
        //         "http://localhost:3001/admin/getUserData",
        //         reqBody
        //     ).then((response) => {
        //
        //         setUser(response.data);
        //
        //     }).catch((error) => {
        //         console.error("Error:", error);
        //     });
        //
        // }
        //
        // if (user)
        //     setIsLoading(false);
        setUser(currUser);
        setIsLoading(false);


    }, [setUser, setIsLoading]);


    if (isLoading) {
        return <Loading/>;
    }

    return (

        <UserContext.Provider value={{user, setUser}}>

            <Routes>
                <Route path="/signIn" element={<SignInPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-form"
                    element={
                        <ProtectedRoute>
                            <CreateForms/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/analytics/:id"
                    element={
                        <ProtectedRoute>
                            <AnalyticsPage/>
                        </ProtectedRoute>
                    }
                />

                <Route path="/:id/:form_name" element={<FormPage/>}/>
                <Route path="/responseSubmitted" element={<ResponseSubmitted/>}/>
                <Route path="*" element={<Navigate to="/signIn"/>}/>

            </Routes>

        </UserContext.Provider>

    );
}

export default App;
