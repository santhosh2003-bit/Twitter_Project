import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../firebase.init";
import { Navigate } from "react-router-dom";
// import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  //   const [user, isLoading, error] = useAuthState(auth);
  //   if (isLoading) {
  //     return <Loading />;
  //   }
  //   if (error) {
  //     return <div>{error.message}</div>;
  //   }

  //   if (!user) {
  //     return <Navigate to="/login" />;
  //   }
  //   return children;
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
