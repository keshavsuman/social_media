import React, { useState, useEffect } from "react";
import default_pic from "../../../static/image/default_pic.jpg";
import showToast from "../../../utils/toast/toast";
import CreatableSelect from "react-select/creatable";    
import uploadFile from "../../../services/s3.service/aws.file.service";
import {
  getCollegesList,
  getCoursesList,
  myProfile,
} from "../../../services/userservices/user.services";
import { setProfile } from "../../../services/userservices/user.services";
var profile_pic ;

let batchOptions = [];
let Colleges = [];
let Courses = [];
let genderOptions = [];

const initialValues = {
  first_name: "",
  lastName: "",
  college: "",
  batch: "",
  course: "",
  bio: "",
  email: "",
  phone_number: "",
  gender: "",
  profile_pic: "",
};

const GeneralInfo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(initialValues);
  const [collegeList, setCollegeList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  var {
    first_name,
    last_name,
    college,
    college_batch,
    course,
    bio,
    email,
    mobile,
    gender,
    profile_pic,
  } = user;

  useEffect(() => {
    const fetch = async () => {
      try {
        let data = await myProfile();
        data.data.user.college_batch = {
          label: data.data.user.college_batch,
          value: data.data.user.college_batch,
        };

        data.data.user.college = {
          label: data.data.user.college,
          value: data.data.user.college,
        };

        data.data.user.course = {
          label: data.data.user.course,
          value: data.data.user.course,
        };

        data.data.user.gender = {
          label:data.data.user.gender,
          value:data.data.user.gender
        }

        setUser(data.data.user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCollege = async () => {
      try {
        const data = await getCollegesList();
        setCollegeList(data.data.college);
        for (let index = 0; index < data.data.college.length; index++) {
          Colleges.push({
            label: data.college[index].name,
            value: data.college[index]._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCourses = async () => {
      try {
        const data = await getCoursesList();
        setCourseList(data.data.courses);
        for (let index = 0; index < data.data.courses.length; index++) {
          Courses.push({
            label: data.data.courses[index].name,
            value: data.data.courses[index]._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const batchAvailable = [
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
    ];

    for (let index = 0; index < batchAvailable.length; index++) {
      batchOptions.push({
        label: batchAvailable[index],
        value: batchAvailable[index],
      });
    }

    const gender = [
      "Male",
      "Female",
      "Other"
    ];

    for (let index = 0; index < gender.length; index++) {
      genderOptions.push({
        label: gender[index],
        value: gender[index],
      });
    }


    fetch();
    fetchCollege();
    fetchCourses();
  }, []);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleBatchChange = (newValue, actionMeta) => {
    setUser({
      ...user,
      college_batch: newValue,
    });
  };

  const handleGenderChange = (newValue, actionMeta) => {
    setUser({
      ...user,
      gender:newValue
    })
  }

  const handleCollegeChange = (newValue, actionMeta) => {
    setUser({
      ...user,
      college: newValue,
    });
  };

  const handleCourseChange = (newValue, actionMeta) => {
    setUser({
      ...user,
      course: newValue,
    });
  };

  const handleFileInput = (e) => {
    console.log("IN");
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };
  const editUserDetails = async (e) => {
    e.preventDefault();
     profile_pic = user.profile_pic;

    if (selectedFile != null) {
      console.log("comes here");
      profile_pic = await uploadFile(selectedFile);
      console.log(profile_pic, "#######");
    } else {
      console.log("yahoo");
      if (profile_pic ==null){
      profile_pic ="https://ryanacademy.ie/wp-content/uploads/2017/04/user-placeholder.png";
      }
      else{
        profile_pic=profile_pic
      }
    }
    const res = await setProfile({
      first_name,
      last_name,
      college: college.label,
      college_batch: college_batch.label,
      course: course.label,
      bio,
      email,
      mobile,
      gender:gender.label,
      profile_pic,
    });
    console.log(res);
    if (res.statusCode === 200) {
      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  };

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
                      <img
                        src={profile_pic != null ? profile_pic : default_pic}
                        alt="default user"
                      />
                    </i>
                    <a href title>
                      {first_name + " " + last_name}
                    </a>
                    <p className="chngdp">
                      Change Profile Photo
                      <input
                        type="file"
                        name=" profile_pic"
                        onChange={(e) => handleFileInput(e)}
                      />
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <form method="post">
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">First name</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <input
                    type="text"
                    name="first_name"
                    value={first_name}
                    className="rformcontrol"
                    onChange={(e) => onValueChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Last name</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <input
                    type="text"
                    name="last_name"
                    value={last_name}
                    className="rformcontrol"
                    onChange={(e) => onValueChange(e)}
                  />
                  <p className="help_para">
                    Help people discover your account by using the name you're
                    known by: either your full name, nickname, or business name.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">College</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <CreatableSelect
                    isClearable
                    id="edit___profile"
                    className="institute"
                    name="college"
                    value={college}
                    placeholder="Batch"
                    onChange={handleCollegeChange}
                    options={Colleges}
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Batch</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <CreatableSelect
                    isClearable
                    id="edit___profile"
                    className="institute"
                    name="college_batch"
                    value={college_batch}
                    placeholder="Batch"
                    onChange={handleBatchChange}
                    options={batchOptions}
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Course</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <CreatableSelect
                    isClearable
                    id="edit___profile"
                    className="institute"
                    name="course"
                    value={course}
                    placeholder="Course"
                    onChange={handleCourseChange}
                    options={Courses}
                  />

                  <p className="help_para">
                    Help people discover your account by using the name of
                    college, Course &amp; Batch.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Bio</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <textarea
                    className="rformcontrol"
                    value={bio}
                    name="bio"
                    onChange={(e) => onValueChange(e)}
                  />
                  <p className="help_para">
                    <b>Personal Information</b>Provide your personal
                    information, even if the account is used for a business, a
                    pet or something else. This won't be a part of your public
                    profile.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Email</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="rformcontrol"
                    onChange={(e) => onValueChange(e)}
                    disabled="disabled"
                    style={{color:"grey", border:"1px solid rgb(235, 235, 228)","background-color": "#f2f2f2" }}
                   />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Phone Number</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                  <input
                    type="number"
                    name="mobile"
                    value={mobile}
                    className="rformcontrol"
                    onChange={(e) => onValueChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-lg-3">
                  <label className="rlabel">Gender</label>
                </div>
                <div className="col-xs-12 col-lg-8">
                <CreatableSelect
                    isClearable
                    id="edit___profile"
                    className="institute"
                    name="gender"
                    value={gender}
                    placeholder="Gender"
                    onChange={handleGenderChange}
                    options={genderOptions}
                 isDisabled="true"  />
                </div>
                <div className="col-xs-12 col-lg-8 text-center">
                  <button
                    className="gsbutton"
                    onClick={(e) => editUserDetails(e)}
                  >
                    Save Info
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
