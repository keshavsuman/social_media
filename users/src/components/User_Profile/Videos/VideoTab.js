import React from "react";
import p1 from "../../../static/image/p1.jpg"
import p2 from "../../../static/image/p2.jpg"
import p3 from "../../../static/image/p3.jpg"
import p4 from "../../../static/image/p4.jpg"
import p5 from "../../../static/image/p5.jpg"
import p6 from "../../../static/image/p6.jpg"
import p7 from "../../../static/image/p7.jpg"
import p8 from "../../../static/image/p8.jpg"
import p9 from "../../../static/image/p9.jpg"


const UserVideo = () => {
return (
    <div className="tab-pane fade show active" id="videos">
    <div className="row">
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <video poster={p1}>
            <source src type="video/mp4" />
            <source src type="video/ogg" />
          </video>
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p2} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p3} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p4} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p5} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p6} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p7} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p8} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-30 col-lg-4">
        <div className="photovideobox">
          <img src={p9} alt />
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-play" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

) ;

};

export default UserVideo;