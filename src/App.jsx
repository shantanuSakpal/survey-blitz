import React, {useState, useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import CreateForms from "./pages/CreateForms";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import "./stylesheets/index.css";
import {FormPage} from "./pages/FormPage";
import {HomePage} from "./pages/HomePage";
import UserContext from "./context/UserContext";
import ResponseSubmitted from "./pages/ResponseSubmitted";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/Loading";

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currUser"));
        setUser(storedUser);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <UserContext.Provider value={{user, setUser}}>

            <Routes>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>

                <Route
                    path="/"
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
