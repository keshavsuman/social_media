import React, {useEffect,useState} from "react";

import info from "../../static/image/info.svg";
import user_pic from "../../static/image/user_pic.jpg";
import home from "../../static/image/home.svg";
import user from "../../static/image/user.svg";
import message from "../../static/image/message.svg";
import notification from "../../static/image/notification.svg";
import logo from "../../static/image/logo.png";
import { getUserData } from "../../utils/Auth/token_utils";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
  getCollegesList,
  getCoursesList,
  myProfile,
} from "../../services/userservices/user.services";


const Header = (props) => {
 
  const [profile_photos, setProfile] = useState("")
  const history = useHistory();

  useEffect(() => {
  const fetch = async() => {
      try{
          const data = await myProfile();
        
          setProfile(data.data.user.profile_pic)
      } catch(error) {
          console.log(error);
      }
  }
  fetch();
  })


  const logoutUser = (event) => {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-2">
            <Link to="/userProfile" title="Younity Logo">
              <img src={logo} />
            </Link>
          </div>
          <div className="col-xs-12 col-lg-3">
            <div className="searchbox">
              <i className="fas fa-search gsearch" />
              <input type="search" name placeholder="Search" />
            </div>
          </div>
          <div className="col-xs-12 col-lg-4">
            <ul className="menu">
              <li>
                <a href>
                  <i className="icon">
                    <img src={home} />
                  </i>
                </a>
              </li>
              <li>
                <a href>
                  <i className="icon">
                    <img src={user} />
                  </i>
                  {/* <span>2</span> */}
                </a>
              </li>
              <li>
                <a href>
                  <i className="icon">
                    <img src={message} />
                  </i>
                  {/* <span>6</span> */}
                </a>
              </li>
              <li>
                <a href>
                  <i className="icon">
                    <img src={notification} />
                  </i>
                  {/* <span>2</span> */}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-lg-3 text-right">
            <ul className="loginmenu">
              <li>
                <a href>
                  <i className="icon">
                    <img src={info} />
                  </i>
                </a>
              </li>
              <li>
                <div className="dropdown">
                  <a
                    className="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    href
                  >
                    <i className="pro_icon">
                      <img src={profile_photos !=null ?profile_photos :user_pic} />
                    </i>{" "}
                    {/* <span>{props.name}</span> */}
                    <span>{getUserData()?getUserData().name:""}</span>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link to="/userProfile" title="userProfile" className="dropdown-item" >
                      User Profile
                    </Link>
                    <a className="dropdown-item" onClick={logoutUser} style={{cursor:"pointer"}}>
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
