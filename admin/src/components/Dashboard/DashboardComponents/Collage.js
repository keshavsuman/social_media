import React, { useState } from "react";
import CollegeDataTable from "./DataTables/collegeDataTable";
import { ToastContainer } from "react-toastify";
import showToast from "../../../utils/toast/toast";
import $ from "jquery";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import "../../../App.css";
import {
  createCollege,
  getUniversitiesList,
  getCoursesList
} from "../../../services/userservices/user.admin.services"
import Select from "react-select";
import makeAnimated from "react-select/animated";
var course_id=[];


var options = [];
const Collage = () => {
  const animatedComponents = makeAnimated();
  const [selectedCollege, setSelectedCollege] = useState("");
  const [college, setCollege] = useState("");
  const [universityList, setUniversityList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  var [courseList] = useState([]);

  async function courseLists() {
    options=[]
    try {
      var access = localStorage.getItem("access_token");
      const data = await getCoursesList(access);
      console.log(data);

      courseList = data.data.courses;

      for (var i = 0; i < courseList.length; ++i) {
        options.push({ value: courseList[i]._id, label: courseList[i].name });
      }
      // setUniversityList(data.data.universities);
      return data.data.courses;
    } catch (error) {
      console.log(error);
    }
  }

  const universitiesList = async () => {
    try {
      courseLists();
      setUniversityList([]);
      setCollege("")
      var access = localStorage.getItem("access_token");
      const data = await getUniversitiesList(access);
    
      setUniversityList(data.data.universities);
     
      return data.data.universities;
    } catch (error) {
      console.log(error);
    }
  };

  const saveCollage = async () => {

    var course_array=[]
    for (var i= 0; i<selectedOptions.length;++i){
course_array.push(selectedOptions[i].value)


    }
    
    console.log(course_array,"------------");
    var token = localStorage.getItem("access_token");
    const model = {
      name: college,
      university_id: selectedCollege,
      course_id: course_array,
    };
    var res = await createCollege(model, token);

    $("#datatable").DataTable().ajax.reload();
    setSelectedOptions(null);
    options = [];
    console.log(college);
    if (res.statusCode === 200) {
      $("#datatable").DataTable().ajax.reload();

      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  };
  const onChangeCollegeHandler = (event) => {
    console.log("this is selected college", selectedCollege);
    setSelectedCollege("")
    setSelectedCollege(event.target.value);
  };

  const handleChange = (selectedOption) => {
  setSelectedOptions(selectedOption)
    console.log(`Option selected:`, selectedOptions);
  };

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
              <div className="row"  style={{marginBottom:"15px"}}>
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="mx-4 text-dark">College Management</h4>
                  <button
                    type="button"
                    className="btn btn-secondary mx-4"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={universitiesList}
                  >
                    Add New
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Add College
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="university-name"
                                className="col-form-label"
                              >
                                Collage
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                              />
                            </div>
                            <label
                              htmlFor="selectUniversity-name"
                              className="col-form-label"
                            >
                              Select University
                            </label>
                            <select
                              onChange={onChangeCollegeHandler}
                              class="form-select form-select-md mb-3"
                              aria-label=".form-select-lg example"
                            >
                              <option selected>Select University</option>
                              {universityList.map(function (item) {
                                return (
                                  <option key={item._id} value={item._id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            <label
                              htmlFor="selectCourses-name"
                              className="col-form-label"
                            >
                              Select Courses
                            </label>
                            <Select
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              defaultValue={options[0]}
                              isMulti
                              value={selectedOptions}
                              onChange={handleChange}
                              options={options}
                            />
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            onClick={saveCollage}
                            data-bs-dismiss="modal"
                            className="btn btn-secondary"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}

          <section className="content">
          <main>
          <div className="col-sm-12">
        
            <CollegeDataTable />
          </div>
          </main>
          </section>
          {/* /.content */}
        </div>

        {/* <Footer /> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Collage;
