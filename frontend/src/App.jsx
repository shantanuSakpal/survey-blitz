import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CreateForms from "./pages/CreateForms";
import { FormPage } from "./pages/FormPage";
import { HomePage } from "./pages/HomePage";
import UserContext from "./context/UserContext";
import ResponseSubmitted from "./pages/ResponseSubmitted";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/Loading";
import SignInPage from "./pages/Sign_in";
import SignUpPage from "./pages/Sign_Up";
import ErrorPage from "./pages/ErrorPage";
import ErrorMobile from "./components/modals/ErrorMobile";
import Billing from "./pages/Billing";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userIsDesktop, setUserIsDesktop] = useState(true);
  useEffect(() => {
    window.innerWidth > 768 ? setUserIsDesktop(true) : setUserIsDesktop(false);
  }, [window.innerWidth]);
  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    setUser(currUser);
    setIsLoading(false);
  }, [setUser, setIsLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {userIsDesktop ? (
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/form/:id"
              element={
                <ProtectedRoute>
                  <CreateForms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics/:id"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billings"
              element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              }
            />

            <Route path="/:id/:form_name" element={<FormPage />} />
            <Route path="/responseSubmitted" element={<ResponseSubmitted />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </UserContext.Provider>
      ) : (
        <ErrorMobile />
      )}
    </>
  );
}

export default App;
