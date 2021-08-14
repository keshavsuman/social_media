import React from "react";
import "../../static/styles/style.css";
import logo from "../../static/image/Younity Logo.png"

const ResetPassword = () => {
  return (
    <div className="bgBanner">
      <div className="centerBox">
        <div className="formWrapper">
          <div className="logo">
            <img src={logo} alt="logo" className="img-fluid" />
            <p>BE ONE OF US!</p>
          </div>
          <div className="heading">
            <h3>Reset Password</h3>
          </div>
          <form action="#">
            <div className="quesInputWrapper">
              <div className="fullWidthInputBox">
                <div className="inputFields">
                  <div className="inputBox fullInputBox">
                    <input
                      type="password"
                      name="New Password"
                      id="New Password"
                      required
                    />
                    <label>New Password</label>
                  </div>
                </div>
                <div className="inputFields">
                  <div className="inputBox fullInputBox">
                    <input
                      type="password"
                      name="Confirm Password"
                      id="Confirm Password"
                      required
                    />
                    <label>Confirm Password</label>
                  </div>
                </div>
              </div>
              <div className="nextBtnWrapper">
                <div className="nextBtn">
                  <input type="submit" value="Create" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
