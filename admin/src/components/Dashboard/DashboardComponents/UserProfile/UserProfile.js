import React, { useState, useEffect } from "react";
import SideBarMenu from "../../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../../shared/Dashboard/DashboardHeader";
import UserDatatable from "../DataTables/UserDataTable";
import avatar from "../../../../static/images/users/avatar-3.jpg";
import * as RouterService from "../../../../services/router/index";
import avatar2 from "../../../../static/images/users/avatar-2.jpg";
import avatar3 from "../../../../static/images/users/avatar-4.jpg";
import { token, baseurl } from "../../../../services/config/config";
import { useParams, useLocation } from "react-router";
import {userProfile} from "../../../../services/userservices/user.admin.services"
import * as userService from "../../../../services/userservices/user";
const UserProfile = () => {
  const location = useLocation();
  var a = location.pathname.split("/");
  console.log(a[3]);
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastname] = useState("");
  const [locations, setlocations] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const[profile_pic,setProfilepic]=useState("");
  const[bio,setBio]=useState("");
  const[collegYear,setCollegeYear]=useState("");
  const[course,setCourse]=useState("");
  const[dob,setDob]=useState("");
  const[college, setCollege]=useState("");
  const[HomeTown,setHomeTown]=useState("");
  const[interests,setInterests]=useState([]);
  const[skills,setSkills]=useState([]);

  useEffect(() => {
    let urlData = RouterService.urlToSplitData(RouterService.getLocationData().pathname)
    console.log('urlData', urlData)
  
    const fetch = async () => {
      try {
        let result = await userService.getUser(urlData[3], token);
        console.log('result.data.user', result.data.user)
       setBio(result.data.user.bio)
       setProfilepic(result.data.user.profile_pic)
        setfirstName(result.data.user.first_name);
        setlastname(result.data.user.last_name);
        setlocations(result.data.user.state);
        setMobile(result.data.user.mobile);
        setEmail(result.data.user.email);
        setCollege(result.data.user.college)
        setCollegeYear(result.data.user.college_year)
        setCourse(result.data.user.course)
        setDob(result.data.user.dob)
        setHomeTown(result.data.user.home_town)
        setInterests(result.data.user.interests)
        setSkills(result.data.user.skills)
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="wrapper">
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h3>
            <span className="lab la-accusoft"></span> &nbsp;&nbsp;
            <span>Social Media</span>
          </h3>
        </div>
        <SideBarMenu />
      </div>
      <div className="main-content">
        <DashboardHeader />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h4
                    className="m-0 text-dark"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Profile
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-4 col-lg-5">
                <div className="card text-center">
                  <div className="card-body">
                    {console.log('profile_pic', profile_pic)}
                    <img 
                    width="200px"
                    height="200px"
                      src={profile_pic !=null ?profile_pic: avatar}
                      className="rounded-circle avatar-lg img-thumbnail img-fluid"
                      alt="profile-image"
                    />
                    <h4 className="mb-0 mt-2">{firstname + "  " + lastname}</h4>
                    <p className="text-muted font-14"></p>
                    <button
                      type="button"
                      className="btn btn-success btn-sm mb-2"
                    >
                      Follow
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mb-2"
                    >
                      Message
                    </button>
                    <div className="text-start mt-3">
                      <h4 className="font-13 text-uppercase">About Me :</h4>
                      <p className="text-muted font-13 mb-3">{
                        
                        bio !=null ?bio :"Bio"
                      }
                      </p>
                      <p className="text-muted mb-2 font-13">
                        <strong>Full Name :</strong>{" "}
                        <span className="ms-2">
                          {firstname + "  " + lastname}
                        </span>
                      </p>
                      <p className="text-muted mb-2 font-13">
                        <strong>Mobile :</strong>
                        <span className="ms-2">{mobile}</span>
                      </p>
                      <p className="text-muted mb-2 font-13">
                        <strong>Email :</strong>{" "}
                        <span className="ms-2 ">{email}</span>
                      </p>
                      <p className="text-muted mb-1 font-13">
                        <strong>Location :</strong>{" "}
                        <span className="ms-2">{locations}</span>
                      </p>
                    </div>
                    <ul className="social-list list-inline mt-3 mb-0">
                      <li className="list-inline-item">
                        <a
                          href="javascript: void(0);"
                          className="social-list-item border-primary text-primary"
                        >
                          <i className="mdi mdi-facebook" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="javascript: void(0);"
                          className="social-list-item border-danger text-danger"
                        >
                          <i className="mdi mdi-google" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="javascript: void(0);"
                          className="social-list-item border-info text-info"
                        >
                          <i className="mdi mdi-twitter" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="javascript: void(0);"
                          className="social-list-item border-secondary text-secondary"
                        >
                          <i className="mdi mdi-github" />
                        </a>
                      </li>
                    </ul>
                  </div>{" "}
                  {/* end card-body */}
                </div>{" "}
                {/* end card */}
              </div>{" "}
              {/* end col*/}
              <div className="col-xl-8 col-lg-7">
                <div className="card">
                  <div className="card-body">
                    <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                      <li className="nav-item">
                        <a
                          href="#aboutme"
                          data-bs-toggle="tab"
                          aria-expanded="false"
                          className="nav-link rounded-0"
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#timeline"
                          data-bs-toggle="tab"
                          aria-expanded="true"
                          className="nav-link rounded-0 active"
                        >
                          Timeline
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#settings"
                          data-bs-toggle="tab"
                          aria-expanded="false"
                          className="nav-link rounded-0"
                        >
                          Settings
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane" id="aboutme">
                        <h5 className="text-uppercase">
                          <i className="mdi mdi-briefcase me-1" />
                          Experience
                        </h5>
                        <div className="timeline-alt pb-0">
                          <div className="timeline-item">
                            <i className="mdi mdi-circle bg-info-lighten text-info timeline-icon" />
                            <div className="timeline-item-info">
                              <h5 className="mt-0 mb-1">
                                Lead designer / Developer
                              </h5>
                              <p className="font-14">
                                websitename.com{" "}
                                <span className="ms-2 font-12">
                                  Year: 2015 - 18
                                </span>
                              </p>
                              <p className="text-muted mt-2 mb-0 pb-3">
                                Everyone realizes why a new common language
                                would be desirable: one could refuse to pay
                                expensive translators. To achieve this, it would
                                be necessary to have uniform grammar,
                                pronunciation and more common words.
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* end timeline */}
                        <h5 className="mb-3 mt-4 text-uppercase">
                          <i className="mdi mdi-cards-variant me-1" />
                          Projects
                        </h5>
                        <div className="table-responsive">
                          <table className="table table-borderless table-nowrap mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>#</th>
                                <th>Clients</th>
                                <th>Project Name</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <img
                                    src={avatar2}
                                    alt="table-user"
                                    className="me-2 rounded-circle"
                                    height={24}
                                  />{" "}
                                  Halette Boivin
                                </td>
                                <td>App design and development</td>
                                <td>01/01/2015</td>
                                <td>10/15/2018</td>
                                <td>
                                  <span className="badge badge-info-lighten">
                                    Work in Progress
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>
                                  <img
                                    src={avatar3}
                                    alt="table-user"
                                    className="me-2 rounded-circle"
                                    height={24}
                                  />{" "}
                                  Durandana Jolicoeur
                                </td>
                                <td>Coffee detail page - Main Page</td>
                                <td>21/07/2016</td>
                                <td>12/05/2018</td>
                                <td>
                                  <span className="badge badge-danger-lighten">
                                    Pending
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>{" "}
                      {/* end tab-pane */}
                      {/* end about me section content */}
                      <div className="tab-pane show active" id="timeline">
                        {/* comment box */}
                        <div className="border rounded mt-2 mb-3">
                          <form action="#" className="comment-area-box">
                            <textarea
                              rows={3}
                              className="form-control border-0 resize-none"
                              placeholder="Write something...."
                              defaultValue={""}
                            />
                            <div className="p-2 bg-light d-flex justify-content-between align-items-center">
                              <div>
                                <a
                                  href="#"
                                  className="btn btn-sm px-2 font-16 btn-light"
                                >
                                  <i className="mdi mdi-account-circle" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-sm px-2 font-16 btn-light"
                                >
                                  <i className="mdi mdi-map-marker" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-sm px-2 font-16 btn-light"
                                >
                                  <i className="mdi mdi-camera" />
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-sm px-2 font-16 btn-light"
                                >
                                  <i className="mdi mdi-emoticon-outline" />
                                </a>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-sm btn-dark waves-effect"
                              >
                                Post
                              </button>
                            </div>
                          </form>
                        </div>{" "}
                        {/* end .border*/}
                        {/* end comment box */}
                        {/* Story Box*/}
                        <div className="border border-light rounded p-2 mb-3">
                          <div className="d-flex">
                            <img
                              className="me-2 rounded-circle"
                              src={avatar3}
                              alt="Generic placeholder image"
                              height={32}
                            />
                            <div>
                              <h5 className="m-0">Thelma Fridley</h5>
                              <p className="text-muted">
                                <small>about 1 hour ago</small>
                              </p>
                            </div>
                          </div>
                          <div className="font-16 text-center fst-italic text-dark">
                            <i className="mdi mdi-format-quote-open font-20" />{" "}
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Duis sagittis ipsum. Praesent mauris. Fusce
                            nec tellus sed augue semper porta. Mauris massa.
                          </div>
                          <div className="mx-n2 p-2 mt-3 bg-light">
                            <div className="d-flex">
                              <img
                                className="me-2 rounded-circle"
                                src={avatar2}
                                alt="Generic placeholder image"
                                height={32}
                              />
                              <div>
                                <h5 className="mt-0">
                                  Jeremy Tomlinson{" "}
                                  <small className="text-muted">
                                    3 hours ago
                                  </small>
                                </h5>
                                Nice work, makes me think of The Money Pit.
                                <br />
                                <a
                                  href="javascript: void(0);"
                                  className="text-muted font-13 d-inline-block mt-2"
                                >
                                  <i className="mdi mdi-reply" /> Reply
                                </a>
                                <div className="d-flex mt-3">
                                  <a className="pe-2" href="#">
                                    <img
                                      src={avatar}
                                      className="rounded-circle"
                                      alt="Generic placeholder image"
                                      height={32}
                                    />
                                  </a>
                                  <div>
                                    <h5 className="mt-0">
                                      Thelma Fridley{" "}
                                      <small className="text-muted">
                                        5 hours ago
                                      </small>
                                    </h5>
                                    i'm in the middle of a timelapse animation
                                    myself! (Very different though.) Awesome
                                    stuff.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <a
                              href="javascript: void(0);"
                              className="btn btn-sm btn-link text-danger"
                            >
                              <i className="mdi mdi-heart" /> Like (28)
                            </a>
                            <a
                              href="javascript: void(0);"
                              className="btn btn-sm btn-link text-muted"
                            >
                              <i className="mdi mdi-share-variant" /> Share
                            </a>
                          </div>
                        </div>
                        <div className="text-center">
                          <a href="javascript:void(0);" className="text-danger">
                            <i className="mdi mdi-spin mdi-loading me-1" /> Load
                            more{" "}
                          </a>
                        </div>
                      </div>
                      {/* end timeline content*/}
                      <div className="tab-pane" id="settings">
                        <form>
                          <h5 className="mb-4 text-uppercase">
                            <i className="mdi mdi-account-circle me-1" />{" "}
                            Personal Info
                          </h5>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="firstname"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstname"
                                  placeholder="Enter first name"
                                  value={firstname || ''}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="lastname"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastname"
                                  placeholder="Enter last name"
                                  value={lastname || ''}
                                />
                              </div>
                            </div>{" "}
                            {/* end col */}
                          </div>{" "}
                          {/* end row */}
                          <div className="row">
                            <div className="col-12">
                              <div className="mb-3">
                                <label htmlFor="userbio" className="form-label">
                                  Bio
                                </label>
                                <textarea
                                  className="form-control"
                                  id="userbio"
                                  rows={4}
                                  placeholder="Write something..."
                                  defaultValue={bio || ''}
                                />
                              </div>
                            </div>{" "}
                            {/* end col */}
                          </div>{" "}
                          {/* end row */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="useremail"
                                  className="form-label"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="useremail"
                                  placeholder="Enter email"
                                  value={email||''}
                                />
                                <span className="form-text text-muted">
                                  <small>
                                    If you want to change email please{" "}
                                    <a href="javascript: void(0);">click</a>{" "}
                                    here.
                                  </small>
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="userpassword"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="userpassword"
                                  placeholder="Enter password"
                                 
                                />
                                <span className="form-text text-muted">
                                  <small>
                                    If you want to change password please{" "}
                                    <a href="javascript: void(0);">click</a>{" "}
                                    here.
                                  </small>
                                </span>
                              </div>
                            </div>{" "}
                            {/* end col */}
                          </div>{" "}
                          {/* end row */}
                          <h5 className="mb-3 text-uppercase bg-light p-2">
                            <i className="mdi mdi-office-building me-1" />{" "}
                            Company Info
                          </h5>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="companyname"
                                  className="form-label"
                                >
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="companyname"
                                  placeholder="Enter company name"
                                  // value={compana}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="cwebsite"
                                  className="form-label"
                                >
                                  Website
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cwebsite"
                                  placeholder="Enter website url"
                                />
                              </div>
                            </div>{" "}
                            {/* end col */}
                          </div>{" "}
                          {/* end row */}
                          <h5 className="mb-3 text-uppercase bg-light p-2">
                            <i className="mdi mdi-earth me-1" /> Social
                          </h5>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="social-fb"
                                  className="form-label"
                                >
                                  Facebook
                                </label>
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-facebook" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="social-fb"
                                    placeholder="Url"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="social-tw"
                                  className="form-label"
                                >
                                  Twitter
                                </label>
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-twitter" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="social-tw"
                                    placeholder="Username"
                                  />
                                </div>
                              </div>
                            </div>{" "}
                            {/* end col */}
                          </div>{" "}
                          {/* end row */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="social-insta"
                                  className="form-label"
                                >
                                  Instagram
                                </label>
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-instagram" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="social-insta"
                                    placeholder="Url"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="social-lin"
                                  className="form-label"
                                >
                                  Linkedin
                                </label>
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-linkedin" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="social-lin"
                                    placeholder="Url"
                                  />
                                </div>
                              </div>
                            </div>{" "}
                            {/* end col */}
                          </div>{" "}
                          {/* end row */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="social-sky"
                                  className="form-label"
                                >
                                  Skype
                                </label>
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-skype" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="social-sky"
                                    placeholder="@username"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="social-gh"
                                  className="form-label"
                                >
                                  Github
                                </label>
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-github" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="social-gh"
                                    placeholder="Username"
                                  />
                                </div>
                              </div>
                            </div>{" "}
                            {/* end col */}
                          </div>{" "}
                          {/* end row */}
                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              <i className="mdi mdi-content-save" /> Save
                            </button>
                          </div>
                        </form>
                      </div>
                      {/* end settings content*/}
                    </div>{" "}
                    {/* end tab-content */}
                  </div>{" "}
                  {/* end card body */}
                </div>{" "}
                {/* end card */}
              </div>{" "}
              {/* end col */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
