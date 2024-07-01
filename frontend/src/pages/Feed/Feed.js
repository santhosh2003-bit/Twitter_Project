import React, { useEffect, useState } from "react";
import "../../page.css";
import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

import TweetBox from "./TweetBox";
import useHooks from "../Hooks/useHooks";
// import Post from "./Post";

const Feed = () => {
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);
  const [loggedUser] = useHooks();
  if (!token) {
    console.log("Redirecting at feed.js");
    window.location.href = "/login";
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/posts/gets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, [token]);

  return (
    <div className="border-r border-gray-400 w-full h-screen flex flex-col items-center">
      <h1 className="text-gray-400 text-center text-3xl">Home</h1>
      <TweetBox />
      <div
        className="w-full h-[60vh] overflow-y-scroll mt-3"
        style={{ scrollbarWidth: "none" }}
      >
        {post.map((data, index) => {
          const { title, content, username, name } = data;

          return (
            <div key={index} className={"w-full border  border-gray-400 mb-4"}>
              <div
                className={
                  "flex items-center gap-5 p-3 border  border-gray-300"
                }
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
  );
};

export default Feed;
