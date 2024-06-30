import { Avatar } from "@mui/material";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import "./Post.css";
const Post = ({ data }) => {
  const { title, content, username, name, profile } = data;
  //   console.log(title, content, username, name, profile);

  return (
    <div className="post_container">
      <div className="post_header">
        <Avatar src={profile}></Avatar>
        <div className="post_user_details">
          <h4>{name}</h4>
          <h5>@{username}</h5>
        </div>
        <VerifiedIcon className="verified_icon" />
      </div>
      <div>
        <p
          style={{ textAlign: "start", paddingLeft: "30px", fontSize: "20px" }}
        >
          {title}
        </p>
        <img src={content} width={"100%"} height={"800px"} alt="this is post" />
      </div>
      <div className="post_footer">
        <ChatBubbleOutlineIcon className="optionIcons" />
        <RepeatIcon className="optionIcons" />
        <FavoriteBorderIcon className="optionIcons" />
        <PublishIcon className="optionIcons" />
      </div>
    </div>
  );
};

export default Post;
