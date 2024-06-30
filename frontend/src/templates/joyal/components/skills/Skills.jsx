import React from 'react'
import './Skills.css'

function Skills({ data }) {
    return (
        <div className='skills-parent container-fluid' id="skills">
            <div className='child'>
                {data.frontend.length != 0 ? <div className="skill-set flex flex-col sm:flex-row  m-3">
                    <div className="stack-title w-full sm:w-[14vw]">
                        <div className="">
                            <h5>Front-End</h5>
                        </div>
                    </div>
                    <div className="stack-items w-full sm:w-auto sm:ml-5">
                        <div className="stack-items-innerDiv flex flex-wrap justify-center gap-4">
                            {data.frontend.map((skill) => {
                                return (
                                <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2">
                                    {skill}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div> : <></>}

                {data.backend.length != 0 ? <div className="skill-set flex flex-col sm:flex-row  m-3">
                    <div className="stack-title w-full sm:w-[14vw]">
                        <div className="">
                            <h5>Back-End</h5>
                        </div>
                    </div>
                    <div className="stack-items w-full sm:w-auto sm:ml-5">
                        <div className="stack-items-innerDiv flex flex-wrap justify-center gap-4">
                            {data.backend.map((skill) => {
                                return (
                                <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2">
                                    {skill}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div> : <></>}

                {data.app.length != 0 ? <div className="skill-set flex flex-col sm:flex-row  m-3">
                    <div className="stack-title w-full sm:w-[14vw]">
                        <div className="">
                            <h5>App</h5>
                        </div>
                    </div>
                    <div className="stack-items w-full sm:w-auto sm:ml-5">
                        <div className="stack-items-innerDiv flex flex-wrap justify-center gap-4">
                            {data.app.map((skill) => {
                                return (
                                <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2">
                                    {skill}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div> : <></>}

                {data.others.length != 0 ? <div className="skill-set flex flex-col sm:flex-row  m-3">
                    <div className="stack-title w-full sm:w-[14vw]">
                        <div className="">
                            <h5>Others</h5>
                        </div>
                    </div>
                    <div className="stack-items w-full sm:w-auto sm:ml-5">
                        <div className="stack-items-innerDiv flex flex-wrap justify-center gap-4">
                            {data.others.map((skill) => {
                                return (
                                <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2">
                                    {skill}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div> : <></>}
            </div>
        </div>
    )
}

export default Skills
