import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import profile_photo from "../../static/image/profile-photo.jpg";
import verified from "../../static/image/verified.svg";
import Header from './Header';
import { myProfile } from "../../services/userservices/user.services";

const UserCover =(props) => {
    const [userName, setUserName] = useState("")
    const [collegeYear, setCollegeYear] = useState("")
    const [bio, setBio] = useState("")
    const [college, setCollege] = useState("")
    const [course, setCourse] = useState("")
    const [profile_photos, setProfile] = useState("")
    useEffect(() => {
    const fetch = async() => {
        try{
            const data = await myProfile();
            console.log(data.data.user);
            setUserName(data.data.user.first_name + " "+ data.data.user.last_name);
            setCollegeYear(data.data.user.college_year);
            setBio(data.data.user.bio)
            setCollege(data.data.user.college)
            setCourse(data.data.user.course)
            setProfile(data.data.user.profile_pic)
        } catch(error) {
            console.log(error);
        }
    }
    fetch();
    })
    
    return (
        <div>
      {/* <Header name={userName} /> */}
        <section className="coverphoto">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 text-center">
              <div className="coverbox">
                <div className="photodata">
                  <i className="profilephoto">
                    <img src={profile_photos !=null ?profile_photos :   profile_photo} />
                  </i>
                  {/* <Link to="/editUserProfile" className="gbutton" title="Edit Profile">
                    Edit Profile
                  </Link> */}
                </div>
                <div className="coverdata">
                  <ul className="row bio-name">
                    <li className="col-xs-12 col-lg-7">
                      <h1>
                        {userName}
                      <Link to="/editUserProfile/" title="Edit Profile">
                        <img src={verified} className="mverified" />
                        </Link>
                      </h1>
                    </li>
                    <li className="col-xs-12 col-lg-5 text-right m-none">
                      <Link to="/editUserProfile/" title="Edit Profile" className="g-button">
                        Edit Profile
                      </Link>
                      <Link to="/editUserProfile/" title="Edit Profile">
                      <img src={verified} alt="" />
                      </Link>
                    </li>
                  </ul>
                  <ul className="bio">
                    <li>{collegeYear}</li>
                    <li>{course}</li>
                    <li>{college}</li>
                  </ul>
                  <ul className="bio-social">
                    <li>
                      <span className="count">109</span>
                      <p>Posts</p>
                    </li>
                    <li>
                      <span className="count">1.5M</span>
                      <p>Followers</p>
                    </li>
                    <li>
                      <span className="count">90k</span>
                      <p>Connections</p>
                    </li>
                  </ul>
                  <p className="para">
                    {bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}

export default UserCover
