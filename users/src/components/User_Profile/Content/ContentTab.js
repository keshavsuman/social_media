import React, { useState } from "react";
import default_pic from "../../../static/image/default_pic.jpg";
import "../../../static/styles/user.css";
import like from "../../../static/image/like.png";
import user_pic_2 from "../../../static/image/user-pic_2.png";
import post1 from "../../../static/image/post1.jpg";
import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";

const ContentTab = () => {
  const [commentText, setCommentText] = useState("")
  const [collapse, setCollapse] = useState(false);
  const [reactionShown, setReactionShown] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const onReactionClick = () => {
    setReactionShown(  !reactionShown );
  };

  const handleEmojiSelect = (emoji) => {
    // setSelectedEmojis({selectedEmojis:[...selectedEmojis, emoji],
    // })
    setCommentText(commentText + "" +  emoji.native)
    // console.log("selected single emoji-:------",emoji);
  }

  const handleSetCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="tab-pane fade" id="content">
      <div className="row">
        <div className="col-sm-12">
          <div className="postbox">
            <div className="postheader">
              <ul>
                <li>
                  <i className="posticon">
                    <img src={default_pic} alt />
                  </i>
                  <a href title>
                    Ronald Oliver <span>Was With</span>
                    Steve Cunningham
                  </a>
                  <p>November 16, 2021</p>
                </li>
              </ul>
              <i className="fas fa-ellipsis-h dropicon" />
            </div>
            <div className="postmiddle">
              <p>
                Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Cras
                pretium suscipit tellus sit amet aliquet. Vestibulum maximus
                lacinia massa non porttitor.Nunc scelerisque tincidunt elit.
                Vestibulum non mi ipsum. Cras pretium suscipit tellus sit amet
                aliquet. Vestibulum maximus lacinia massa non porttitor.Nunc
                scelerisque tincidunt elit. Vestibulum non mi ipsum.
                {collapse === false
                  ? ""
                  : "Cras pretium suscipit tellus acinia massa non porttitor.Nunc scelerisqueNuncscelerisque tincidunt elit. Vestibulum non mi ipsum. Cras pretium"}
                <a
                  title="View More"
                  className="show_hide"
                  data-content="toggle-text"
                  onClick={() => {
                    handleSetCollapse();
                  }}
                  href
                >
                  {collapse === false ? "view more" : "view less"}
                </a>
              </p>
              <ul className="likecomment">
                <li>
                  <i className="likeicon">
                    <img src={like} alt />
                  </i>
                  <span>20</span>
                </li>
                <li>
                  <span>1 Comment</span>
                </li>
              </ul>
              <ul className="row text-center post-social">
                <li className="col">
                  <div className="likedrop">
                    <i className="far fa-thumbs-up" />
                    Like
                  </div>
                  <ul className="likedropdown">
                    <li>
                      <a>
                        <i className>
                          <img src="images/like.png" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/happy.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/heart-red.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/light-bulb.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/angry.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/shocked.svg" alt />
                        </i>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="col">
                  <i className="far fa-comment" />
                  Comment
                </li>
                <li className="col">
                  <i className="fas fa-share" />
                  Share
                </li>
                <li className="col">
                  <i className="fas fa-envelope" />
                  Message <span>Privately</span>
                </li>
              </ul>
            </div>
            <div className="postfooter">
              <ul>
                <li>
                  <i className="pficon">
                    <img src={user_pic_2} alt />
                  </i>
                  <input
                    type="text"
                    name
                    placeholder="Write a comment.."
                    className="textemoji"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="postbox">
            <div className="postheader">
              <ul>
                <li>
                  <i className="posticon">
                    <img src={default_pic} alt />
                  </i>
                  <a href title>
                    Ronald Oliver <span>Was With</span>
                    Steve Cunningham
                  </a>
                  <p>November 16, 2021</p>
                </li>
              </ul>
              <i className="fas fa-ellipsis-h dropicon" />
            </div>
            <div className="postmiddle">
              <p>
                Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Cras
                pretium suscipit tellus sit amet aliquet. Vestibulum maximus
                lacinia massa non porttitor.Nunc scelerisque tincidunt elit.
                Vestibulum non mi ipsum. Cras pretium suscipit tellus sit amet
                aliquet. Vestibulum maximus lacinia massa non porttitor.Nunc
                scelerisque tincidunt elit. Vestibulum non mi ipsum.{" "}
                <span className="content">
                  Cras pretium suscipit tellus sit amet aliquet. Vestibulum
                  maximus lacinia massa non porttitor.Nunc scelerisqueNunc
                  scelerisque tincidunt elit. Vestibulum non mi ipsum. Cras
                  pretium{" "}
                </span>
                <a
                  title="View More"
                  className="show_hide"
                  data-content="toggle-text"
                  href
                >
                  view More
                </a>
              </p>
              <div id="slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <a href className="postpic">
                      <img src={post1} alt="" />
                    </a>
                  </div>
                  <div className="carousel-item">
                    <a href className="postpic">
                      <img src={post1} alt="" />
                    </a>
                  </div>
                  <div className="carousel-item">
                    <a href className="postpic">
                      <img src={post1} alt="" />
                    </a>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#slider"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="fas fa-angle-left fa-2x"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#slider"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="fas fa-angle-right fa-2x"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
              <ul className="likecomment">
                <li>
                  <i className="likeicon">
                    <img src={like} alt="" />
                  </i>
                  <span>20</span>
                </li>
                <li>
                  <span>1 Comment</span>
                </li>
              </ul>
              <ul className="row text-center post-social">
                <li className="col">
                  <div className="likedrop">
                    <i className="far fa-thumbs-up" />
                    Like
                  </div>
                  <ul className="likedropdown">
                    <li>
                      <a>
                        <i className>
                          <img src="images/like.png" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/happy.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/heart-red.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/light-bulb.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/angry.svg" alt />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className>
                          <img src="images/shocked.svg" alt />
                        </i>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="col">
                  <i className="far fa-comment" />
                  Comment
                </li>
                <li className="col">
                  <i className="fas fa-share" />
                  Share
                </li>
                <li className="col">
                  <i className="fas fa-envelope" />
                  Message <span>Privately</span>
                </li>
              </ul>
            </div>
            <div className="postfooter">
              <ul>
                <li>
                  <i className="pficon">
                    <img src={user_pic_2} alt="" />
                  </i>
                  <div style={{background:"#ececec", "borderRadius":"20px", display:"flex", justifyContent:"space-between", flexWrap:"nowrap", padding:"0 10px"}}>
                  <input
                    type="text"
                    name
                    placeholder="Write a comment.."
                    className="textemoji"
                    id="prem"
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    style={{ border:"none", background:"transparent", outline:"none",width:"100%" , height:"32px", "minHeight":"20px", padding:"6px 0" }}
                  />
                  <div onClick={onReactionClick}>
                <i
                  className=""
                  aria-hidden="true"
                  style={{ fontSize: 22, color: "#36b9e0" }}
                />
                <span style={{cursor:"pointer"}} >😊</span>
              </div>
              {reactionShown && (
                <div className="reactions">
                  <Picker 
                  style={{ position: 'absolute', bottom: '35px', right: '10px' }}
                  showPreview={false} 
                  showSkinTones={false} 
                  onSelect={handleEmojiSelect}
                  />
                </div>
              )}
                  </div>
                </li>
              </ul>
                <br />
              {/* emoji */}
              

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
