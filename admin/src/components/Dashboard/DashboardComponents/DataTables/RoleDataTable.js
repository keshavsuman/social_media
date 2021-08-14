import React, { Component } from "react";
import $ from "jquery";
import Select from "react-select";
import makeAnimated from "react-select/animated";



import { ToastContainer } from "react-toastify";
import showToast from "../../../../utils/toast/toast";



import {baseurl} from "../../../../services/config/config"
import {roleDataTable} from "../../../../services/config/serviceroutes"
import {updateRoleStatus,deleteUniversity,permissionList,editAdmin,updateAdmin} from "../../../../services/userservices/user.admin.services"
const animatedComponents = makeAnimated();

const axios = require("axios");
var options = [];
var uni;
var loc;
var ids;

export default class RoleDatatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      name: null,
      email: null,
      mobile: null,
      role_id: null,
      permissionlist: null,
      selectedpermissionlist: null,
    };

    this.manageDatatable = this.manageDatatable.bind(this);
    this.saveNewUniversityChanges = this.saveNewUniversityChanges.bind(this);
  }

  async manageDatatable(event) {
    if (event.target.hasAttribute("delete-id")) {
      const id = event.target.getAttribute("delete-id");
      console.log(id);
      var res = await   deleteUniversity(
        id,
        localStorage.getItem("access_token")
      );
      $("#datatable").DataTable().ajax.reload();
      // TODO: HERE res is undefined response is not present
      console.log("my", res);
      // if(res.statusCode === 200){
      // $("#datatable").DataTable().ajax.reload();
      // }
    } else if (event.target.hasAttribute("edit-id")) {
      const id = event.target.getAttribute("edit-id");
      var res2 = await    permissionList();
      console.log(res2);
      this.setState({
        permissionlist: res2.permission,
      });

      for (var i = 0; i < this.state.permissionlist.length; ++i) {
        options.push({
          value: this.state.permissionlist[i].name,
          label: this.state.permissionlist[i].name,
        });
        //row_options.push(this.state.courseList[i]._id)
      }
      ids = event.target.getAttribute("edit-id");
      console.log(id);
      loc = localStorage.getItem("access_token");
      var res = await   editAdmin(
        id,
        localStorage.getItem("access_token")
      );

      this.setState({
        status: res.data.admin.status,
        name: res.data.admin.name,
        email: res.data.admin.email,
        mobile: res.data.admin.mobile,
        role_id: res.data.admin.role_id,
      });
      document.getElementById("show_selected").value = this.state.status;

      //   if (res.statusCode === 200) {
      //     this.setState({
      //       university: res.data.name,
      //     });

      //   } else {
      //     showToast(res.message, 'error')
      //   }
    } else if (event.target.hasAttribute("admin_status-id")) {
      const id = event.target.getAttribute("admin_status-id");

     await    updateRoleStatus(
        id,
        localStorage.getItem("access_token")
      );
      $("#datatable").DataTable().ajax.reload();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.manageDatatable);
  }

  componentDidMount() {
    const self = this;

    window.addEventListener("click", this.manageDatatable);

    //const { refresh } = this.props;
    //this.setState({})
    $(function () {
      var indexnum = 1;

      $("#datatable").DataTable({
        serverSide: true,
        paging: true,
        processing: true,
        responsive: true,
        ordering: true,
        order: [0, "asc"],
        type: "POST",

        ajax: async (data, callback, settings) => {
          console.log(data);
          const accessToken = localStorage.getItem("access_token");
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };
          var res = await axios.post(
             baseurl +   roleDataTable,
            {
              data: data,
            },
            config
          );
          indexnum = 1;
          if (res.data.statusCode === 200) {
            callback({
              draw: res.data.draw,
              data: res.data.roles,
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
            email: "email",
            mobile: "mobile",
            createdAt:"createdAt",
            permissions:"permissions",

            orderable: false,
            searchable: false,
            render: function () {
              return indexnum++;
            },
          },
          { data: "name", title: "Name", name: "name" },
          { data: "createdAt", title: "createdAt", createdAt: "createdAt" },
          { data: "permissions", title: "Permissions", permissions: "permissions" },
       
         
          // {
          //   data: "_id",
          //   title: "Action",
          //   name: "_id",
          //   orderable: false,
          //   searchable: false,
          //   render: function (id, type, full) {
          //     if (full.status==true){

          //     return (
          //       '<a href="javascript:void(0)"><i class="fas fa-check"  admin_status-id="' +
          //       full._id +
          //       '"></i></a> '
          //     );
          //     } else {

          //       return (
          //         '<a href="javascript:void(0)"><i class="fas fa-times"  admin_status-id="' +
          //         full._id +
          //         '"></i></a> &nbsp'
          //       );

          //     }
          //   },
          // },

          {
            data: "_id",
            title: "Status",
            name: "_id",
            orderable: false,
            searchable: false,
            render: function (id, type, full) {
              if (full.status == true) {
                return (
                  '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox" checked admin_status-id="' +
                  full._id +
                  '">   <span class="slider round"></span>     </label> </a> &nbsp;   '
                );
              } else {
                return (
                  '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox" admin_status-id="' +
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

  async saveNewUniversityChanges() {
    var res = await   updateAdmin(
      ids,

      this.state.status == "true",
      this.state.name,
      this.state.email,
      this.state.mobile,
      this.state.role_id
    );
    if (res.statusCode === 200) {
      $("#datatable").DataTable().ajax.reload();
      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  }
  handleChange = (selectedpermissionlist) => {
    this.setState({ selectedpermissionlist });
    console.log(`Option selected:`, selectedpermissionlist);
  };
  render() {
    const { selectedpermissionlist } = this.state;
    return (
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
                    <label htmlFor="university-name" className="col-form-label">
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

                      }}
                      class="form-select form-select-md mb-3"
                      aria-label=".form-select-lg example"
                    >
                      <option value="true" selected>
                        True
                      </option>
                      <option value="false">False</option>
                    </select>
                    <label htmlFor="university-name" className="col-form-label">
                      Permission List
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      ///defaultValue={{ label: "Select Dept", value: 1 }}
                      isMulti
                      value={selectedpermissionlist}
                      onChange={this.handleChange}
                      options={options}
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
    );
  }
}

// export default Datatable;
