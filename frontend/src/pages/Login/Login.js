import React, { useState } from "react";
import twitterimage from "../../assets/twitterimage.avif";
import TwitterIcon from "@mui/icons-material/Twitter";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
import { GoogleButton } from "react-google-button";
import { Link } from "react-router-dom";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import "./Login.css";
// import Loading from "../Loading";
// import { Navigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [signInWithEmailAndPassword, user, loading, error] =
  //   useSignInWithEmailAndPassword(auth);
  // const [signInWithGoogle, googleuser, googleloading, googleerror] =
  //   useSignInWithGoogle(auth);

  // if (user) {
  //   console.log(user);
  //   return <Navigate to="/" />;
  // }
  // if (error) {
  //   console.log(error.message);
  // }
  // if (loading) {
  //   <Loading />;
  // }

  //   Sign in with Google

  // if (googleuser) {
  //   return <Navigate to="/" />;
  // }
  // if (googleerror) {
  //   console.log(googleerror.message);
  // }
  // if (googleloading) {
  //   <Loading />;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://twitter-project-1-zzal.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          alert(data.error);
        } else {
          // console.log(data);
          alert(data.message);
          console.log("Redirecting from login.js");
          window.location.href = "/verify-otp";
          // signInWithEmailAndPassword(email, password);
        }
      });
  };
  // const handleSignwithGoogle = () => {
  //   signInWithGoogle();
  // };
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={twitterimage} alt="imageElement" className="imageElement" />
      </div>
      <div className="form-box">
        <div className="form-container">
          <h2 className="heading">Happing Now</h2>
          <h3 className="heading1">Join Twitter today</h3>
          <TwitterIcon
            className="Twittericon"
            style={{ color: "skyblue", fontSize: "50px" }}
          />
          <form onSubmit={handleSubmit} className="form-element">
            <input
              type="email"
              placeholder="Email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn-signup">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
          <hr />
          <div className="google-button">
            <GoogleButton
              type="light"
              className="g-btn"
              // onClick={handleSignwithGoogle}
            />
          </div>
          <div style={{ marginTop: "10px", fontSize: "18px" }}>
            If you have not an account
            <Link
              style={{
                color: "sky-blue",
                textDecoration: "none",
                fontWeight: "600",
                marginLeft: "5px",
              }}
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
