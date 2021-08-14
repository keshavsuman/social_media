import React from "react";
import b1 from "../../../static/image/b1.jpg";
import b2 from "../../../static/image/b2.jpg";
import b3 from "../../../static/image/b3.jpg";
import b4 from "../../../static/image/b4.jpg";
import b5 from "../../../static/image/b5.jpg";
import b6 from "../../../static/image/b6.jpg";
import b7 from "../../../static/image/b7.jpg";

const Interests = () => {
  return (
    <div className="col-xs-12 col-lg-9">
      <div className="rightprofile">
        <div className="row">
          <div className="col-sm-12">
            <div className="cinterest">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Interest and likings</h2>
                  <a className="cbutton" href="#">
                    <span>Manage Interest</span>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h4>Books</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b1} alt="" />
                    </a>
                    <a href title="The king of Drugs" className="ctitle">
                      The king of Drugs
                    </a>
                  </div>
                </div>
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b2} alt="" />
                    </a>
                    <a href title="Memory" className="ctitle">
                      Memory
                    </a>
                  </div>
                </div>
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b3} alt="" />
                    </a>
                    <a href title="The Three Month Rule" className="ctitle">
                      The Three Month Rule
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h4>Movies</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b4} alt="" />
                    </a>
                    <a href title="Joker" className="ctitle">
                      Joker
                    </a>
                  </div>
                </div>
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b5} alt="" />
                    </a>
                    <a href title="After" className="ctitle">
                      After
                    </a>
                  </div>
                </div>
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b6} alt="" />
                    </a>
                    <a href title="The Astronaut" className="ctitle">
                      The Astronaut
                    </a>
                  </div>
                </div>
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b7} alt="" />
                    </a>
                    <a href title="After II" className="ctitle">
                      After II
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h4>Movies</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b4} alt="" />
                    </a>
                    <a href title="Joker" className="ctitle">
                      Joker
                    </a>
                  </div>
                </div>
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b5} alt="" />
                    </a>
                    <a href title="After" className="ctitle">
                      After
                    </a>
                  </div>
                </div>
                <div className="col-25 col-lg-2 text-center">
                  <div className="cinbox">
                    <a href className="cicon">
                      <img src={b6} alt="" />
                    </a>
                    <a href title="The Astronaut" className="ctitle">
                      The Astronaut
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interests;
