import React from "react";
import "./HeaderStyles.css";

function Logo({ children, ...restProps }) {
  return (
    <div>
      <a href="/" {...restProps}>
        {children}
        <img className="logo" href="/" src="./images/misc/Full Logo.png" alt="Zylo logo" />
      </a>
    </div>
  );
}

export default Logo;
