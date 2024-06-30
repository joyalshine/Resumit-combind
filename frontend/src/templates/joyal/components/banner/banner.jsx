import React from 'react'
import './banner.css'

function Banner({ data }) {
    return (
        <div className='home_hero' id='home'>
            <div className='flex flex-col-reverse md:flex-row  home_hero_row'>
                <div className="w-full md:w-1/2 welcome_div order-1">
                    <div className='width_control'>
                        <span>
                            <h1>Full Stack Developer<img src="https://stefantopalovicdev.vercel.app/static/media/waving.1bae5fcfb51082b5c2b4.png" width={50} alt="" /></h1>
                        </span>
                        <span>
                            <p>Hi, I'm {data.name}. A passionate Full Stack Web and App Developer. Eager to learn more 📍</p>
                        </span>
                        <div>
                            <span>
                                <a href={data.linkedin} target="_blank" rel="noreferrer">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </span>
                            <span>
                                <a href={data.github} target="_blank" rel="noreferrer">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 welcome_gif order-2">
                    {data.image ?
                        <div className='hero-image'>
                        </div> :
                        <div>
                            <img src="https://themewagon.github.io/satner/img/banner/home-right.png" className='hero-image-user' alt="" srcset="" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Banner
