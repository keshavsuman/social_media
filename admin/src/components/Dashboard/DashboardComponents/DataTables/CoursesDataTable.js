import React, { Component } from "react";
import $ from "jquery";



import { ToastContainer } from "react-toastify";
import showToast from "../../../../utils/toast/toast";



import {baseurl} from "../../../../services/config/config"
import {coursesDatatable} from "../../../../services/config/serviceroutes"
import {updateCourseStatus,updateCourses,editCourses,deleteCourses} from "../../../../services/userservices/user.admin.services"
const axios = require("axios");

var uni;
var loc;
var ids;

class CoursesDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: "" };
    this.manageDatatable = this.manageDatatable.bind(this);
    this.saveNewCoursesChanges = this.saveNewCoursesChanges.bind(this);
  }
async manageDatatable(event) {
    if (event.target.hasAttribute("delete-id")) {
      const id = event.target.getAttribute("delete-id");
      console.log(id);
      var res = await deleteCourses(
        id,
        localStorage.getItem("access_token")
      );
      $("#datatable").DataTable().ajax.reload();
     
     

    } else if (event.target.hasAttribute("edit-id")) {
      const id = event.target.getAttribute("edit-id");

      ids = event.target.getAttribute("edit-id");
      console.log(id);
      loc = localStorage.getItem("access_token");
      var res = await editCourses(
        id,

        localStorage.getItem("access_token")
      );
      if (res.status === 200) {
        this.setState({
            courses: res.data.name,
        });

      } else {
        showToast(res.message, 'error')
      }
    }else if (event.target.hasAttribute("course_status-id")){
      const id = event.target.getAttribute("course_status-id");
    
    var res= await   updateCourseStatus (id,localStorage.getItem('access_token'))
    $("#datatable").DataTable().ajax.reload();
  
  }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.manageDatatable)
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
          var res = await axios.post(
        baseurl+coursesDatatable,
            {
              data: data,
            }
          );
          indexnum = 1;
          if (res.data.status === 200) {
            callback({
              draw: res.data.draw,
              data: res.data.courses,
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
            orderable: false,
            searchable: false,
            render: function () {
              return indexnum++;
            },
          },
          { data: "name", title: "Courses", name: "name" },
          { data: "duration", title: "Duration in Years", name: "duration" },
          {
            data: "_id",
            title: "Action",
            name: "_id",
            orderable: false,
            searchable: false,
            render: function (id, type, full) {

              
              return (
                '<a href="javascript:void(0)"><i class="fas fa-user-edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" edit-id="' +
                full._id+

                '"></i></a> <a href="javascript:void(0)"><i class="deleteobject fas fa-trash" delete-id="' +
                full._id +

                '"></i></a>'

                

                

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

            if (full.status== true) {

              return (
                
                 '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox" checked  course_status-id="' +
                 full._id +
                 '">   <span class="slider round"></span>     </label></a> &nbsp;   '
              );
            }
             else {

              return (
                '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox"  course_status-id="' +
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

  async saveNewCoursesChanges() {
    var res = await updateCourses(ids, uni, loc);
    if (res.status === 200) {
      $("#datatable").DataTable().ajax.reload();
      showToast(res.message, 'success')
    } else {
      showToast(res.message, 'error')
    }
  }

  render() {
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
                  Update Courses
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
                      Courses
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={this.state.courses}
                      onChange={(e) => {
                        uni = e.target.value;
                        this.setState({
                          courses: e.target.value,
                        });
                      }}
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
                  onClick={this.saveNewCoursesChanges}
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

export default CoursesDataTable;
