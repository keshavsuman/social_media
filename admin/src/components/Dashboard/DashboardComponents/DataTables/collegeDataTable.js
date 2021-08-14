import React, { Component } from "react";
import $ from "jquery";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
//import { createCollege, getUniversitiesList } from "../../../services/userservices/user.admin.services";



import { ToastContainer } from "react-toastify";
import showToast from "../../../../utils/toast/toast";




import {baseurl} from "../../../../services/config/config"
import {collegeDatatable} from "../../../../services/config/serviceroutes"
import {getUniversitiesList,getCoursesList,updateCollege,updateCollegeStatus,deleteCollege,editCollege} from "../../../../services/userservices/user.admin.services"
const axios = require("axios");
const animatedComponents = makeAnimated();
var selectids;
var uni;
var loc;
var ids;
var row_options=[]
var options = []
var selectedvalue=["60ce4ff8772f204078b46b94"];
//const [universityList, setUniversityList] = useState([]);
export default class CollegeDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {   selectedOption: [],courseList:[],selectedUniversityId:"",college: "",universityList:[],setUniversityList:[] };
    
    this.manageDatatable = this.manageDatatable.bind(this);
    this.universitiesList= this.universitiesList.bind(this);
    this.updateCollegeDetails=this.updateCollegeDetails.bind(this);
    this.closeHandler=this.closeHandler.bind(this);

  }
  handleChange = selectedOption => {
    
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
 universitiesList =  async () => {
   console.log("hello");
    try {
      var access = localStorage.getItem('access_token');
      const data = await getUniversitiesList(access);   
      console.log(data);   
    this.setState({

      universityList:data.data.universities

    })
    this.courseList()
     // setUniversityList(data.data.universities);
      return data.data.universities;
    } catch (error) {
      console.log(error);
    }

    
  }
 
  courseList =  async () => {
    console.log("hello");
     try {
       var access = localStorage.getItem('access_token');
       const data = await  getCoursesList(access);   
       console.log(data);   
     this.setState({
 
      courseList :data.data.courses
 
     })
     for (var i= 0 ; i< this.state.courseList.length; ++i){

  options.push({value:this.state.courseList[i]._id,label:this.state.courseList[i].name});
  row_options.push(this.state.courseList[i]._id)
     }

     
      // setUniversityList(data.data.universities);
       return data.data.courses;
     } catch (error) {
       console.log(error);
     }
 
     
   }

  async manageDatatable(event){
    
  
    if (event.target.hasAttribute("college_delete-id")) {
      const id = event.target.getAttribute("college_delete-id");
      console.log(id);
      var res = await deleteCollege(
        id,
       localStorage.getItem("access_token")
      );
      $("#datatable").DataTable().ajax.reload();

      console.log(res);
    } else if (event.target.hasAttribute("college_edit-id")) {
      var ar=[]
      const id = event.target.getAttribute("college_edit-id");

      ids = event.target.getAttribute("college_edit-id");
      console.log(id);
      loc = localStorage.getItem("access_token");
      var res = await editCollege(
        id,
       localStorage.getItem("access_token")
      );
     console.log(res,"updatesssssssssssssssssss");
      for(var  i= 0 ; i< res.data.course_id.length; ++i  ){
       console.log(  res.data.course_id[i]._id);
     
      var searc= row_options.indexOf(res.data.course_id[i]._id)
     
      console.log(searc,",,,,,,,,,,,,,,,,,,,,,,,,,");
      //this.state.selectedOption.push(options[searc]) 
      ar.push(options[searc])
 


       


      }
      this.setState({

        selectedOption:ar
      })
    
      if (res.statusCode == 200) {
this.setState({


  selectedUniversity:res.data.university_id
})

        //document.getElementById('show_selected').value = "60ccab27e956024280d80b22"
        console.log(res.data.university_id,"----------------------------------------------@@@@@@@@@@@@@@@@@@");
        document.getElementById("show_selected").value = this.state.selectedUniversity;
       
        //  showToast(res.message, "success");
          this.setState({
              college: res.data.name,
            });
          //  $("#datatable").DataTable().ajax.reload();
        } else {
          showToast(res.message, "error");
        }
      

      // console.log(res.data.name);
    }else if (event.target.hasAttribute("college_status-id")){
      const id = event.target.getAttribute("college_status-id");
      
    var res= await  updateCollegeStatus(id,localStorage.getItem('access_token'))
    $("#datatable").DataTable().ajax.reload();
  
  }
  }
  
  componentDidMount() {
   // this.courseList()
    this.universitiesList()
    const self = this;
//this.universitiesList()
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
          // console.log(data);
          var res = await axios.post(
            baseurl+collegeDatatable,
            {
              data: data,
            }
          );
          // console.log(res.data);
          // console.log("This is response of Colleges "+ res);
          indexnum = 1;
          if (res.data.statusCode === 200) {
            callback({
              draw: res.data.draw,
              data: res.data.colleges,
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
          { data: "name", title: "College", name: "name" },
          {
            data: "_id",
            title: "Action",
            name: "_id",
            orderable: false,
            searchable: false,
            render: function (id, type, full) {
              
             
              return (
                
                '<a href="javascript:void(0)"><i class="fas fa-user-edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" college_edit-id="' +
                full._id +

                '"></i></a> <a href="javascript:void(0)"><i class="deleteobject fas fa-trash" college_delete-id="' +
                full._id+

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
                
                 '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox" checked  college_status-id="' +
                 full._id +
                 '">   <span class="slider round"></span>     </label></a> &nbsp;   '
              );
            }
             else {

              return (
                '<a href="javascript:void(0)">   <label class="switch"> <input type="checkbox"  college_status-id="' +
                full._id +
                '">   <span class="slider round"></span></i></a> &nbsp;     </label>     '
              ); 
            
            }
            },
          }
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
 async closeHandler(){
   this.setState({

    //selectedOption: []
   })

 }
  async updateCollegeDetails() {
    var assigned_course=[]

    for (var i=0 ;i<this.state.selectedOption.length;++i){
   assigned_course.push(this.state.selectedOption[i].value)


    }

    console.log("Selected Courses",assigned_course);


    var res = await updateCollege(ids, this.state.college, loc,this.state.selectedUniversity,assigned_course);
   
    if(res.statusCode == 200){
     $("#datatable").DataTable().ajax.reload();
     //assigned_course=[]
    // this.state.courseList=[]
     //this.state.selectedOption=null
      showToast(res.message, 'success')
    }else{
      showToast(res.message, 'error')
    }
    // this.forceUpdate()
  }
  componentWillUnmount(){
    window.removeEventListener("click", this.manageDatatable);
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <div class="table-responsive card">
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
                  Update College
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
                <select id= "show_selected"
                              onChange={(e) => {
                               // uni = e.target.value;
                               selectids=e.target.value
                                this.setState({
                                  selectedUniversity: e.target.value,
                                });
                                selectids= this.state.selectedUniversity;
                                
                                console.log(this.state.selectedUniversity,'---------------------------');
                              }}
                              class="form-select form-select-md mb-3"
                              aria-label=".form-select-lg example"
                              
                            >
                              <option selected >Select University</option>
                              {
                                this.state.universityList.map(function (item) {
                                  console.log("hiiiiii");
                                  
                                  return <option     key={item._id} value={item._id}>{item.name}</option>
                                })
                              }
                            </select>

                  <div className="mb-3">
                    <label htmlFor="college-name" className="col-form-label">
                      College
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={this.state.college}
                      onChange={(e) => {
                        uni = e.target.value;
                        this.setState({
                          college: e.target.value,
                        });
                      }}
                    />
                   
                    
                   <label htmlFor="college-courses" className="col-form-label">
                      Select Courses
                    </label>

                   <Select


closeMenuOnSelect={false}
components={animatedComponents}

///defaultValue={{ label: "Select Dept", value: 1 }}
isMulti
value={selectedOption}
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
                  data-bs-dismiss="modal"onClick={this.closeHandler}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.updateCollegeDetails}
                  class="btn btn-secondary"
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

