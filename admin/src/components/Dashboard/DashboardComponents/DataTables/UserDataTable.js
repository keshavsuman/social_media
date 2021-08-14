import React, { Component } from "react";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";



import { ToastContainer } from "react-toastify";
import showToast from "../../../../utils/toast/toast";






import {baseurl} from "../../../../services/config/config"
import {getStates} from "../../../../services/userservices/user.services"
import {usersDataTable} from "../../../../services/config/serviceroutes"
import {updateUserStatus,updateUser,editUser,deleteUniversity} from "../../../../services/userservices/user.admin.services"

const animatedComponents = makeAnimated();

const axios = require("axios");
var options = [];
var uni;
var loc;
var ids;
var st;
var et;
class UserDatatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      name: null,
      email: null,
      mobile: null,
      role_id: null,
      start_date: "",
      end_date: "",
      selectedstate: "",
    };
    this.manageDatatable = this.manageDatatable.bind(this);
    this.SubmitForm = this.SubmitForm.bind(this);
    this.render = this.render.bind(this);
    // this.showDataTable=this.showDataTable(this)
    this.setStart_date = this.setStart_date.bind(this);
    //this.hello =this.hello.bind(this)
    this.stateValue = "";
    this.getStartDate = this.getStartDate.bind(this);
    this.saveNewUniversityChanges = this.saveNewUniversityChanges.bind(this);
  }

  setStart_date(start_date) {
    this.setState({ start_date });
  }

  SubmitForm = async (event) => {
    event.preventDefault();
    console.log(this.state.start_date);
    console.log(this.state.end_date);
    localStorage.setItem("start_date", this.state.start_date);
    localStorage.setItem("end_date", this.state.end_date);

    this.setState({ selectedstate: null });
    //this.showDataTable()
    $("#datatable").DataTable().ajax.reload();

    this.setState({ selectedstate: "" });

    console.log("hii");
  };

  ResetForm = async (event) => {
    event.preventDefault();
    this.stateValue = null;
    document.getElementById('filterForm').reset();
    this.setState({ selectedstate: null });
    this.stateValue = null;
    this.state.selectedstate = null;
    localStorage.setItem("start_date", "");
    localStorage.setItem("end_date", "");
    localStorage.setItem("state", "");

    //this.showDataTable()
    $("#datatable").DataTable().ajax.reload();
  };

  async manageDatatable(event) {
    if (event.target.hasAttribute("delete-id")) {
      const id = event.target.getAttribute("delete-id");
      console.log(id);
      var res = await   deleteUniversity(
        id,
        localStorage.getItem("access_token")
      );
      $("#datatable").DataTable().ajax.reload();
    } else if (event.target.hasAttribute("edit-id")) {
      const id = event.target.getAttribute("edit-id");

      ids = event.target.getAttribute("edit-id");
      console.log(id);
      loc = localStorage.getItem("access_token");
      var res = await   editUser(
        id,

        localStorage.getItem("access_token")
      );

      this.setState({
        status: res.data.user.status,
      });
      document.getElementById("show_selected").value = this.state.status;

      //   if (res.statusCode === 200) {
      //     this.setState({
      //       university: res.data.name,
      //     });

      //   } else {
      //     showToast(res.message, 'error')
      //   }
    } else if (event.target.hasAttribute("user-id")) {
      this.props.history.push(
        `/admin/user-profile/${event.target.getAttribute("user-id")}`
      );
      // browserHistory.push(`/admin/user-profile/${event.target.getAttribute("user-id")}`)
    } else if (event.target.hasAttribute("user_status-id")) {
      const id = event.target.getAttribute("user_status-id");

      var res = await   updateUserStatus(
        id,
        localStorage.getItem("access_token")
      );

      $("#datatable").DataTable().ajax.reload();
    }
  }

  showDataTable() {
    $(function () {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      var indexnum = 1;

      $("#datatable").DataTable({
        serverSide: true,
        paging: true,
        processing: true,
        responsive: true,
        ordering: true,
        order: [9, "desc"],
        type: "POST",

        ajax: async (data, callback, settings) => {
          console.log(data);
          data.start_date = localStorage.getItem("start_date");
          data.end_date = localStorage.getItem("end_date"); //this.srch ? this.pipe.transform(this.srch.end_date, 'yyyy-MM-dd', '') : '';
          data.state = localStorage.getItem("state");
          localStorage.removeItem("end_date");
          localStorage.removeItem("start_date");
          localStorage.removeItem("state");

          var res = await axios.post(
             baseurl + usersDataTable,
            {
              data: data,
            },
            config
          );
          indexnum = 1;
          if (res.data.statusCode === 200) {
            callback({
              draw: res.data.draw,
              data: res.data.users,
              recordsTotal: res.data.recordsTotal,
              recordsFiltered: res.data.recordsFiltered,
            });
          } else {
            callback({
              draw: 0,
              data: [],
              recordsTotal: 0,
              recordsFiltered: 0,
            });
          }
        },
        columns: [
          {
            data: "_id",
            title: "S No.",
            name: "_id",
            fullname: "fullname",
            
            email: "email",
            mobile: "mobile",
            dob: "dob",
            gender: "gender",
            state: "state",
            home_town: "home_town",
            createdAt:"createdAt",

            orderable: true,
            searchable: false,
            render: function () {
              return indexnum++;
            },
          },

          {
            data: "fullname",
            title: "Full Name",
            first_name: "first_name",
            searchable: true,
            name: "first_name",
            render: function(d, t, r) {
             return r.first_name+ " "+r.last_name

          }
        },
         
          { data: "email", title: "Email", email: "email", name: "email" },
          { data: "mobile", title: "Mobile", mobile: "mobile", name: "mobile" },
        
          {
            data: "dob",
            title: "DOB",
            dob: "dob",
            searchable: true,
            name: "dob",
          },
          {
            data: "gender",
            title: "Gender",
            gender: "gender",
            searchable: true,
            name: "gender",
          },
          {
            data: "state",
            title: "State",
            state: "state",
            searchable: true,
            name: "state",
          },
          {
            data: "home_town",
            title: "Home Town",
            home_town: "home_town",
            searchable: true,
            name: "home_town",
          },
          {
            data: "createdAt",
            title: "Registered At",
            createdAt: "createdAt",
            searchable: false,
            name: "createdAt",
          },

          {
            data: "_id",
            title: "Action",
            name: "_id",
            orderable: false,
            searchable: false,
            render: function (id, type, full) {
              return (
                ' <a href="javascript:void(0)"><i class="fas fa-eye"  style="color:#6c757d" user-id="' +
                full._id +
                '" ></i></a>'
              );
            },
          },
          {
            data: "_id",
            title: "Status",
            name: "_id",
            orderable: false,
            searchable: false,
            render: function (id, type, full) {
              if (full.status == true) {
                return (
                  '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox" checked  user_status-id="' +
                  full._id +
                  '">   <span class="slider round"></span>     </label> </a> &nbsp;   '
                );
              } else {
                return (
                  '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox"  user_status-id="' +
                  full._id +
                  '">   <span class="slider round"></span></a> &nbsp;     </label>     '
                );
              }
            },
          },
        ],
        columnDefs: [
          {
            targets: [],
            orderable: false,
          },
        ],
      });
    });
  }

  getStartDate() {
    console.log(this.state.start_date);
    return this.state.start_date;
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.manageDatatable);
  }

  async states() {
    var response = await getStates(localStorage.getItem("access_token"));
    for (var i = 0; i < response.data.states.length; ++i) {
      options.push({
        value: response.data.states[i].name,
        label: response.data.states[i].name,
      });
    }
    console.log(options, "op");

    console.log(response, "api");
  }
  componentDidMount() {
    this.showDataTable();
    this.states();
    var self = this;

    window.addEventListener("click", this.manageDatatable);

    //const { refresh } = this.props;
    //this.setState({})
  }
  handleChange = (selectedstate) => {
    this.setState({ selectedstate });
    this.stateValue = selectedstate;
    localStorage.setItem("state", selectedstate.value);
  };
  async saveNewUniversityChanges() {
    var res = await   updateUser(
      ids,

      this.state.status == "true"
    );
    if (res.statusCode === 200) {
      $("#datatable").DataTable().ajax.reload();
      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  }

  render() {
    return (
      <>
        <section className="content">
          <div className="box">
            <div className="box-header">
              <form name="form" id='filterForm'>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Start Date"
                        autoComplete="off"
                        name="start_date"
                        onChange={(e) => {
                          st = e.target.value;

                          this.setState({
                            start_date: e.target.value,
                          });

                          console.log(this.state.start_date, "fdfd");
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="End Date"
                        autoComplete="off"
                        name="end_date"
                        onChange={(e) => {
                          console.log(e.target.value);
                          et = e.target.value;
                          this.setState({
                            end_date: e.target.value,
                          });

                          console.log(this.state.end_date, "fdfd");
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 text-center">
                    <span style={{ visibility: "hidden" }}>search</span>
                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      defaultValue={{ label: "Select State", value: 1 }}

                      value={this.state.selectedstate}
                      placeholder="States"
                      onChange={this.handleChange}
                      options={options}
                    />
                  </div>
                  <div className="col-sm-4" style={{textAlign:"right"}}>
                    <span style={{ visibility: "hidden" }}>search</span>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-outline-secondary btn-block"
                      onClick={this.SubmitForm}
                    >
                      <span className="glyphicon glyphicon-search"></span>{" "}
                      Search
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;
                    
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-block"
                      onClick={this.ResetForm}
                    >
                      <span className="glyphicon glyphicon-refresh"></span>{" "}
                      Reset
                    </button>
                  </div>
                  {/* <div className="col-lg-2 col-md-2 col-sm-6  text-center">
                    <span style={{ visibility: "hidden" }}>search</span>
                    <br />

                    
                  </div> */}
                </div>
              </form>
              <br />
            </div>
          </div>
        </section>
        <div className="table-responsive card">
          <table
            id="datatable"
            className="display table"
            data-search="true"
            data-ordering="true"
            width="100%"
            cellSpacing="0"
            // style={{"border-bottom":"none"}}
          ></table>
          <script></script>

          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Admin
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
                        Admin Status
                      </label>
                      <select
                        id="show_selected"
                        onChange={(e) => {
                          // uni = e.target.value;

                          this.setState({
                            status: e.target.value,
                          });
                          //selectids= this.state.selectedUniversity;

                          // console.log(this.state.selectedUniversity,'---------------------------');
                        }}
                        class="form-select form-select-md mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option value="true" selected>
                          True
                        </option>
                        <option value="false">False</option>
                      </select>
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
                    onClick={this.saveNewUniversityChanges}
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </>
    );
  }
}

// export default Datatable;
export default withRouter(UserDatatable);
