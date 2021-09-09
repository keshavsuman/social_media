import React, { useState } from "react";
import style from "../../static/css/login.module.css";
import validateForm from "../../utils/formVaidations/loginForm";
import BounceLoader from "react-spinners/BounceLoader";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer } from "react-toastify";
import showToast from "../../utils/toast/toast";
import {Link,useHistory} from "react-router-dom"

 import {adminLogin} from "../../services/userservices/user.admin.services" 

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
  const SubmitForm = async (event) => {
    var result = validateForm(email, password);
    if (!result.email && !result.password) {
      
      setErrorMessage({ emailError: "", passwordError: "" });
      event.preventDefault();
      setloadingStatus(true);
      var response = await adminLogin(email, password);
      console.log('response', response)
      setloadingStatus(1);
      if (response.status === 200) {
        showToast(response.message, "success");
        localStorage.setItem('access_token', response.data.token)
        history.push("/home")
      } else {
        showToast(response.message, "error");
      }
    } else {
      setErrorMessage(result.errorMessage);
      setCheckForm(result);
    }
  };

  return (
    <>
      <div className="container" style={{height:"100vh"}}>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-xs-12"></div>
          <div className="col-sm-4 col-md-4 col-xs-12">
            <div className={style.Form_container}>
              <h4 className={style.signin_heading}>Welcome</h4>
              <h4 className={style.heading}> Login To Your Account </h4>
              <form className="ln-form">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control ln-input email"
                    id="exampleInputEmail1"
                    placeholder="Enter your email"
                    style={{ marginBottom: "15px", marginTop: "35px" }}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <div className={style.errors}>
                    {checkForm.email ? (
                      <label>{errorMessage.emailError}</label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control  ln-input password"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    style={{ marginBottom: "15px" }}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className={style.errors}>
                    {checkForm.password ? (
                      <label>{errorMessage.passwordError}</label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div style={{ textAlign: "end" }}>
                  <Link to="/forgotPassword" className={style.foget_password_link}>
                    Forgot password?
                  </Link>
                </div>
                <br />
                <br />

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    type="button"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "700",
                      backgroundColor: "#6c757d",
                      padding: "10px",
                    }}
                    onClick={SubmitForm}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-xs-12"></div>
        </div>
      </div>
      <ToastContainer />
      </>
  );
};

export default Login;
