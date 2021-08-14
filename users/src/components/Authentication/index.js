import React from "react";
import "../../static/styles/style.css";
import { Link } from "react-router-dom"

const IndexPage = () => {
  return (
    <div>
      <div className="bgBanner">
        <div className="content">
          <h1>WELCOME TO YOUNITY</h1>
          <div className="btn">
            <Link to="/login">
            LOGIN
            </Link>
            <Link to="/signup">
            SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
