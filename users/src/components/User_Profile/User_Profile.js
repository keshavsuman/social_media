import React, { useState } from "react";
// import "../../static/styles/bootstrap.min.css";
import "../../static/styles/user.css";
import photo from "../../static/image/photo.svg";
import video from "../../static/image/video.svg";
import content from "../../static/image/content.svg";
import certificates from "../../static/image/certificates.svg";
import skills from "../../static/image/skills.svg";
import heart from "../../static/image/heart.svg";
import saved from "../../static/image/saved.svg";
import ProfilePhotos from "./Photos/PhotosTab";
import UserCover from "../../shared/UserHeader/UserCover";
import UserVideo from "./Videos/VideoTab";
import ContentTab from "./Content/ContentTab";
import SkillsTab from "./Skills/SkillsTab";
import InterestsTab from "./Interests/InterestsTab";
import CertificateTab from "./Certificates/CertificateTab";
import SavedTab from "./Saved/SavedTab";
import Header from "../../shared/UserHeader/Header";

const UserProfile = () => {
  const [activeTab1photo, setactiveTab1photo] = useState(true);
  const [activeTab2Videos, setactiveTab2Videos] = useState(false);
  const [activeTab3Content, setactiveTab3Content] = useState(false);
  const [activeTab4Certificates, setactiveTab4Certificates] = useState(false);
  const [activeTab5Skills, setactiveTab5Skills] = useState(false);
  const [activeTab6Interests, setactiveTab6Interests] = useState(false);
  const [activeTab7Saved, setactiveTab7Saved] = useState(false);

  return (
    <div>
    <Header />
      <UserCover />
      <section className="profile-data" style={{overflowX:"hidden"}}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <ul className="nav nav-tabs row" id="myTab" role="tablist">
                <li
                  className="nav-item col"
                  onClick={() => {
                    setactiveTab1photo(true);
                    setactiveTab2Videos(false);
                    setactiveTab3Content(false);
                    setactiveTab4Certificates(false);
                    setactiveTab5Skills(false);
                    setactiveTab6Interests(false);
                    setactiveTab7Saved(false);
                  }}
                >
                  <a
                    className="nav-link active"
                    id="home"
                    data-toggle="tab"
                    href="#photos"
                  >
                    <i className="icon">
                      <img src={photo} />
                    </i>
                    <span>Photos (1008)</span>
                  </a>
                </li>
                <li
                  className="nav-item col"
                  onClick={() => {
                    setactiveTab1photo(false);
                    setactiveTab2Videos(true);
                    setactiveTab3Content(false);
                    setactiveTab4Certificates(false);
                    setactiveTab5Skills(false);
                    setactiveTab6Interests(false);
                    setactiveTab7Saved(false);
                  }}
                >
                  <a className="nav-link" data-toggle="tab" to="#videos">
                    <i className="icon">
                      <img src={video} />
                    </i>
                    <span>Videos</span>
                  </a>
                </li>
                <li
                  className="nav-item col"
                  onClick={() => {
                    setactiveTab1photo(false);
                    setactiveTab2Videos(false);
                    setactiveTab3Content(true);
                    setactiveTab4Certificates(false);
                    setactiveTab5Skills(false);
                    setactiveTab6Interests(false);
                    setactiveTab7Saved(false);
                  }}
                >
                  <a className="nav-link" data-toggle="tab" href="#content">
                    <i className="icon">
                      <img src={content} />
                    </i>
                    <span>Content</span>
                  </a>
                </li>
                <li
                  className="nav-item col"
                  onClick={() => {
                    setactiveTab1photo(false);
                    setactiveTab2Videos(false);
                    setactiveTab3Content(false);
                    setactiveTab4Certificates(true);
                    setactiveTab5Skills(false);
                    setactiveTab6Interests(false);
                    setactiveTab7Saved(false);
                  }}
                >
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Certificates"
                  >
                    <i className="icon">
                      <img src={certificates} />
                    </i>
                    <span>Certificates</span>
                  </a>
                </li>
                <li
                  className="nav-item col"
                  onClick={() => {
                    setactiveTab1photo(false);
                    setactiveTab2Videos(false);
                    setactiveTab3Content(false);
                    setactiveTab4Certificates(false);
                    setactiveTab5Skills(true);
                    setactiveTab6Interests(false);
                    setactiveTab7Saved(false);
                  }}
                >
                  <a className="nav-link" data-toggle="tab" href="#skills">
                    <i className="icon">
                      <img src={skills} />
                    </i>
                    <span>Skills</span>
                  </a>
                </li>
                <li
                  className="nav-item col"
                  onClick={() => {
                    setactiveTab1photo(false);
                    setactiveTab2Videos(false);
                    setactiveTab3Content(false);
                    setactiveTab4Certificates(false);
                    setactiveTab5Skills(false);
                    setactiveTab6Interests(true);
                    setactiveTab7Saved(false);
                  }}
                >
                  <a className="nav-link" data-toggle="tab" href="#interests">
                    <i className="icon">
                      <img src={heart} />
                    </i>
                    <span>Interests</span>
                  </a>
                </li>
                <li
                  className="nav-item col"
                  onClick={() => {
                    setactiveTab1photo(false);
                    setactiveTab2Videos(false);
                    setactiveTab3Content(false);
                    setactiveTab4Certificates(false);
                    setactiveTab5Skills(false);
                    setactiveTab6Interests(false);
                    setactiveTab7Saved(true);
                  }}
                >
                  <a className="nav-link" data-toggle="tab" href="#saved">
                    <i className="icon">
                      <img src={saved} />
                    </i>
                    <span>Saved</span>
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                {activeTab1photo ? <ProfilePhotos /> : ""}
                {activeTab2Videos ? <UserVideo /> : ""}
                {activeTab3Content ? <ContentTab /> : ""}
                {activeTab4Certificates ? <CertificateTab /> : ""}
                {activeTab5Skills ? <SkillsTab /> : ""}
                {activeTab6Interests ? <InterestsTab /> : ""}
                {activeTab7Saved ? <SavedTab /> : ""}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
