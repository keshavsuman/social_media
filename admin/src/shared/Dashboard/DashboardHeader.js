import React from "react"
import { Link,useLocation ,useHistory} from 'react-router-dom'


const DashboardHeader = () => {
   const history = useHistory();

   const logout = ()=> {

      localStorage.clear()
    
      history.push({
         pathname:  "/login",
         state: {
           
         } 
      });
      
      window.location.reload();
   }

    return (
       
        <header className="header">
         <div className="header-title">
            <h1>
               <label htmlFor="nav-toggle">
                  <span className="las la-bars" style={{color:"#313a46"}}></span>
               </label>
            </h1>       
         </div>
         <div className="user-wrapper">
            <img src="https://image.shutterstock.com/image-vector/krishna-260nw-313359437.jpg" alt="user" />
            <div>
               <h4 style={{margin:"0px"}}>{localStorage.getItem('username')}</h4>
               <small>{localStorage.getItem('role')}</small>
            </div>          
         </div>
      </header>
    )
}

export default DashboardHeader;