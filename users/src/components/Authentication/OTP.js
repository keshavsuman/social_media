import React from 'react'
import logo from "../../static/image/Younity Logo.png"

const OTP = () => {
    return (
        <div className="bgBanner">
        <div className="centerBox">
            <div className="formWrapper">
                <div className="logo">
                    <img src={logo} alt="logo" className="img-fluid" />
                    <p>BE ONE OF US!</p>
                </div>
                <div className="heading">
                    <h3>Enter Verification Code</h3>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                </div>
               <form action="#">
                   <div className="otpWrapper">
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                   </div>
                   <div className="resendCode">
                    <p>Resend Code</p>
                   </div>
                   <div className="verifyBtn">
                       <input type="submit" value="Verify" />
                   </div>
               </form>
            </div>
        </div>
        
    </div>
    )
}

export default OTP
