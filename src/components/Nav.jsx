import React from 'react'
import "./nav.scss"
import {  RiAppleFill, RiWifiLine } from "@remixicon/react";
import DateTime from './DateTime';

const Nav = () => {
  return (
    <nav>
        <div className="left">
            <div className="apple-icon nav-item no-underline">
                <RiAppleFill size={20} color='white'/>
            </div>

            <div className="nav-item no-underline">
                <p>Pavan Kumar Reddy Dantu</p>
            </div>
            {/* <div className="nav-item">
                <p>File</p>
            </div>
            <div className="nav-item">
                <p>Window</p>
            </div>
            <div className="nav-item">
                <p>Terminal</p>
            </div> */}
        </div>
        <div className="right">
            <div className="nav-icon no-underline">
                <RiWifiLine size={20}/>
            </div>
            <div className="nav-item no-underline">
                <DateTime />
            </div>
        </div>
    </nav>
  )
}

export default Nav