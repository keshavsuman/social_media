import React from "react"
import SideBarMenu from "./SideBarMenu"


const SideBar = () => {
    return (
        <div>
            <input type="checkbox" id="nav-toggle" />
            <div className="sidebar">
                <div className="sidebar-brand">
                    <h2>
                        <span className="lab la-accusoft"></span>
                        <span>Accusoft</span>
                    </h2>
                </div>
                    <SideBarMenu />
            </div>
        </div>
    )
}

export default SideBar;