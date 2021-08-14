import React, {useState} from 'react';
import style from "../../static/css/login.module.css";
// import validateForm from "../../utils/formVaidations/loginForm";
import BounceLoader from "react-spinners/BounceLoader";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer } from "react-toastify";
import showToast from "../../utils/toast/toast";
import validator from 'validator';

 import {forgotPassword} from "../../services/userservices/user.admin.services"

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loadingStatus, setloadingStatus] = useState(false);
    const [emailError, setEmailError] = useState('')

  const validateEmail = async (event) => {
      if(validator.isEmpty(email)){
          setEmailError("Please enter the email");
      }
      else if(validator.isEmail(email)){
          setloadingStatus(true);
          var response = await  forgotPassword(email);
          setloadingStatus(false);
          if(response.statusCode === 200){
            showToast(response.message, "success");
          }else{
            showToast(response.message, "error");
          }
      }
      else {
          setEmailError('Enter Valid Email');
      }
  }
  



    return (
        <LoadingOverlay
      active={loadingStatus}
      fadeSpeed={200}
      spinner={<BounceLoader color="#FFF" />}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-4 col-xs-12"></div>
          <div className="col-sm-4 col-md-4 col-xs-12">
            <div className={style.Form_container}>
              <h4 className={style.signin_heading}>Forgot Password</h4>
            

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
                    {/* {checkForm.email ? (
                      <label>{errorMessage.emailError}</label>
                    ) : (
                      ""
                    )} */}
                    {emailError}
                  </div>
                </div>
                 
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
                    onClick={validateEmail}
                  >
                    Forgot Password
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-xs-12"></div>
        </div>
      </div>
      <ToastContainer />
    </LoadingOverlay>
    );
}


export default ForgotPassword