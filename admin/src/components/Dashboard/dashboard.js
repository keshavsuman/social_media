import Dashboard from './DashboardComponents/Dashboard';
import React from "react"
import SideBarMenu from '../../shared/Dashboard/SideBarMenu';
import DashboardHeader from '../../shared/Dashboard/DashboardHeader';
import logo from "../../static/images/Younity Logo.png"

function DashboardComponent() {
  
    return (
      <div className="wrapper">
         <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h3>
            <span className="lab la-accusoft"></span> &nbsp;&nbsp;
            <span>Social Media</span>
          </h3>
        </div>
        <SideBarMenu />
      </div>
      <div className="main-content">
        <DashboardHeader /><br/><br/><br/><br/><br/>
        <Dashboard />
        </div>
      </div>
    );
  }
  
export default DashboardComponent;
  