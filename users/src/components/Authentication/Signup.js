import React, { useState, useEffect } from "react";
import "../../static/styles/style.css";
import logo from "../../static/image/Younity Logo.png";
import male from "../../static/image/male.svg";
import female from "../../static/image/female.svg";
import facebook from "../../static/image/facebook.png";
import linkedin from "../../static/image/linkedin.png";
import showToast from "../../utils/toast/toast";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import Select from "react-select";
import validator from 'validator';
import {
  getStates,
  getHomeTown,
  userSignup,
} from "../../services/userservices/user.services";

let statesOption = [];
let homeTown = [];


const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  gender: "",
  dob: "",
  state: "",
  home_town: "",
};

const Signup = () => {
  document.title = `Younity Signup`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStates();
        setStates(data.data.states);
        for (let i = 0; i < data.data.states.length; i++) {
          statesOption.push({
            label: data.data.states[i].name,
            value: data.data.states[i].id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const history = useHistory();

  const [isSelectedState, setIsSelectedState] = useState(true);
  const [loadingStatus, setloadingStatus] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [Create_Password, setCreate_Password] = useState("");
  const [Confirm_Password, setConfirm_Password] = useState("");
  const [user, setUser] = useState(initialValues);
  const {
    first_name,
    last_name,
    email,
    mobile,
    gender,
    dob,
    state,
    home_town,
  } = user;

  const onValueChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const addUser = (event) => {
    event.preventDefault();
    console.log(user);
  };

  const setSelectedState = async (event) => {
    try {
      console.log(event);
      console.log("DATA");
      const homeTowns = await getHomeTown(event.value);
     console.log(homeTowns.data.cities);
      setUser({ ...user, state: event.label });
     // setCities(event.label);
      
      //console.log(cities);
      for (let index = 0; index < homeTowns.data.cities.length; index++) {
        homeTown.push({
          label: homeTowns.data.cities[index].name,
          value: homeTowns.data.cities[index].id,
        });
      }
      console.log(homeTown);
    } catch (error) {
      console.log(error);
    }
    setIsSelectedState(false);
  };

  const setSelectedHomeTown = async (event) => {
    setUser({ ...user, home_town: event.label });
  };

  const submitSignup = async (event) => {
    event.preventDefault();
    let errorCount = 0;
    if(!user.mobile.match(/^\d{10}$/)){
      errorCount++;
      showToast("Mobile number is not valid", "error");
    }
    if(!user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      errorCount++;
      showToast("Enter Valid Email", "error");
    }
    if (Confirm_Password !== Create_Password) {
      errorCount++;
      showToast("Password does not Match", "error");
    } 
    if(errorCount === 0) {
      user.password = Create_Password;
      setloadingStatus(true);
      const res = await userSignup(user);
      setloadingStatus(false);
      if (res.statusCode === 200) {
        showToast(res.message, "success");
        history.push("/login");
      } else {
        showToast(res.message, "error");
      }
    }
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  const setGender = (event) => {
    setUser({ ...user, gender: event.target.value });
  };

  return (
    <LoadingOverlay
      active={loadingStatus}
      fadeSpeed={200}
      spinner={<BounceLoader color="#FFF" />}
    >
      <div className="bgBanner">
        <div className="centerBox">
          <div className="formWrapper" style={{ height: "560px" }}>
            <div className="logo">
              <img src={logo} alt="logo" className="img-fluid" />
              <p>BE ONE OF US!</p>
            </div>
            <form onSubmit={submitSignup}>
              <div className="inputWrapper">
                <div className="inputFields">
                  <div className="inputBox">
                    <input
                      type="text"
                      name="first_name"
                      required
                      value={first_name}
                      onChange={(event) => onValueChange(event)}
                    />
                    <label>First Name</label>
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      name="last_name"
                      required
                      value={last_name}
                      onChange={(event) => onValueChange(event)}
                    />
                    <label>Last Name</label>
                  </div>
                </div>
                <div className="inputFields">
                  <div className="inputBox">
                    <input
                      type="text"
                      name="email"
                      required
                      value={email}
                      onChange={(event) => onValueChange(event)}
                    />
                    <label>Email</label>
                  </div>
                  <div className="inputBox">
                    <div>
                      <input
                        type="text"
                        value={mobile}
                        name="mobile"
                        onChange={(event) => onValueChange(event)}
                        required
                        maxLength={10}
                      />
                      <label>Mobile No.</label>
                    </div>
                  </div>
                </div>
                <div className="inputFields">
                  <div className="inputBox">
                    <input
                      type="radio"
                      name="Gender"
                      id="Male"
                      value="Male"
                      onClick={setGender}
                    />
                    <img src={male} alt="male" className="img-fluid genImg" />
                    <input
                      type="radio"
                      name="Gender"
                      id="Female"
                      value="Female"
                      onClick={setGender}
                    />
                    <img
                      src={female}
                      alt="Female"
                      className="img-fluid genImg"
                    />
                    <input
                      type="radio"
                      name="Gender"
                      id="Other"
                      value="Other"
                      onClick={setGender}
                    />
                    <p>Other</p>
                  </div>
                  <div className="inputBox">
                    <input
                      type="date"
                      name="dob"
                      value={dob}
                      onChange={(event) => onValueChange(event)}
                    />
                    <label>D.O.B.</label>
                  </div>
                </div>
                <div className="inputFields">
                  <div className="inputBox">
                    <Select
                      onChange={setSelectedState}
                      options={statesOption}
                      width='50px'
                      placeholder="States"
                      className="statess"
                    />

                    {/* <select
                      class="floating-select"
                      required
                      onChange={setSelectedState}
                     data-live-search="true"
                    >
                      <option value=""></option>
                      {states?.map((item) => {
                        return (
                          <option value={item.id + "," + item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select> */}
                    {/* <label>State</label> */}
                  </div>
                  <div className="inputBox">
                    <Select
                      onChange={setSelectedHomeTown}
                      placeholder="Hometown"
                      options={homeTown}
                      className="statess"
                    />

                    {/* <select
                      className="floating-select"
                      required
                      disabled={isSelectedState}
                      onChange={setSelectedHomeTown}
                    >
                      <option value=""></option>
                      {cities?.map((item) => {
                        return <option value={item.name}>{item.name}</option>;
                      })}
                    </select> */}
                    {/* <label>home town</label> */}
                  </div>
                </div>
                <div className="inputFields">
                  <div className="inputBox">
                    <input
                      type="password"
                      name="Create_Password"
                      required
                      value={Create_Password}
                      onChange={(event) =>
                        setCreate_Password(event.target.value)
                      }
                    />
                    <label>Create Password</label>
                  </div>
                  <div className="inputBox">
                    <input
                      type="password"
                      name="Confirm_Password"
                      required
                      value={Confirm_Password}
                      onChange={(event) =>
                        setConfirm_Password(event.target.value)
                      }
                    />
                    <label>Confirm Password</label>
                  </div>
                </div>
                <div className="signupBtnWrapper">
                  <div className="signBtn">
                    <input type="submit" defaultValue="Sign Up" />
                  </div>
                </div>
              </div>
            </form>
            <p className="or">Or</p>
            <div className="socialLoginWrapper">
              <div className="socialLoginBtn">
                <button id="Facebook">
                  <img src={facebook} alt="facebook" className="img-fluid" />
                  <FacebookLogin
                    textButton="Continue with Facebook"
                    id="Facebook"
                    appId="873136866888868"
                    // autoLoad={true}
                    fields="first_name,last_name,email,picture"
                    callback={responseFacebook}
                  />
                </button>
                <button id="LinkedIn">
                  <img src={linkedin} alt="LinkedIn" className="img-fluid" />
                  Continue with LinkedIn
                </button>
              </div>
            </div>
            <p className="already">
              Already have an account ?{" "}
              <span>
                <Link to="/login">Sign in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Signup;
