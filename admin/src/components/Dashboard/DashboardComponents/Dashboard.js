import React, { Component } from "react";
import Datatable from "./DataTables/datatable";
import { Link } from "react-router-dom";
import showToast from "../../../utils/toast/toast";
import {
  dashBoard,
} from "../../../services/userservices/user.admin.services";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nterestCount: 0,
      skillCount: 0,
      universityCount: 0,
      usersCount: 0,
      collegeCount: 0,
      refreshDataTable: false,
    };
  }
  componentDidMount() {
    this.getDashboardData();
    this.refreshDataTableMethod();
  }

  refreshDataTableMethod() {
    this.setState({ refreshDataTable: !this.state.refreshDataTable });
  }

  async getDashboardData() {
    var a = localStorage.getItem("access_token");
    var data = await dashBoard(a);
    if (data.status === 200) {
      this.setState(data.data);
    } else {
      showToast(data.message, "error");
    }
  }

  render() {
    return (
      <div>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3 className="mx-1 text-dark">Dashboard</h3>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <section className="content">
            <div className="container-fluid" style={{ padding: "0" }}>
              {/* Small boxes (Stat box) */}

              <main>
                <div className="dashboard-cards">
                  <Link to="/user-management">
                    <div className="card-single">
                      <div>
                        <h3>{this.state.usersCount}</h3>

                        <span>Users</span>
                      </div>
                      <div>
                        <p className="las la-user"></p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/universities-management">
                    <div className="card-single">
                      <div>
                        <h3>{this.state.universityCount}</h3>

                        <span>Universities</span>
                      </div>

                      <div>
                        <p className="las la-university"></p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/collages-management">
                    <div className="card-single">
                      <div>
                        <h2>{this.state.collegeCount}</h2>
                        <span>Colleges</span>
                      </div>
                      <div>
                        <p className="las la-chalkboard-teacher"></p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/skills-management">
                    <div className="card-single">
                      <div>
                        <h2>{this.state.skillCount}</h2>
                        <span>Skills</span>
                      </div>
                      <div>
                        <p className="las la-graduation-cap"></p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-sm-12">
                  <br />
                  <br />
                  <h4 className="m-0 text-dark">
                    Registered Universities
                  </h4>{" "}
                  <br />
                  <Datatable refresh={this.state.refreshDataTable} />
                </div>
              </main>
            </div>
            {/* /.container-fluid */}
          </section>

          {/* <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <h4 className="m-0 text-dark">Registered Universities</h4>{" "}
                  <br />
                  <Datatable refresh={this.state.refreshDataTable} />
                </div>
              </div>
            </div>
          </section>
          /.content */}
        </div>
      </div>
    );
  }
}
