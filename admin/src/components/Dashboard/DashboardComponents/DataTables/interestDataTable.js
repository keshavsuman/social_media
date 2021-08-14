import React, { Component } from "react";
import $ from "jquery";
import uploadFile from "../../../../services/s3.service/aws.file.service"


import { ToastContainer } from "react-toastify";
import showToast from "../../../../utils/toast/toast";
import {baseurl} from "../../../../services/config/config"
import {intrestDataTable} from "../../../../services/config/serviceroutes"
import {updateInterestStatus,updateInterest,editInterest,deleteInterest} from "../../../../services/userservices/user.admin.services"


const axios = require("axios");

var uni;
var loc;
var ids;
var url
// Work more here 
export default class InterestDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { interest: "",selectedFile:null,selectedFileurl:null };
    this.handleFileInput= this.handleFileInput.bind(this);
    this.manageDatatable = this.manageDatatable.bind(this);
    this.upadateIntersetDetails = this.upadateIntersetDetails.bind(this);
  }
   handleFileInput = (e) => {
 this.setState({
  selectedFile:e.target.files[0]

 })

   
}

  async manageDatatable(event) {
    if (event.target.hasAttribute("interest_delete-id")) {
      const id = event.target.getAttribute("interest_delete-id");
      console.log(id);
      if (window.confirm("are you sure you want to delete this?")) {
        var res = await  deleteInterest(
          id,
          localStorage.getItem("access_token")
        );
        $("#datatable").DataTable().ajax.reload();

        if (res.statusCode === 200)
          showToast(res.message, "success");
      }


    } else if (event.target.hasAttribute("interest_edit-id")) {
      const id = event.target.getAttribute("interest_edit-id");

      ids = event.target.getAttribute("interest_edit-id");
      console.log(id);
      loc = localStorage.getItem("access_token");
      var res = await  editInterest(
        id,
        localStorage.getItem("access_token")
      );

      console.log(res.data.photo,"----------------------------");
      if (res.statusCode === 200) {
        this.setState({
          interest: res.data.name,
          selectedFileurl:res.data.photo
        });

      } else {
        showToast(res.message, 'error');
      }
    }else if (event.target.hasAttribute("intrest_status-id")){
      const id = event.target.getAttribute("intrest_status-id");
     
    var res=  await   updateInterestStatus (id,localStorage.getItem('access_token'))
    $("#datatable").DataTable().ajax.reload();  
  }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.manageDatatable);

  }


  componentDidMount() {


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
          var res = await axios.post(
             baseurl+ intrestDataTable,
            {
              data: data,
            }
          );
          console.log(res.data);
          console.log("data:" + data);

          console.log("This is response of interest " + res);
          indexnum = 1;
          if (res.data.statusCode === 200) {
            callback({
              draw: res.data.draw,
              data: res.data.interests,
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
            photo:"photo",
            orderable: false,
            searchable: false,
            render: function () {
              return indexnum++;
            },
          },
          { data: "name", title: "Interests", name: "name" },
          { data: "photo", title: "photo", name: "photo",
            render: function (id, type, photo) {
              return (
                '<img height=100 width=100 className="img-fluid" src = "' +
                photo.photo +
                '"></img>'
              );
            }
          },

          {
            data: "_id",
            title: "Action",
            name: "_id",
            orderable: false,
            searchable: false,
            render: function (id, type, full) {
  

              return (
                '<a href="javascript:void(0)"><i class="fas fa-user-edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" interest_edit-id="' +
                full._id +

                '"></i></a> <a href="javascript:void(0)"><i class="deleteobject fas fa-trash" interest_delete-id="' +
                full._id +

                '"></i></a>'
              );
    } 
    
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
                
                 '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox" checked intrest_status-id="' +
                 full._id +
                 '">   <span class="slider round"></span>     </label></a> &nbsp;   '
              );
            }
             else {

              return (
                '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox" intrest_status-id="' +
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

  async upadateIntersetDetails() {
    if (this.state.selectedFile != null){
     url=   await uploadFile(this.state.selectedFile);
    
    }
    else{
    url= this.state.selectedFileurl

    }
    var res = await  updateInterest(ids, uni, loc,url) ;
    this.setState({

      selectedFile:null
    })
    url= null
    if (res.statusCode === 200) {
      showToast(res.message, "success")
      $("#datatable").DataTable().ajax.reload();
    } else {
      showToast(res.message, "error")
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
                  Update Interest
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
                      Interest
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={this.state.interest}
                      onChange={(e) => {
                        uni = e.target.value;
                        this.setState({
                          interest: e.target.value,
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
              <center>
                        <input type="file" onChange={this.handleFileInput}/>
                        </center>
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
                  onClick={this.upadateIntersetDetails}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Update Interest
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