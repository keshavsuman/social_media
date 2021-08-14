import React, { useState, useEffect } from "react";
import logo from "../../static/image/Younity Logo.png";
import edu_active from "../../static/image/edu active.svg";
import Skill from "../../static/image/skill.svg";
import skill_active from "../../static/image/skill actuve.svg";
import intraset from "../../static/image/intraset.svg";
import interest_active from "../../static/image/intreast active.svg";
import bar from "../../static/image/q1 bar.svg";
import bar2 from "../../static/image/q2 bar.svg";
import bar3 from "../../static/image/q3 bar.svg";
import search from "../../static/image/search.png";
import close from "../../static/image/close.png";
import dummyIntrest from "../../static/image/dummyInterest.png";
import showToast from "../../utils/toast/toast";
import { Link, useHistory } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';

import {
  getCoursesList,
  getCollegesList,
  getSkillsList,
  getInterestsList,
  setProfile,
} from "../../services/userservices/user.services";
let options = [];
let courseOptions = [];
// let yearOptions = [];
// let batchOptions = [];
let skipInterest = false;
let error_obj = []
let error_msg = '';
let error_count = 0;

const UserQuestions = () => {
  const [activeTab1, setactiveTab1] = useState(true);
  const [activeTab2, setactiveTab2] = useState(false);
  const [activeTab3, setactiveTab3] = useState(false);
  const [questionData, setQuestionData] = useState({
    college: "",
    course: "",
    course_start_date: null,
    course_end_date: null,
    skills: [],
    interests: [],
    bio: "",
  });

  const history = useHistory();

  const [courseList, setCourseList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);

  const [skillList, setskillList] = useState([]);
  const [originalSkillList, setoriginalSkillList] = useState([]);

  const [interestList, setInterestList] = useState([]);
  const [originalInterestList, setOriginalInterestList] = useState([]);

  const [disabled, setDisabled] = useState(true);

  const [SkipSkills, setSkipSkills] = useState(false);
  // const [SkipInterest, setSkipInterest] = useState(false);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const data = await getCollegesList();
        setCollegeList(data.data.college);
        for (let index = 0; index < data.data.college.length; index++) {
          options.push({
            label: data.data.college[index].name,
            value: data.data.college[index]._id,
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
          courseOptions.push({
            label: data.data.courses[index].name,
            value: data.data.courses[index]._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSkills = async () => {
      try {
        const data = await getSkillsList();
        setskillList(data.data.skills);
        setoriginalSkillList(data.data.skills);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchInterest = async () => {
      try {
        const data = await getInterestsList();
        setInterestList(data.data.interests);
        setOriginalInterestList(data.data.interests);
      } catch (error) {
        console.log(error);
      }
    };
    // const batchAvailable = [
    //   "9th",
    //   "10th",
    //   "11th",
    //   "12th",
    //   "1st year",
    //   "2nd year",
    //   "3rd year",
    //   "4th year",
    //   "5th year",
    // ];
    // const yearAvailable = [
    //   "2021",
    //   "2020",
    //   "2019",
    //   "2018",
    //   "2017",
    //   "2016",
    //   "2015",
    // ];
    // for (let index = 0; index < batchAvailable.length; index++) {
    //   yearOptions.push({
    //     label: batchAvailable[index],
    //     value: batchAvailable[index],
    //   });
    // }
    // for (let index = 0; index < yearAvailable.length; index++) {
    //   batchOptions.push({
    //     label: yearAvailable[index],
    //     value: yearAvailable[index],
    //   });
    // }

    fetchCollege();
    fetchCourses();
    fetchSkills();
    fetchInterest();
  }, []);

  const toggleSkillList = (event) => {
    event.preventDefault();
    if (skillList.length !== 0) {
      document.querySelector(".skillList").style.display = "block";
      document.querySelector(".tagWrapper").style.display = "none";
    }
  };
  const checkSkillExists = (skillName) => {
    for (let index = 0; index < questionData.skills.length; index++) {
      if (
        questionData.skills[index].skill_name
          .toLowerCase()
          .indexOf(skillName.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };
  const updateSkillArray = (skill, skill_id, skill_name) => {
    let newSkill = questionData.skills;
    let checkSkill = true;
    if (skill.__isNew__ !== undefined && skill.__isNew__ === true) {
      skill_name = skill_name
        .replace(/^Create +/i, "")
        .replace(/['"]+/g, "");
      checkSkill = false;
    }

    let check = false;
    for (let index = 0; index < questionData.skills.length; index++) {
      if (questionData.skills[index].skill_name === skill_name) {
        check = true;
        break;
      }
    }



    if (!checkSkill) {
      if (!check) {
        newSkill.push({
          __isNew__: true,
          skill_id,
          skill_name: skill_name,
        });
      }
    } else {
      if (!check) {
        newSkill.push({ skill_id, skill_name: skill_name });
      }
    }
    setQuestionData({ ...questionData, skills: newSkill });

    for (let index = 0; index < skillList.length; index++) {
      if (skillList[index]._id === skill_id) {
        skillList.splice(index, 1);
      }
    }
    document.querySelector(".skillList").style.display = "none";
    document.querySelector(".tagWrapper").style.display = "block";
  };

  const toggleInterestList = (event) => {
    event.preventDefault();
    if (interestList.length !== 0) {
      document.querySelector(".intrestWrapper").style.display = "block";
      document.querySelector(".tagWrapper").style.display = "none";
    }
  };

  const enableTab3 = (event) => {
    if(skillDetails()){
      setactiveTab1(false);
      setactiveTab2(false);
      setactiveTab3(true);
    }else{
      showToast(error_msg, 'error')
    }
  }

  const updateInterestArray = (
    interest,
    interest_id,
    interest_name,
    interest_photo
  ) => {
    let newInterest = questionData.interests;
    let checkInterest = true;
    if (interest.__isNew__ != undefined && interest.__isNew__ === true) {
      
      checkInterest = false; 
    }


    let check = false;
    for (let index = 0; index < questionData.interests.length; index++) {
      if (questionData.interests[index].interest_name === interest_name) {
        check = true;
        break;
      }
    }



    if (!checkInterest) {
      if (!check) {
        newInterest.push({
          __isNew__: interest.__isNew__,
          interest_id,
          interest_name,
          interest_photo,
        });
      }
    } else {
      if (!check) {
        newInterest.push({ interest_id, interest_name, interest_photo });
      }
    }




    setQuestionData({ ...questionData, interests: newInterest });


    for (let index = 0; index < interestList.length; index++) {
      if (interestList[index]._id === interest_id) {
        interestList.splice(index, 1);
      }
    }
    document.querySelector(".intrestWrapper").style.display = "none";
    document.querySelector(".tagWrapper").style.display = "block";
  };
  const removeSkillItem = (skill, skill_id, skill_name) => {
    let newSkill = skillList;
    if (!skill.__isNew__) {
      newSkill.unshift({ _id: skill_id, name: skill_name });
    }
    setskillList(newSkill);
    for (let index = 0; index < questionData.skills.length; index++) {
      debugger;
      if (questionData.skills[index].skill_id === skill_id) {
        var TempSkills = questionData.skills;
        TempSkills.splice(index, 1);
        setQuestionData({ ...questionData, skills: TempSkills });
      }
    }
  };


  const handleInterestSkip = (event) => {
    skipInterest = true;
    setQuestionData({ ...questionData, interests: [] })
    submitProfileData();
  };


  const navigateToSkills = (event) => {
    event.preventDefault();

    if (activeTab1 === true && educationDetails()) {
      setactiveTab1(false);
      setactiveTab2(true);
      setactiveTab3(false);
    } else {
      showToast(error_msg, "error");
    }
  }

  const navigateToInterests = (event) => {
    if (activeTab1 === true && educationDetails()) {
      setactiveTab1(false);
      setactiveTab2(false);
      setactiveTab3(true);
    }
    else if (activeTab2 === true && skillDetails()) {
      skipInterest = false;
      setactiveTab1(false);
      setactiveTab2(false);
      setactiveTab3(true);
    } else {
      showToast(error_msg, "error");
    }
  }


  const educationDetails = () => {
    error_msg = '';
    error_count = 0;
    error_obj = [];
    debugger
    if (questionData.college === '' || questionData.college === null) {
      error_obj.push("College is required");
      error_count++;
    }
    if (questionData.course === '' || questionData.course === null) {
      error_obj.push("Course is required");
      error_count++;
    }
    if (questionData.course_start_date === '' || questionData.course_start_date === null) {
      error_obj.push("Start Date is required");
      error_count++;
    }
    if (questionData.course_end_date === '' || questionData.course_end_date === null) {
      error_obj.push("End Date is required");
      error_count++;
    }
    if (questionData.bio === '' || questionData.bio === null) {
      error_obj.push("User bio is required");
      error_count++;
    }

    // if error_obj.indexof(College is required) != -1 ? 'errorBorder' :''

    if (error_count === 0) {
      return true;
    } else {
      error_msg = "Please fill Educational Details";
      return false;
    }

  }

  const handleSkipSkills = () => {
    let newSkill = skillList;
    for (let index = 0; index < questionData.skills.length; index++) {
      newSkill.unshift({ _id: questionData.skills[index].skill_id, name: questionData.skills[index].skill_name });

    }
    setskillList(newSkill);
    setQuestionData({ ...questionData, skills: [] })
    setSkipSkills(true);
    setactiveTab3(true);
  };

  const skillDetails = () => {
    error_count = 0;
    error_msg = "";
    error_obj = [];

    if (questionData.skills.length === 0) {
      error_obj.push("Skills are required");
      error_count++;
    }
    if (error_count >= 1) {
      error_msg = "Skills are required";
      return false;
    }
    if (error_count === 0) {
      return true;
    }
  };

  const interestDetails = () => {
    error_count = 0;
    debugger
    error_msg = "";
    error_obj = [];
    if (questionData.interests.length === 0) {
      error_obj.push("Interests are required");
      error_count++;
    }
    if (error_count >= 1) {
      error_msg = "Interests are required";
      return false;
    }
    if (error_count === 0) {
      return true;
    }
  }


  const handleChange = (newValue, actionMeta) => {
    if (newValue && newValue.length !== "") {
      setDisabled(false)
    } else {
      setDisabled(true);
    }
    setQuestionData({
      ...questionData,
      college: newValue,
    });
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  const handleCourseChange = (newValue, actionMeta) => {
    setQuestionData({
      ...questionData,
      course: newValue,
    });
  };

  const removeInterestItem = (interest_id, interest_name, interest_photo) => {
    let newInterest = interestList;
    newInterest.unshift({
      _id: interest_id,
      name: interest_name,
      photo: interest_photo,
    });
    // debugger
    setInterestList(newInterest);
    for (let index = 0; index < questionData.interests.length; index++) {
      if (questionData.interests[index].interest_id === interest_id) {
        var TempInterest = questionData.interests;
        TempInterest.splice(index, 1);
        setQuestionData({ ...questionData, interests: TempInterest });
      }
    }
  };

  const searchSkill = (event) => {
    event.preventDefault();
    let check = false;
    let filteredRes = originalSkillList.filter((element) => {
      if (element.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
        for (let index = 0; index < questionData.skills.length; index++) {
          if (questionData.skills[index].skill_name === element) {
            check = true;
            break;
          }
        }
        if (!check) {
          return element;
        }
      }
    });
    if (
      filteredRes.length === 0 &&
      event.target.value.length != 0 &&
      event.target.value != null &&
      event.target.value != undefined
    ) {
      filteredRes.push({
        __isNew__: true,
        _id: event.target.value,
        name: 'Create " ' + event.target.value + ' "',
      });
    }
    setskillList(filteredRes);
    if(filteredRes.length > 0){
      document.querySelector(".skillList").style.display = "block";
      document.querySelector(".tagWrapper").style.display = "none";
    }
  };

  const searchInterest = (event) => {
    event.preventDefault();
    let check = false;
    let filteredRes = originalInterestList.filter((element) => {
      if (element.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
        for (let index = 0; index < questionData.interests.length; index++) {
          if (questionData.interests[index].interest_name === element) {
            check = true;
            break;
          }
        }
        if (!check) {
          return element;
        }
      }
    });


    if (
      filteredRes.length === 0 &&
      event.target.value.length != 0 &&
      event.target.value != null &&
      event.target.value != undefined
    ) {
      filteredRes.push({
        __isNew__: true,
        _id: event.target.value,
        name: event.target.value,
        photo: dummyIntrest,
      });
    }
    setInterestList(filteredRes);

    if(filteredRes.length > 0){
      document.querySelector(".intrestWrapper").style.display = "block";
      document.querySelector(".tagWrapper").style.display = "none";
    }
  };

  const submitProfileData = async (event) => {
    if (event !== undefined) {
      event.preventDefault();
    }
    debugger
    if (!educationDetails()) {
      showToast("Education Details are required",'error');
      return;
    }

    if (!skipInterest) {
      if (!interestDetails()) {
        showToast("Interests are required",'error');
        return;
      }
    }
    if (!SkipSkills) {
      if (!skillDetails()) {
        showToast("Skills are required",'error');
        return;
      }
    }
    let newSkill = [],
      newInterest = [];
    if (!skipInterest) {
      for (let index = 0; index < questionData.interests.length; index++) {
        if (
          questionData.interests[index].__isNew__ !== undefined &&
          questionData.interests[index].__isNew__ === true
        ) {
          newInterest.push({ name: questionData.interests[index].interest_name });
          questionData.interests.splice(index, 1);
        }
      }
      questionData.newInterest = newInterest;
    }
    if (!SkipSkills) {
      for (let index = 0; index < questionData.skills.length; index++) {
        if (
          questionData.skills[index].__isNew__ !== undefined &&
          questionData.skills[index].__isNew__ === true
        ) {
          newSkill.push({ name: questionData.skills[index].skill_name });
          questionData.skills.splice(index, 1);
        }
      }
      questionData.newSkill = newSkill;
    }
    if (!(typeof questionData.college === "string")) {
      questionData.college = questionData.college.label;
    }
    if (!(typeof questionData.course === "string")) {
      questionData.course = questionData.course.label;
    }
    let filtered_skill_id = [], filtered_interest_id = [];
    if (!SkipSkills) {
      filtered_skill_id = questionData.skills.map((element) => {
        return element.skill_id;
      });
    }
    if (!skipInterest) {
      filtered_interest_id = questionData.interests.map((element) => {
        return element.interest_id;
      });
    }
    questionData.course_start_date = questionData.course_start_date.locale('es').format('YYYY/M/D');
    questionData.course_end_date = questionData.course_end_date.locale('es').format('YYYY/M/D');
    // setQuestionData({...questionData, skills:filtered_skill_id, interests:filtered_interest_id})
    const res = await setProfile(
      questionData,
      filtered_skill_id,
      filtered_interest_id
    );
    if (res.statusCode === 200) {
      showToast(res.message, "success");
      history.push("/userProfile");
    } else {
      showToast(res.message, "error");
    }
  };

  const handleStartDateChange = (data) => {
    setQuestionData({
      ...questionData,
      course_start_date: data,
    });
  };

  const handleEndDateChange = (data) => {
    setQuestionData({
      ...questionData,
      course_end_date: data,
    });
  }


  return (
    <div>
      <div className="bgBanner">
        {activeTab1 ? (
          <div className="centerBox">
            <div className="formWrapper">
              <div className="logo">
                <img src={logo} alt="logo" className="img-fluid" />
                <p>BE ONE OF US!</p>
              </div>
              <div className="quesWrapper">
                <div className="ques">
                  <div className="quesIcon">
                    <img
                      src={edu_active}
                      alt="Education"
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      setactiveTab1(true);
                      setactiveTab2(false);
                      setactiveTab3(false);
                    }}
                  >
                    <h6>Educational Details</h6>
                    <p>Add your college details here</p>
                  </div>
                </div>
                <div className="arrowSign">&gt;</div>
                <div
                  className="ques"
                  style={{ cursor: "pointer" }}
                  onClick={navigateToSkills}
                >
                  <div className="quesIcon">
                    <img src={Skill} alt="Education" className="img-fluid" />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                  >
                    <h6>Add Skills</h6>
                    <p>Add your Skills set here</p>
                  </div>
                </div>
                <div className="arrowSign">&gt;</div>
                <div className="ques" style={{ cursor: "pointer" }} onClick={navigateToInterests}>
                  <div className="quesIcon">
                    <img src={intraset} alt="Education" className="img-fluid" />
                  </div>
                  <div className="quesName">
                    <h6>Add Interest</h6>
                    <p>Add what is your interest here</p>
                  </div>
                </div>
              </div>
              <div className="bar">
                <img src={bar} alt="bar" className="img-fluid" />
              </div>
              <form>
                <div className="quesInputWrapper">
                  <div className="fullWidthInputBox ques1FullWidth">
                    <div className="inputFields">
                      <div className="inputBox fullInputBox">
                        <CreatableSelect
                          isClearable
                          value={questionData.college}
                          style={{ border: "none" }}
                          className="institute"
                          placeholder="Select College and school"
                          onChange={handleChange}
                          options={options}
                        />
                      </div>
                    </div>
                    <div className="inputFields">
                      <div className="inputBox fullInputBox">
                        <CreatableSelect
                          isClearable
                          value={questionData.course}
                          placeholder="Select course"
                          onChange={handleCourseChange}
                          options={courseOptions}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="inputWrapper">
                    <div className="inputFields">
                      <div className="inputBox" style={{ marginLeft: "3%" }}>
                        {/* <CreatableSelect
                          isClearable
                          className="w-100"
                          placeholder="Course Start Date"
                          onChange={handleYearChange}
                          options={yearOptions}
                        /> */}
                        <DatePicker
                          placeholder="Course Start Date"
                          timePicker={false}
                          showTodayButton={false}
                          isGregorian={true}
                          value={questionData.course_start_date}
                          onChange={handleStartDateChange} //only when value has changed
                        />
                      </div>
                      <div
                        className="inputBox "
                        style={{ marginLeft: "10px", marginRight: "20px" }}
                      >
                        {/* <CreatableSelect
                          isClearable
                          // className="w-80"
                          placeholder="Course End Date"
                          onChange={handleBatchChange}
                          options={batchOptions}
                        /> */}
                        <DatePicker
                          placeholder="Course End Date"
                          timePicker={false}
                          showTodayButton={false}
                          isGregorian={true}
                          value={questionData.course_end_date}
                          onChange={handleEndDateChange} //only when value has changed
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inputFields">
                    <div className="inputBox">
                      <input
                        type="text"
                        name="bio"
                        value={questionData.bio}
                        required
                        maxlength="250"
                        placeholder=" Bio"
                        onChange={(event) => {
                          setQuestionData({
                            ...questionData,
                            bio: event.target.value,
                          });
                        }}
                        style={{
                          width: "85%",
                          padding: "5px 5px",
                          marginRight: "-10px",
                        }}
                      />
                      {/* <label>&nbsp;&nbsp;Bio</label> */}
                    </div>
                  </div>
                  <div className="nextBtnWrapper">
                    <div className="nextBtn">
                      <input
                        type="submit"
                        value="Next"
                        // disabled={disabled}
                        onClick={navigateToSkills}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        {activeTab2 ? (
          <div className="centerBox">
            <div className="formWrapper">
              <div className="logo">
                <img src={logo} alt="logo" className="img-fluid" />
                <p>BE ONE OF US!</p>
              </div>
              <div className="quesWrapper">
                <div className="ques">
                  <div className="quesIcon">
                    <img
                      src={edu_active}
                      alt="Education"
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      setactiveTab1(true);
                      setactiveTab2(false);
                      setactiveTab3(false);
                    }}
                  >
                    <h6>Educational Details</h6>
                    <p>Add your college details here</p>
                  </div>
                </div>
                <div className="arrowSign">&gt;</div>
                <div className="ques">
                  <div className="quesIcon">
                    <img
                      src={skill_active}
                      alt="Education"
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      setSkipSkills(false);
                      setactiveTab1(false);
                      setactiveTab2(true);
                      setactiveTab3(false);
                    }}
                  >
                    <h6>Add Skills</h6>
                    <p>Add your Skills set here</p>
                  </div>
                </div>
                <div className="arrowSign">&gt;</div>
                <div className="ques">
                  <div className="quesIcon">
                    <img src={intraset} alt="Education" className="img-fluid" />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                    onClick={navigateToInterests}
                  >
                    <h6>Add Interest</h6>
                    <p>Add what is your interest here</p>
                  </div>
                </div>
              </div>
              <div className="bar">
                <img src={bar2} alt="bar" className="img-fluid" />
              </div>

              <div className="searchBox">
                <input
                  type="text"
                  placeholder="Search"
                  onClick={toggleSkillList}
                  onKeyUp={searchSkill}
                />
                <img src={search} alt="search" className="img-fluid" />
              </div>
              <div className="skillList">
                <ul>
                  {skillList.map((skill) => {
                    return (
                      <li
                        key={skill._id}
                        onClick={() => {
                          updateSkillArray(skill, skill._id, skill.name);
                        }}
                      >
                        {skill.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="tagWrapper">
                {questionData.skills.map((item) => {
                  return (
                    <div className="tag" key={item.skill_id + "123"}>
                      <p style={{ fontSize: "12px" }}>{item.skill_name}</p>
                      <img
                        src={close}
                        alt="close"
                        className="img-fluid"
                        onClick={() => {
                          removeSkillItem(
                            item,
                            item.skill_id,
                            item.skill_name
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="bottomBtn">
                <Link onClick={() => handleSkipSkills()}>SKIP</Link>
                <input
                  type="submit"
                  value="Next"
                  onClick={enableTab3}
                />
              </div>

            </div>
          </div>
        ) : (
          ""
        )}
        {activeTab3 ? (
          <div className="centerBox">
            <div className="formWrapper">
              <div className="logo">
                <img src={logo} alt="logo" className="img-fluid" />
                <p>BE ONE OF US!</p>
              </div>
              <div className="quesWrapper">
                <div className="ques">
                  <div className="quesIcon">
                    <img
                      src={edu_active}
                      alt="Education"
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      setactiveTab1(true);
                      setactiveTab2(false);
                      setactiveTab3(false);
                    }}
                  >
                    <h6>Educational Details</h6>
                    <p>Add your college details here</p>
                  </div>
                </div>
                <div className="arrowSign">&gt;</div>
                <div className="ques">
                  <div className="quesIcon">
                    <img
                      src={skill_active}
                      alt="Education"
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      setSkipSkills(false);
                      setactiveTab1(false);
                      setactiveTab2(true);
                      setactiveTab3(false);
                    }}
                  >
                    <h6>Add Skills</h6>
                    <p>Add your Skills set here</p>
                  </div>
                </div>
                <div className="arrowSign">&gt;</div>
                <div className="ques">
                  <div className="quesIcon">
                    <img
                      src={interest_active}
                      alt="Education"
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className="quesName"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      skipInterest = false;
                      setactiveTab1(false);
                      setactiveTab2(false);
                      setactiveTab3(true);
                    }}
                  >
                    <h6>Add Interest</h6>
                    <p>Add what is your interest here</p>
                  </div>
                </div>
              </div>
              <div className="bar">
                <img src={bar3} alt="bar" className="img-fluid" />
              </div>
              <form onSubmit={submitProfileData}>
                <div className="searchBox">
                  <input
                    type="text"
                    placeholder="Search"
                    onClick={toggleInterestList}
                    onKeyUp={searchInterest}
                  />
                  <img src={search} alt="search" className="img-fluid" />
                </div>
                <div className="intrestWrapper">
                  <div className="tvShow">
                    {interestList.map((interest) => {
                      return (
                        <div className="showWrapper" key={interest._id}>
                          <div className="showImg">
                            <img
                              src={interest.photo}
                              alt="Show"
                              className="img-fluid"
                            />
                          </div>
                          <div className="shownameWrapper">
                            <div className="shownName">
                              <p>{interest.name}</p>
                            </div>
                            <div
                              className="addBtn"
                              onClick={() =>
                                updateInterestArray(
                                  interest,
                                  interest._id,
                                  interest.name,
                                  interest.photo
                                )
                              }
                            >
                              <p>
                                Add <span>+</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="tagWrapper">
                  {questionData.interests.map((item) => {
                    return (
                      <div className="tag" key={item.interest_id + "123"}>
                        <div className="showWrapper">
                          <div className="showImg">
                            <img
                              src={item.interest_photo}
                              alt="Show"
                              className="img-fluid"
                            />
                          </div>
                          <div className="shownameWrapper">
                            <div className="shownName">
                              <p>{item.interest_name}</p>
                              {/* <p>2018</p> */}
                            </div>
                            <div
                              className="addBtn"
                              onClick={() => {
                                removeInterestItem(
                                  item.interest_id,
                                  item.interest_name,
                                  item.interest_photo
                                );
                              }}
                            >
                              <p>X</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bottomBtn">
                  <Link onClick={(event) => {
                    handleInterestSkip(event);
                  }}>SKIP & SUBMIT</Link>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserQuestions;
