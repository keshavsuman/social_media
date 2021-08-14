import React from "react";
import DashboardHeader from "../../shared/Dashboard/DashboardHeader";
import SideBarMenu from "../../shared/Dashboard/SideBarMenu"

const Dashboard = () => (
    <div>
        <input type="checkbox" id="nav-toggle" />
            <div class="sidebar">
                <div class="sidebar-brand">
                    <h3>
                        <span class="lab la-accusoft"></span> &nbsp;&nbsp;
                        <span>Social Media</span>
                    </h3>
                </div>
                    <SideBarMenu />
            </div>
        <div class="main-content">
            <DashboardHeader />
            <main>
               <div class="dashboard-cards">
                  <div class="card-single">
                     <div>
                        <h2>54</h2>
                        <span>Customers</span>
                     </div>
                     <div>
                        <span class="las la-user"></span>
                     </div>
                  </div>
                  <div class="card-single">
                     <div>
                        <h2>54</h2>
                        <span>Customers</span>
                     </div>
                     <div>
                        <span class="las la-user"></span>
                     </div>
                  </div><div class="card-single">
                     <div>
                        <h2>54</h2>
                        <span>Customers</span>
                     </div>
                     <div>
                        <span class="las la-user"></span>
                     </div>
                  </div><div class="card-single">
                     <div>
                        <h2>54</h2>
                        <span>Income</span>
                     </div>
                     <div>
                        <span class="lab la-google-wallet"></span>
                     </div>
                  </div>
               </div>
            </main>
        </div>
    </div>
)

export default Dashboard;