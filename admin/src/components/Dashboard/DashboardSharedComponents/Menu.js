import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import "../../../static/css/dashboard.css"


export default class Menu extends Component {
    render() {
        return (
          <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">Alexander Pierce</a>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
          <li className="nav-item has-treeview menu-open">
          <NavLink to="/home" exact activeClassName="current" id="navlink">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
              </p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-management" exact activeClassName="current" id="navlink">
              <i className="nav-icon fas fa-user" />
              <p>
                User Management
              </p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/universities-management" exact activeClassName="current" id="navlink">
              <i className="nav-icon fas fa-university" />
              <p>
                University
              </p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/collages-management" exact activeClassName="current" id="navlink">
              <i className="nav-icon fas fa-school " />
              <p>
                Colleges
              </p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/skills-management" exact activeClassName="current" id="navlink">
              <i className="nav-icon fas fa-graduation-cap" />
              <p>
                Skills
              </p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/interests-management" exact activeClassName="current" id="navlink">
              <i className="nav-icon fas fa-briefcase" />
              <p>
                Interests
              </p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/year-management" exact activeClassName="current" id="navlink">
              <i className="nav-icon fas fa-calendar" />
              <p>
                Year
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
</div>

        )
    }
}
