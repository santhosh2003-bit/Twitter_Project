import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import "./TweetBox.css";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
import useHooks from "../Hooks/useHooks";

const TweetBox = () => {
  // const [user] = useAuthState(auth);
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [profile, setProfile] = useState("");
  // console.log(user.email);
  // const gmail = user.email;
  // console.log(user.providerData[0].providerId==='password');
  const token = localStorage.getItem("token");
  const gmail = JSON.parse(localStorage.getItem("user")).email;
  // const Uname = JSON.parse(localStorage.getItem("user")).name;
  //set Profile
  const [loggedUser] = useHooks();
  // console.log(loggedUser);
  const userProfileImage = loggedUser.profileImage
    ? loggedUser.profileImage
    : "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleTweet = (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Redireting in TweetBox");
      window.location.href = "/login";
    }
    // if (user.providerData[0].providerId === "password") {
    fetch(`http://localhost:8080/api/posts/user/posts?email=${gmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEmail(data.email);
        setName(data.name);
        setUsername(data.email.split("@")[0]);
      });
    // } else {
    //   setEmail(email);
    //   setName(Uname);
    //   setUsername(email.split("@")[0]);
    // }
    if (!post || !imageUrl) {
      return alert("Please Add All Fields");
    }
    if (name) {
      fetch("http://localhost:8080/api/posts/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: post,
          content: imageUrl,
          username: username,
          name: name,
          email: email,
          profile: userProfileImage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          } else {
            alert(data.error);
          }
        });
    }
  };

  // Handle the image Uploading for the URL
  const handleImageUploading = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
      //let create a api to Upload the image
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=bb4204e97ced7db982cc64e2cbd65db8",
          formData
        )
        .then((res) => {
          setImageUrl(res.data.data.display_url);
        });
    }
  };

  return (
    <div className="border border-gray-500 shadow-2xl w-full">
      <form className="w-full" onSubmit={handleTweet}>
        <div className="flex items-center p-5 mb-0 w-full">
          <Avatar src={loggedUser.profile}></Avatar>
          <input
            type="text"
            className="bg-white w-[90%] box-sizing text-start ml-3 border-none outline-none"
            placeholder="What's Happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center pt-5 pb-5 pl-0 pr-0">
          <label htmlFor="image" className="imageIcon">
            <AddPhotoAlternateIcon
              className="p-3 hover:bg-gray-300 hover:rounded-full"
              style={{ color: "aqua", cursor: "pointer", fontSize: "50px" }}
            />
          </label>
          <input
            type="file"
            id="image"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1] bg-white"
            onChange={handleImageUploading}
          />
          <Button
            variant="outlined"
            className="pt-3 pb-3 pl-5 pr-5 rounded-full"
            style={{
              backgroundColor: "rgba(10%,11%,60%,1)",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
            }}
            type="submit"
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
