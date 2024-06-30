import React from "react";
import "./Profile.css";
import MainPage from "./MainPage/MainPage";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
const Profile = () => {
  // const [user] = useAuthState(auth);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="profile-page">
      <MainPage user={user} />
    </div>
  );
};

export default Profile;
