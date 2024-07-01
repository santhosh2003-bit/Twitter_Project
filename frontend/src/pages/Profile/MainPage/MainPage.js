import React, { useEffect, useState } from "react";
import "./MainPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import useHooks from "../../Hooks/useHooks";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
// import Post from "../../Feed/Post";
import { Avatar, Switch } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";

const MainPage = ({ user }) => {
  const [loggedUser] = useHooks();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const username = user.email.split("@")[0];

  const handleCoverImageUploading = (e, email) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=bb4204e97ced7db982cc64e2cbd65db8",
          formData
        )
        .then((data) => {
          if (data.data.data.url) {
            fetch("http://localhost:8080/api/posts/background", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                email: email,
                background: data.data.data.url,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                alert(data.message);
              });
          }
        });
    } else {
      console.log("No Image");
    }
  };

  const handleUploadProfileImage = (e, email) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=bb4204e97ced7db982cc64e2cbd65db8",
          formData
        )
        .then((data) => {
          if (data.data.data.url) {
            fetch("http://localhost:8080/api/posts/profile", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                email: email,
                profile: data.data.data.url,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                alert(data.message);
              });
          }
        });
    }
  };

  useEffect(() => {
    if (user.email) {
      fetch(`http://localhost:8080/api/posts/user/posts/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
        });
    }
  }, [user.email]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center space-x-4 p-4">
        <ArrowBackIcon
          style={{ fontSize: "50px" }}
          className="hover:cursor-pointer hover:bg-slate-400 rounded-full"
          onClick={() => navigate("/")}
        />
        <h4 className="text-gray-500">@{username}</h4>
        <div className="ml-auto">
          <Switch checked={darkMode} onChange={toggleTheme} />
        </div>
      </div>

      <div
        className="w-full h-screen overflow-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div>
          <div className="relative">
            <img
              src={
                loggedUser.background
                  ? loggedUser.background
                  : "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="cover"
              className="h-[200px] w-full object-cover"
            />
            <div className="absolute top-0 bg-black bg-opacity-60 w-full h-full opacity-0 flex justify-center items-center hover:opacity-100">
              <label htmlFor="image">
                <CenterFocusWeakIcon className="text-white hover:cursor-pointer" />
              </label>
              <input
                type="file"
                id="image"
                className="imageInput"
                onChange={(e) => handleCoverImageUploading(e, user.email)}
              />
            </div>
          </div>
          <div className="relative w-full rounded-full ">
            <div className="w-40 h-40 rounded-full border-4 border-green-700 overflow-hidden relative mt-[-80px] ml-5">
              <img
                src={
                  loggedUser.profile
                    ? loggedUser.profile
                    : "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 left-6 bg-black bg-opacity-60 w-[150px] h-[150px] opacity-0 flex items-center justify-center rounded-full hover:opacity-100">
              <label htmlFor="profileImage" className="imageIcon">
                <CenterFocusWeakIcon className="text-white" />
              </label>
              <input
                type="file"
                id="profileImage"
                className="imageInput"
                onChange={(e) => handleUploadProfileImage(e, user.email)}
              />
            </div>
            <div className="mt-3 flex flex-col sm:flex-row justify-between items-start">
              <div>
                <h3 className="text-gray-500">
                  {loggedUser.name ? loggedUser.name : user && user.name}
                </h3>
                <p className="text-black">@{username}</p>
              </div>
              <div className="ml-5 mt-3 sm:mt-0">
                {loggedUser.bio ? loggedUser.bio : " "}
                <div className="flex items-center gap-5 mt-3">
                  {loggedUser.location && (
                    <p className="subInfo">
                      <MyLocationIcon /> {loggedUser.location}
                    </p>
                  )}
                  {loggedUser.website && (
                    <p className="subInfo">
                      <AddLinkIcon /> {loggedUser.website}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-blue-700 w-1/2 sm:w-1/4 lg:w-1/6 h-1/5 pt-1 pb-1 pl-2 pr-2 text-skyblue cursor-pointer mr-3 rounded-lg">
                <h4 className="text-white">Tweets</h4>
              </div>
            </div>
            <div
              className="w-full h-[60vh] overflow-y-scroll mt-3"
              style={{ scrollbarWidth: "none" }}
            >
              {post.map((data, index) => {
                const { title, content, username, name } = data;
                return (
                  <div
                    key={index}
                    className={`w-full border ${
                      darkMode ? "border-gray-700" : "border-gray-400"
                    } mb-4`}
                  >
                    <div
                      className={`flex items-center gap-5 p-3 ${
                        darkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    >
                      <Avatar src={loggedUser.profile}></Avatar>
                      <div className="flex flex-col items-start">
                        <h4 className="mb-0">{name}</h4>
                        <h5 className="mb-0">@{username}</h5>
                      </div>
                      <VerifiedIcon className="text-blue-700" />
                    </div>
                    <div>
                      <p className="text-start pl-6 text-lg">{title}</p>
                      <img
                        src={content}
                        className="w-full max-h-80 object-cover"
                        alt="post"
                      />
                    </div>
                    <div className="flex justify-between p-3">
                      <ChatBubbleOutlineIcon
                        style={{ fontSize: "50px" }}
                        className="cursor-pointer p-3 active:transform active:scale-110 active:text-blue-600 active:bg-gray-300 active:rounded-full"
                      />
                      <RepeatIcon
                        style={{ fontSize: "50px" }}
                        className="cursor-pointer p-3 active:transform active:scale-110 active:text-blue-600 active:bg-gray-300 active:rounded-full"
                      />
                      <FavoriteBorderIcon
                        style={{ fontSize: "50px" }}
                        className="cursor-pointer p-3 active:transform active:scale-110 active:text-blue-600 active:bg-gray-300 active:rounded-full"
                      />
                      <PublishIcon
                        style={{ fontSize: "50px" }}
                        className="cursor-pointer p-3 active:transform active:scale-110 active:text-blue-600 active:bg-gray-300 active:rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
