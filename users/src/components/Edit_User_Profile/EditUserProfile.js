import React, { useState } from "react";
import Header from "../../shared/UserHeader/Header";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import Skills from "./Skills/Skills";
import Interests from "./Interests/Interests";
import ChangePassword from "./ChangePassword/ChangePassword";
import PushNotifications from "./PushNotifications/PushNotifications";
import PrivacySecurity from "./PrivacySecurity/PrivacySecurity";
import "../../static/styles/user.css"

const EditUserProfile = () => {
  const [generalInfo, setGeneralInfo] = useState(true);
  const [skills, setSkills] = useState(false);
  const [interest, setInterest] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [privacyAndSecurity, setPrivacyAndSecurity] = useState(false);
  return (
    <div style={{ background: "#f3f8ff" }}>
      <Header />
      <section className="profile-edit">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="editbox">
                <div className="row">
                  <div className="col-xs-12 col-lg-3">
                    <ul className="leftprofile">
                      <li onClick={() => {
                        setGeneralInfo(true);
                        setSkills(false);
                        setInterest(false);
                        setChangePassword(false);
                        setPushNotification(false);
                        setPrivacyAndSecurity(false)
                      }}>
                        <a
                          className={generalInfo ? "active" :""}
                          href
                          title="General Info"
                        >
                          General Info
                        </a>
                      </li>
                      <li onClick={() => {
                        setGeneralInfo(false);
                        setSkills(true);
                        setInterest(false);
                        setChangePassword(false);
                        setPushNotification(false);
                        setPrivacyAndSecurity(false)
                      }}>
                        <a href className={skills ? "active" : ""} title="Skills">
                          Skills
                        </a>
                      </li>

                      <li onClick={() => {
                        setGeneralInfo(false);
                        setSkills(false);
                        setInterest(true);
                        setChangePassword(false);
                        setPushNotification(false);
                        setPrivacyAndSecurity(false)
                      }}>
                        <a href
                        className={interest ? "active" : ""}
                         title="Interest">
                          Interest
                        </a>
                      </li>

                      <li onClick={() => {
                        setGeneralInfo(false);
                        setSkills(false);
                        setInterest(false);
                        setChangePassword(true);
                        setPushNotification(false);
                        setPrivacyAndSecurity(false)
                      }}>
                        <a
                        className={changePassword ? "active" : null}
                          href
                          title="Change Password"
                        >
                          Change Password
                        </a>
                      </li>

                      <li onClick={() => {
                        setGeneralInfo(false);
                        setSkills(false);
                        setInterest(false);
                        setChangePassword(false);
                        setPushNotification(true);
                        setPrivacyAndSecurity(false)
                      }}>
                        <a
                        className={pushNotification ? "active" : null}
                          href
                          title="Push Notification"
                        >
                          Push Notification
                        </a>
                      </li>
                      <li onClick={() => {
                        setGeneralInfo(false);
                        setSkills(false);
                        setInterest(false);
                        setChangePassword(false);
                        setPushNotification(false);
                        setPrivacyAndSecurity(true)
                      }}>
                        <a href
                        className={privacyAndSecurity ? "active" : ""}
                         title="Privacy & Security">
                          Privacy &amp; Security
                        </a>
                      </li>
                    </ul>
                  </div>

                  {generalInfo ? <GeneralInfo /> : ""}
                  { skills ? <Skills /> : ""}
                  { interest ? <Interests /> : ""}
                  {changePassword ? <ChangePassword /> : ""}
                  {pushNotification ? <PushNotifications/> : ""}
                  {privacyAndSecurity ? <PrivacySecurity/> :""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditUserProfile;
