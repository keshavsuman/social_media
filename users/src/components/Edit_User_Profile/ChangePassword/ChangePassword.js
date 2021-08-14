import React from "react";
import default_pic from "../../../static/image/default_pic.jpg"


const ChangePassword = () => {
  return (
    <div className="col-xs-12 col-lg-9">
      <div className="rightprofile">
        <div className="row">
          <div className="col-sm-12">
            <div className="postbox">
              <div className="postheader">
                <ul>
                  <li>
                    <i className="posticon">
                      <img src={default_pic} alt="" />
                    </i>
                    <a href title>
                      Ronald Oliver
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <form>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Old Password</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <input
                    type="text"
                    name
                    value=""
                    className="rformcontrol"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">New Password</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <input
                    type="text"
                    name
                    value=""
                    className="rformcontrol"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel" style={{ paddingTop: 0 }}>
                    Confirm New Password
                  </label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <input
                    type="text"
                    name
                    value=""
                    className="rformcontrol"
                  />
                  <button className="gsbutton">Change password</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
