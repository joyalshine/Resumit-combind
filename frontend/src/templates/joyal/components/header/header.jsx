import React, { useState } from "react";
import './header.css'

function Header({data}) {
  const [navBar, setNavBar] = useState("mobile-nav closed-menu")
  function openNav(){
    setNavBar("mobile-nav")
  }
  function closeNav(param){
    if(param != null){
      const element = document.getElementById("mob-nav-cross");
      element.click();
      const element1 = document.getElementById(param);
      element1.click();
      setNavBar("mobile-nav closed-menu")
    }
    else{
      setNavBar("mobile-nav closed-menu")
    }
  }
  return <header className="header_bar">
    <h3 className="name">{data.name}</h3>
    <nav className="nav_links">
      <ul className="nav_link_list">
        <li className="nav_link">
          <a href="#home" id="home-nav">
            Home
          </a>
        </li>
        <li className="nav_link">
          <a href="#about"  id="about-nav">
            About
          </a>
        </li>
        <li className="nav_link" id="projects-nav">
          <a href="#projects">
            Projects
          </a>
        </li>
        <li className="nav_link" id="contact-nav">
          <a href="#contact">
            Conatcts
          </a>
        </li>
        <li className="nav_link mobile-nav-div">
          <i className="fa-solid fa-bars-staggered" id="mobile-nav-btn" onClick={openNav}></i>
        </li>
      </ul>
    </nav>
    <div className={navBar} bis_skin_checked="1">
      <span>
        <i className="fa-solid fa-xmark" id="mob-nav-cross"  onClick={() => closeNav(null)}></i>
      </span>
      <ul className="mobile_nav_list">
        <li>
          <a href="#home" onClick={() => closeNav("home-nav")}>Home</a>
        </li>
        <li>
          <a href="#about" onClick={() => closeNav("about-nav")}>About</a>
        </li>
        <li>
          <a href="#projects" onClick={() => closeNav("projects-nav")}>Projects</a>
        </li>
        <li>
          <a href="#contact" onClick={() => closeNav("contact-nav")}>Contact</a>
        </li>
      </ul>
    </div>
  </header>;
}

export default Header;
