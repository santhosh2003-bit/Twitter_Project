import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomeLinks = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: match ? "aqua" : "black" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export default CustomeLinks;
