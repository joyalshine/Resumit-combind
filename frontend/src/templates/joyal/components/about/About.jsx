import React from 'react'
import './About.css'

function About({data}) {
  return (
    <div className='about-parent container-fluid' id='about'>
        <div className="flex flex-col md:flex-row align-start gap-x-10">
            <div className="md:w-1/2 img-main-div">
                <div className="img-div">
                    <img className='main-about-img' src="https://stefantopalovicdev.vercel.app/static/media/about-img.62b47e7f183d4b4e9feb.webp" alt="" />
                    <img className='rotating-inner' src="https://stefantopalovicdev.vercel.app/static/media/working-emoji.c5325f52b5be329995a5.png" alt="" />
                    <span>
                        <img className='rotating-outer' src="https://stefantopalovicdev.vercel.app/static/media/text2.3d5aa6ba2d0632bb4e0572631c3f9dc2.svg" alt="" />
                    </span>
                </div>
            </div>
            <div className="md:w-1/2 about-p">
                <h6>ABOUT ME</h6>
                <h5>Tech Enthusiast | App, Front-end, and Back-end Development 📍</h5>
                <p>{data}</p>
            </div>
        </div>
    </div>
  )
}

export default About
