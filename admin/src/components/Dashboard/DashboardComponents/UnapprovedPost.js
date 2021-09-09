import React, { useEffect, useState } from "react";
import * as baserUrl from "../../../services/config/config";
// import * as miscService from '../../services/Misc'
import * as RouterService from "../../../services/router/index";
import * as postService from "../../../services/post/index";
import SideBarMenu from "../../../shared/Dashboard/SideBarMenu";
import DashboardHeader from "../../../shared/Dashboard/DashboardHeader";
import { token } from "../../../services/config/config";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
// import Img from '../../elements/Img'
export default function UnapprovedPost(props) {
  const history = useHistory();
  const [tableData, settableData] = useState([]);
  const [filteredList, setfilteredList] = useState([]);
  // const { userData } = props.user;

  useEffect(() => {
    let urlData = RouterService.urlToSplitData(
      RouterService.getLocationData().pathname
    );
    _getPostsListData();
  }, []);

  const _getPostsListData = async () => {
    console.log("token", token);
    let result = await postService.getPosts("unapproved", token);
    setfilteredList(result.data);
    settableData(result.data);
  };

  // const _deletePost = async (activeItem) => {
  //     let { userData } = state
  //     let result = await postService.deletePost(activeItem.id, userData.token)
  //     if (result.status) {
  //         miscService.showAlert({
  //             type: 'success',
  //             msg: 'Post deleted successfully!'
  //         })
  //         setState({ activeItem: null, showTrashConfirm: false }, _getPostsListData)
  //     } else {
  //         miscService.showAlert({ type: 'error', msg: 'Unable to deleted post!' })
  //     }
  // }

  const ApprovedPost = async (item) => {
    let data = {
      id: item._id,
    };
    let result = await postService.approvedPost(data, token);
    if (result.status) {
      toast.success("SuccessFully Approved Post");
      _getPostsListData();
      history.push("/approved-post");
    }
  };
  const _renderPostList = (post) => {
    return post.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.author}</td>
          <td>{item.visibility}</td>
          <td>
            <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{item.updatedAt}</Moment>
          </td>
          <td>
            <div className="actions">
              <span onClick={() => ApprovedPost(item)} className="reject">
                <ion-icon name="close-circle-outline"></ion-icon>
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
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
                  <div
                    className="col-sm-12"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="mx-4 text-dark">Unapproved Post List</h4>
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
                              Add Skill
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
                                  Skill
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="recipient-name"
                                  // value={skill}
                                  // onChange={(e) => setSkill(e.target.value)}
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
                              // onClick={saveUniversity}
                              data-bs-dismiss="modal"
                              className="btn btn-secondary"
                            >
                              Save changes
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
                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Author</th>
                        <th>Visibility</th>
                        <th>Created Date</th>
                        <th>Updated Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{_renderPostList(filteredList || [])}</tbody>
                  </table>
                </div>
              </main>
            </section>
            {/* /.content */}
          </div>
        </div>
        {/* <Footer /> */}
        <ToastContainer />
      </div>
    </>
  );
}
