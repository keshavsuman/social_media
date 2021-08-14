import React, { useState } from "react";
import "../../static/styles/style.css";
import logo from "../../static/image/Younity Logo.png";
import facebook from "../../static/image/facebook.png";
import linkedin from "../../static/image/linkedin.png";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { Link } from "react-router-dom";
import validateForm from "../../utils/formVaidations/loginForm";
import showToast from "../../utils/toast/toast";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { getUserData, setUserData } from "../../utils/Auth/token_utils";
import {socialLogin, userLogin} from "../../services/userservices/user.services";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingStatus, setloadingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    emailError: "",
    passwordError: "",
  });
  const [checkForm, setCheckForm] = useState({
    email: false,
    password: false,
  });

  const responseFacebook = async (response) => {
    if(response !== undefined){
      const userData = {
        email: response.email,
        name: response.name,
        profile_pic: response.picture.data.url,
        provider_id: response.id,
        provider_type: response.graphDomain,
      };
      const result = await socialLogin(userData);
      if(result.data.statusCode === 200){
        if (result.data.data.user_data.profile_setup === true){
          history.push('/userProfile');
        }else{
          history.push('/questions');
        }
      }
    }
  };

  const submitRecord = async (event) => {
    event.preventDefault();
    const validation_result = validateForm(email, password);
    if (!validation_result.email && !validation_result.password) {
      setErrorMessage({ emailError: "", passwordError: "" });
      event.preventDefault();
      setloadingStatus(true);
      const res = await userLogin(email, password);
      setloadingStatus(false);
      if (res.statusCode === 200) {
        showToast(res.message, "success");
        setUserData(res.data.user_data);
        if (res.data.user_data.profile_setup === true)
          history.push("/userProfile");
        else history.push("/questions");
      } else {
        showToast(res.message, "error");
      }
    } else {
      setErrorMessage(validation_result.errorMessage);
      setCheckForm(validation_result);
    }
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
            <div className="heading">
              <h3>LOGIN</h3>
            </div>
            <form onSubmit={submitRecord} method="POST">
              <div className="quesInputWrapper">
                <div className="fullWidthInputBox">
                  <div className="inputFields">
                    <div className="inputBox fullInputBox">
                      <input
                        type="text"
                        name="EMAIL"
                        id="EMAIL"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <label>EMAIL</label>
                    </div>
                    <div className="errors">
                      {checkForm.email ? (
                        <label>{errorMessage.emailError}</label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="inputFields">
                    <div className="inputBox fullInputBox">
                      <input
                        type="password"
                        name="PASSWORD"
                        id="PASSWORD"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <label>PASSWORD</label>
                    </div>
                    <div className="errors">
                      {checkForm.password ? (
                        <label>{errorMessage.passwordError}</label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="forgot">
                  <Link to="/resetPassword">Forgot Password?</Link>
                </div>
                <div className="signupBtnWrapper nextBtnWrapper signinBtn">
                  <div className="signBtn">
                    <input type="submit" value="SIGN IN" />
                  </div>
                </div>
              </div>
            </form>
            <p className="loginWith">LOGIN WITH</p>
            <div className="socialLoginWrapper">
              <div className="socialLoginBtn">
                <button id="Facebook">
                  <img src={facebook} alt="facebook" className="img-fluid" />
                  <FacebookLogin
                    textButton="Continue with Facebook"
                    id="Facebook"
                    appId="3034804916764002"
                    // autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                  />
                </button>
                {/* <button id="Facebook">
                                    <img src={facebook} alt="facebook" className="img-fluid" />
                                    Continue with Facebook
                                </button> */}
                <button id="LinkedIn">
                  <img src={linkedin} alt="LinkedIn" className="img-fluid" />
                  Continue with LinkedIn
                </button>
              </div>
            </div>
            <p className="already">
              Don't have an account ?
              <span>
                &nbsp; <Link to="/signup">Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Login;
