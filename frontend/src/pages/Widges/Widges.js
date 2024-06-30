import React from "react";
import "./Widges.css";
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
const Widges = () => {
  return (
    <div className="widgets">
      <div className="widgets_input">
        <SearchIcon className="widgets_search" />
        <input type="text" placeholder="Search Twitter" />
      </div>
      <div className="widgets_wedgetContainer">
        <h2>What's Happening</h2>
      </div>

      <TwitterTweetEmbed tweetId={"933354946111705097"} />
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="saurabhnemade"
        options={{ height: 400 }}
      />
    </div>
  );
};

export default Widges;
