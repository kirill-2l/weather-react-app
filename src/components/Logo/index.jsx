import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="sidebar__logo logo">
      <Link to="/">
        <span className="logo__first-letter">W</span>
        <span className="logo__first-txt">heatherApp</span>
      </Link>
    </div>
  );
};

export default Logo;
