import React from "react";
import "./SidebarOption.css";

const SidebarOption = ({ Icon, text }) => {
  return (
    <div className="sidebarOptions">
      {Icon && (
        <Icon className="sidebarOption__icon" style={{ fontSize: "50px" }} />
      )}
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOption;
