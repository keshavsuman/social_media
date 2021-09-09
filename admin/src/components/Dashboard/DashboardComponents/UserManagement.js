import React, { useState, useEffect } from "react";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";
import * as RouterService from "../../../services/router/index";
import * as userService from "../../../services/userservices/user";
import { useHistory } from "react-router-dom";
import { token, baseurl } from "../../../services/config/config";
import ReactPaginate from 'react-paginate';
import serviceroutes from "../../../services/config/serviceroutes";
import axios from "axios";

const PER_PAGE = 10;
export default function UserManagement(props) {
  const history = useHistory();
  const [tableData, settableData] = useState([]);
  const [filteredList, setfilteredList] = useState([]); 
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let urlData = RouterService.urlToSplitData(
      RouterService.getLocationData().pathname
    );
    _getUsersListData();
  }, []);

  const handlePageClick = (data) => {
    console.log('data', data)
    let selectedPage = data.selected
    setCurrentPage(selectedPage);
}

  const _getUsersListData = async () => {
    let data = {
      searchValue: "",
      limit: 50,
      after: 3,
    };
    let result = await userService.getUsers(token);
    console.log("result", result);
    setfilteredList(result.data.users);
    settableData(result.data.users);
  };
  const pageCount = Math.ceil(filteredList.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;
  const _renderUserDataList = (filteredList) => {
    let userList = filteredList.slice(offset, offset + PER_PAGE)
    return userList.map((item, index) => {
      console.log("item", item);
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.first_name}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td>
            <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>
          </td>
          <td>{item.dob}</td>
          <td>{item.home_town}</td>
          <td>{item.state} </td>
          <td>{item.gender} </td>
          <td>
            <span className="cursor"
              onClick={() =>
                RouterService.navigateTo("/admin/user-profile/" + item._id)
              }
            >
              <ion-icon name="eye-outline"></ion-icon>{" "}
            </span>
          </td>
        </tr>
      );
    });
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
              <div className="row" style={{ marginBottom: "15px" }}>
                <div className="col-sm-6">
                  <h4 className="text-dark">User Management</h4>
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
                <table>
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Register Date</th>
                      <th>DOB</th>
                      <th>Home Town</th>
                      <th>Status</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{_renderUserDataList(filteredList || [])}</tbody>
                </table>
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                />
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}
