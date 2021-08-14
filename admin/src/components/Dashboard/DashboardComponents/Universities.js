import React, { useState } from "react";
import Datatable from "./DataTables/datatable";
import { ToastContainer } from "react-toastify";
import showToast from "../../../utils/toast/toast";
import $ from "jquery";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import logo from "../../../static/images/Younity Logo.png"
import { createUniversity } from  "../../../services/userservices/user.admin.services"


const Universities = () => {
  const [university, setUniversity] = useState("");

  const saveUniversity = async () => {
    var token = localStorage.getItem("access_token");
    var res = await createUniversity(university, token);
    if (res.statusCode === 200) {
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
        <DashboardHeader /><br/><br/><br/><br/><br/>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container">
              <div className="row" style={{marginBottom:"15px"}}>
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="text-dark">&nbsp;&nbsp;University Management</h4>
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
                      <div>
                        <center>
                        <img src={logo} height="100" width="200" alt="logo" /><br></br>
                        </center>
                   
                      </div>
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Add University
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
                            <div className="mb-3 mx-2">
                                <label
                                  htmlFor="university-name"
                                  className="col-form-label"
                                >
                                  University
                                </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
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

          <section className="content">
          <main>
          <div className="col-sm-12">
            <Datatable />
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

export default Universities;
