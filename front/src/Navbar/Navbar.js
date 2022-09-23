import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./NavbarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <div className="navbar">
          <Link to="#">
            <FaIcons.FaBars onClick={showSidebar} style={{color: "white", marginLeft: "2rem",
            fontSize: "2rem"}}/>
          </Link>
          
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#">
                <AiIcons.AiOutlineClose  style={{color: "white", marginLeft: "1rem",
            fontSize: "1.3rem"}}/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Dashboard;
