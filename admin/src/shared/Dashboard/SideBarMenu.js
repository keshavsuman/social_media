import React from "react"
import { Link,useLocation,useHistory } from 'react-router-dom'

const SideBarMenu = () => {
   const location = useLocation();

   //destructuring pathname from location
   const { pathname } = location;
   const history = useHistory();

   //Javascript split method to get the name of the path in array
   const splitLocation = pathname.split("/");
   const logout = ()=> {

      localStorage.clear()
    
      history.push({
         pathname:  "/login",
         state: {
           
         } 
      });
      
      window.location.reload();
   }
   if (localStorage.getItem('role')==='superadmin'){
    return (
       
        <div className="sidebar-menu">
         <ul style={{paddingLeft:'0rem'}}>
            <li className={splitLocation[1] === "" ? "active" : ""}>
               <Link to="/">
                  <span className="las la-home"></span>
                  <span>Dashboard</span>
               </Link>
            </li>
            <li className={splitLocation[1] === "admin-management" ? "active" : ""}>
               <Link to="/admin-management">
                  <span className="las la-user-circle"></span>
                  <span>Admin Management</span>
               </Link>
            </li>
            <li className={splitLocation[1] === "universities-management" ? "active" : ""}>
               <Link to="/universities-management">
                  <span className="las la-university"></span>
                  <span>University</span>
               </Link>
            </li>
            <li className={splitLocation[1] === "collages-management" ? "active" : ""}>
               <Link to="/collages-management">
                  <span className="las la-chalkboard-teacher"></span>
                  <span>Colleges</span>
               </Link>
            </li>
            <li className={splitLocation[1] === "courses-management" ? "active" : ""}>
               <Link to="/courses-management">
                  <span className="las la-school"></span>
                  <span>Courses</span>
               </Link>
            </li>

            <li className={splitLocation[1] === "skills-management" ? "active" : ""}>
               <Link to="/skills-management">
                  <span className="las la-graduation-cap"></span>
                  <span>Skills</span>
               </Link>
            </li>
            <li className={splitLocation[1] === "interests-management" ? "active" : ""}>
               <Link to="/interests-management">
                  <span className="las la-briefcase"></span>
                  <span>Interests</span>
               </Link>
            </li>
            <li className={splitLocation[1] === "user-management" ? "active" : ""}>
               <Link to="/user-management">
                  <span className="las la-user-tag"></span>
                  <span>User Management</span>
               </Link>
            </li>

            <li onClick={logout}>
               <Link >
                  <span className="las la-power-off"></span>
                  <span>Logout</span>
               </Link>
            </li>

         </ul>
      </div>
    )
}else {
   return (
      <div className="sidebar-menu">
       <ul style={{paddingLeft:'0rem'}}>
          <li className={splitLocation[1] === "" ? "active" : ""}>
             <Link to="/">
                <span className="las la-home"></span>
                <span>Dashboard</span>
             </Link>
          </li>
          
          <li className={splitLocation[1] === "universities-management" ? "active" : ""}>
             <Link to="/universities-management">
                <span className="las la-university"></span>
                <span>University</span>
             </Link>
          </li>
          <li className={splitLocation[1] === "collages-management" ? "active" : ""}>
             <Link to="/collages-management">
                <span className="las la-chalkboard-teacher"></span>
                <span>Colleges</span>
             </Link>
          </li>
          <li className={splitLocation[1] === "courses-management" ? "active" : ""}>
             <Link to="/courses-management">
                <span className="las la-school"></span>
                <span>Courses</span>
             </Link>
          </li>

          <li className={splitLocation[1] === "skills-management" ? "active" : ""}>
             <Link to="/skills-management">
                <span className="las la-graduation-cap"></span>
                <span>Skills</span>
             </Link>
          </li>
          <li className={splitLocation[1] === "interests-management" ? "active" : ""}>
             <Link to="/interests-management">
                <span className="las la-briefcase"></span>
                <span>Interests</span>
             </Link>
          </li>
          <li className={splitLocation[1] === "user-management" ? "active" : ""}>
             <Link to="/user-management">
                <span className="las la-user-tag"></span>
                <span>User Management</span>
             </Link>
          </li>

          <li onClick={logout}>
               <Link >
                  <span className="las la-power-off"></span>
                  <span>Logout</span>
               </Link>
            </li>


       </ul>
    </div>
  )














}

}

export default SideBarMenu;