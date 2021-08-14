import React, { useState } from "react";
import InterestDataTable from "./DataTables/interestDataTable";
import $ from 'jquery'
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import uploadFile from "../../../services/s3.service/aws.file.service";

//const uploadFile = require("../../../services/s3.service/aws.file.service")
import  { createInterest }  from "../../../services/userservices/user.admin.services"



const Interests = () => {
  const [interest, setInterest] = useState("");
  var [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        selectedFile=e.target.files[0]
    }

  const saveInterest = async () => {
    var url;
    var token= localStorage.getItem("access_token")
    if (selectedFile!= null){
     url = await uploadFile(selectedFile)
     var res= await createInterest(interest,token,url)
    }
  else{

    url="https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"
  
    var res= await createInterest(interest,token,url)
  }
   
   
    console.log(res);
    $("#datatable").DataTable().ajax.reload();

    console.log(interest);
    
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
            <div className="container-fluid">
              <div className="row"  style={{marginBottom:"15px"}}>
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="mx-4 text-dark">Interest Management</h4>
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
                            Add Interest
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
                                Interest
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                              />
                            </div>
                          </form>
                        </div>
                        <center>
                        <input type="file" onChange={handleFileInput}/>
                        </center>
                       
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                         

                          <button type="button" onClick={saveInterest} data-bs-dismiss="modal" className="btn btn-secondary">
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
          {/* Main content */}


          <section className="content">
          <main>
          <div className="col-sm-12">
        
        <InterestDataTable />
        </div>
        </main>
        </section>
          {/* /.content */}
        </div>
     
     
     
      {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Interests;
