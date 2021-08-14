import React from "react";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import UserDatatable from "./DataTables/UserDataTable";
const UserManagement = () => {
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
                <div className="col-sm-6">
                  <h4 className="text-dark">&nbsp;&nbsp;&nbsp;User Management</h4>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>

          <section className="content">
          <main>
          <div className="col-sm-12">
          <UserDatatable />
          </div>
          </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
