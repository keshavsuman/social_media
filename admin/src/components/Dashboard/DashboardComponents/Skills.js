import React, { useState } from "react";
import SkillDataTable from "./DataTables/SkillsDataTable";
import { ToastContainer } from "react-toastify";
import showToast from "../../../utils/toast/toast";
import $ from "jquery";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import  { createSkill } from "../../../services/userservices/user.admin.services"

const Skills = () => {
  const [skill, setSkill] = useState("");

  const saveUniversity = async () => {
    var token = localStorage.getItem("access_token");
    var res = await createSkill(skill, token);
    console.log(skill);
    if (res.status === 200) {
      $("#datatable").DataTable().ajax.reload();

      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }

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
                  <h4 className="mx-4 text-dark">Skills Management</h4>
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
                            Add Skill
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
                                Skill
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                              />
                            </div>
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
                            onClick={saveUniversity}
                            data-bs-dismiss="modal"
                            className="btn btn-secondary"
                          >
                            Save changes
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
        
            <SkillDataTable />
            </div>
            </main>
            </section>
          {/* /.content */}
        </div>
      </div>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default Skills;
