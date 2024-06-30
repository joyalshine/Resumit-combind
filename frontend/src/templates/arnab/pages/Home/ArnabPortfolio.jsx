import React from 'react'
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "../../components";

import './ArnabPortfolio.css'

function ArnabPortfolio({ portfolioDetails }) {
  console.log(portfolioDetails.about)
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar  data={portfolioDetails.basicDetails}/>
        <Hero data={portfolioDetails.basicDetails} />
      </div>
      <About data={{
        about : portfolioDetails.about,
        roles : portfolioDetails.skillDetailsArray.roles
      }}/>
      <Experience  data={portfolioDetails.experienceArray}/>
      <Tech data={portfolioDetails.skillDetailsArray.skills}/>
      <Works data={portfolioDetails.projectArray}/>
      <div className="relative z-0">
        <Contact data={portfolioDetails.basicDetails}/>
        <StarsCanvas />
      </div>
    </div>
  )
}

export default ArnabPortfolio
