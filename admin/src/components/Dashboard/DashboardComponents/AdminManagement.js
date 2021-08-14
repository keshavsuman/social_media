import React, { useState } from "react";
import Footer from "../DashboardSharedComponents/Footer";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import AdminDatatable from "./DataTables/AdminDataTable";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import showToast from "../../../utils/toast/toast";
import makeAnimated from "react-select/animated";
import $ from "jquery";
import {createAdmin,RoleList} from "../../../services/userservices/user.admin.services"

const AdminManagement = () => {
  const animatedComponents = makeAnimated();

  const initialValues = {
    role_id: "",
    email: "",
    password: "",
    name: "",
    mobile: "",
    gender: "",

    dob: "",
  };

  const [admin, setAdmin] = useState(initialValues);

  var { role_id, email, password, name, mobile, gender, dob } = admin;

  const [RoleLists, setRoleList] = useState([]);
    const getRoleList=async()=>{

var res = await   RoleList(localStorage.getItem('access_token'))
console.log("data  -->",res.roles);  

    setRoleList(res.roles);
  };

  const onValueChange = (event) => {
    event.preventDefault();
    setAdmin({ ...admin, [event.target.name]: event.target.value });
   
  };

  const setGender = (event) => {
    setAdmin({ ...admin, gender: event.target.value });
  };

  const addAdmin = async (event) => {
    event.preventDefault();
    admin.role_id="60cf5ef97f259345bc6281f5"
    console.log(admin.role_id);
    var res = await   createAdmin(admin)
    dataEmpty();

    if (res.statusCode === 200) {
      $("#datatable").DataTable().ajax.reload();

      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  };
  const dataEmpty = () => {
    setAdmin({
      email: "",
      password: "",
      name: "",
      mobile: "",
      gender: "",
      role_id: "",
    });
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
              <div className="row" style={{marginBottom:"15px"}}>
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="mx-4 text-dark">Admin Management</h4>
                  <button
                    type="button"
                    className="btn btn-secondary mx-4"
                    data-bs-toggle="modal"
                    onClick={getRoleList}
                    data-bs-target="#exampleModal"
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
                            Add Admin
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form>
                          <div className="modal-body">
                            <div className="mb-3">
                              <input
                                type="email"
                                className="form-control"
                                id="recipient-email"
                                placeholder="Email"
                                name="email"
                                required
                                value={email}
                                onChange={(event) => onValueChange(event)}
                              />
                              <br></br>
                              <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                id="recipient-password"
                                name="password"
                                required
                                value={password}
                                onChange={(event) => onValueChange(event)}
                              />
                              {/* 
                                <Select


                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={options[0]}
                                isMulti
                                value={selectedOptions}
                                  onChange={handleChange}
                               options={options}
                                /> */}
                            </div>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(event) => onValueChange(event)}
                                    id="text"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    placeholder="Mobile"
                                    className="form-control"
                                    id="text"
                                    name="mobile"
                                    value={mobile}
                                    onChange={(event) => onValueChange(event)}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6 px-3 px-3">
                                <label>Gender</label>
                                <br />
                                <div className="form-check form-check-inline py-3">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="Gender"
                                    id="inlineRadio1"
                                    value="male"
                                    onClick={setGender}
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio1"
                                  >
                                    Male
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="Gender"
                                    id="inlineRadio2"
                                    value="female"
                                    onClick={setGender}
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio2"
                                  >
                                    Female
                                  </label>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="mb-3">
                                  <label>D.O.B</label>
                                  <input
                                    type="date"
                                    placeholder="Mobile"
                                    className="form-control"
                                    name="dob"
                                    id="text"
                                    value={dob}
                                    onChange={(event) => onValueChange(event)}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/* <select
                              className="form-select"
                              aria-label="Default select example"
                              name="role_id"
                              onChange={(event) => onValueChange(event)}
                            >
                              <option value="" disabled selected hidden>
                                Pick Role
                              </option>
                              {RoleLists.map(function (role) {
                                return (
                                  <option key={role._id} value={role._id}>
                                    {role.name}
                                  </option>
                                );
                              })}
                            </select> */}
                          </div>
                          <div className="modal-footer text-center">
                            {/* <button
                              type="button"
                              className="btn btn-light"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button> */}
                            <button
                              type="submit"
                              onClick={addAdmin}
                              data-bs-dismiss="modal"
                              className="btn btn-secondary"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          
          <section className="content">
          <main>
          <div className="col-sm-12">
          
          <AdminDatatable />
          </div>
          </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
