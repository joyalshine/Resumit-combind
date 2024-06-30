import React from 'react'
import './Projects.css'

function Projects({ data }) {
    let screenWidth = window.innerWidth;
    console.log(data)
    return (
        <div className='projects-root' id='projects'>
            <div className="title">
                <h6>PROJECTS</h6>
                <h4>Each project is a unique piece of development 🧩</h4>
            </div>
            <div className="project-container conatiner-fluid center-div">
                {data.map((project) => {
                    return (
                        <div className="project-item row  w-full md:w-4/6">
                            <div className="project-desc-right">
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                                <div className='project-stack'>
                                    {project.techStack.map((tech) => <p className='m-1'>{tech}</p>)}
                                </div>
                                <div className="links">
                                    {project.github ? <a href={project.github} target="_blank" rel="noreferrer">Code<i className="fa-brands fa-github "></i></a> : <></>}
                                    {project.figma ? <a href={project.figma} target="_blank" rel="noreferrer">Figma<i className="fa-brands fa-figma"></i></a> : <></>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Projects
