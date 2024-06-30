import React from 'react'
import Hero from '../../components/Hero/Hero'
import AboutUs from '@/components/AboutUs/AboutUs'
import Features from '@/components/features/Features'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/NavBar/NavBar'
import Template3Home from '@/templates/template_3/Template3Home'
import Template4Home from '@/templates/template_4/Template4Home'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Features />
      <Footer />
    </>
  )
}

export default Home
