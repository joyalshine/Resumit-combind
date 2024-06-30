import React from "react";
import "./home.css";
import Header from "../../components/header/header"
import Banner from '../../components/banner/banner'
import Skills from "../../components/skills/Skills";
import About from "../../components/about/About";
import Projects from "../../components/projects/Projects";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";

function JoyalPortfolio({portfolioDetails}) {

  return <div className="main-background">
    <Header data={portfolioDetails.basicDetails}/>
    <Banner data={portfolioDetails.basicDetails}/>
    <Skills data={portfolioDetails.skillDetailsArray}/>
    <About data={portfolioDetails.about}/>
    <Projects data={portfolioDetails.projectArray}/>
    <Contact data={portfolioDetails.basicDetails}/>
    <Footer data={portfolioDetails.basicDetails}/> 
  </div>;
}

export default JoyalPortfolio;
