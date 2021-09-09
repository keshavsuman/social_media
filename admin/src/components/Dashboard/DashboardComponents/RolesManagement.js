import React, { useState,useEffect } from "react";
import Footer from "../DashboardSharedComponents/Footer";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import RoleDataTable from "./DataTables/RoleDataTable";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import showToast from "../../../utils/toast/toast";
import makeAnimated from "react-select/animated";
import $ from "jquery";

import{permissionList,addRole} from '../../../services/userservices/user.admin.services'

var options =[]
const RolesManagement = () => {
  useEffect(() => {
    const fetch = async () => {
   getPermissionList()
    };

    fetch();
  }, []);

  const animatedComponents = makeAnimated();

  const initialValues = {
  
    role_name: "",
    selectedOption:"",
 
  };

  const [admin, setAdmin] = useState(initialValues);
  const { role_name  } = admin;

  const [PermissionLists, setPermissionList] = useState([]);
    const getRoleList=async()=>{



    //setPermissionList(res.roles);
  };

  const getPermissionList= async()=> {

var res = await permissionList(localStorage.getItem('access_token'))
    for (var i = 0; i < res.permission.length; ++i) {
      options.push({
        value: res.permission[i]._id,
        label: res.permission[i].name,
      });
    }
    console.log(options, "op");

    console.log(res, "api");
  }






  const onValueChange = (event) => {
    event.preventDefault();
    setAdmin({ ...admin, [event.target.name]: event.target.value });
  };


  const addRoles = async (event) => {
    event.preventDefault();
    let permissions = []
    for (let index = 0; index < PermissionLists.length; index++) {
      permissions.push(PermissionLists[index].label);
    }
    const model = {
      name:admin.role_name,
      modules:permissions
    }
    var res = await addRole(model)
    dataEmpty();

    if (res.status === 200) {
      $("#datatable").DataTable().ajax.reload();

      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  };

const   handleChange = (selectedOption) => {
    setPermissionList(selectedOption)
  };
  const dataEmpty = () => {
    setAdmin({
      role_name: "",
      password: "",
      name: "",
      mobile: "",
      gender: "",
      role_id: "",
    });
    setPermissionList([]);
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
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row" style={{marginTop:"15px", marginBottom:"15px"}}>
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="mx-4 text-dark" style={{marginLeft:"0px"}}>Roles Management</h4>
                  <button
                    type="button"
                    className="btn btn-secondary mx-4"
                    data-bs-toggle="modal"
                 
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
                            Add Role
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
                                placeholder="Role Name"
                                name="role_name"
                                required
                                value={role_name}
                                onChange={(event) => onValueChange(event)}
                              />
                              <br></br>
                          
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
                           
                             
                            <Select


                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                
                                isMulti
                                value={PermissionLists}
                                  onChange={handleChange}
                               options={options}
                                />
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
                              onClick={addRoles}
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
          
          <RoleDataTable />
          </div>
          </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RolesManagement;
