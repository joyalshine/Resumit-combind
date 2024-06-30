import React, { useEffect, useState } from 'react'
import './DataValidationArnab.css'
import Navbar from '@/components/NavBar/NavBar';
import useCreatePortfolio from '@/useHooks/useCreatePortfolio';
import { WEBSITE_URL } from '@/assets/dataAssets';
import { useNavigate } from 'react-router-dom';
import useEditPortfolio from '@/useHooks/useEditPortfolio';
import Swal from 'sweetalert2'


function DataValidationArnab({ parsedData, reqType }) {
    const [activeStep, setActiveStep] = useState(1);
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertMsg, setShowAlertMsg] = useState("")

    const [isLoading, setisLoading] = useState(false)

    const handleNext = () => setActiveStep((cur) => cur + 1);
    const handlePrev = () => setActiveStep((cur) => cur - 1);

    const [modalURL, setmodalURL] = useState("")
    const [copied, setCopied] = useState(false)

    const createPortfolio = useCreatePortfolio()
    const updatePortfolio = useEditPortfolio()
    const navigate = useNavigate()

    const [basicDetails, setBasicDetais] = useState({
        name: '',
        linkedin: '',
        github: '',
        instagram: '',
        email: ''
    })

    const [skillDetailsArray, setSkillDetailsArray] = useState({
        skills: [],
        roles: []
    })

    const [skillDetails, setSkillDetails] = useState({
        skills: '',
        roles: '',
    })

    const [projectArray, setProjectsArray] = useState([])

    const [projectDetails, setProjectDetails] = useState({
        title: '',
        desc: '',
        techStack: [],
        github: '',
    })

    const [experienceArray, setExperienceArray] = useState([])

    const [experienceDetails, setExperienceDetails] = useState({
        role: '',
        period: ''
    })

    const [about, setAbout] = useState("")

    useEffect(() => {
        if (reqType == "validate") {
            setBasicDetais(parsedData.basicDetails)
            setSkillDetailsArray({
                skills: parsedData.skills,
                roles: parsedData.roles
            })
            setProjectsArray(parsedData.projects)
            setExperienceArray(parsedData.experience)
            setAbout(parsedData.about)
        }
        else {
            setBasicDetais(parsedData.basicDetails)
            setSkillDetailsArray(parsedData.skillDetailsArray)
            setProjectsArray(parsedData.projectArray)
            setExperienceArray(parsedData.experienceArray)
            setAbout(parsedData.about)
        }
    }, [])

    const handleSubmitBasic = () => {
        if (basicDetails.name == '' || basicDetails.linkedin == '' || basicDetails.github == '' || basicDetails.instagram == '' || basicDetails.email == '') {
            setShowAlertMsg("Fill all the details")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
        else handleNext()
        return false
    }

    const handleSubmitSkills = () => {
        if (skillDetailsArray.skills.length == 0 || skillDetailsArray.roles.length == 0) {
            setShowAlertMsg("Enter the details")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
        else handleNext()
    }

    const handleSubmitProjects = () => {
        if (projectArray.length == 0) {
            setShowAlertMsg("Enter atleast 1 project")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
        else handleNext()
    }

    const handleSubmitExperience = () => {
        if (experienceArray.length == 0) {
            setShowAlertMsg("Enter atleast 1 Experience")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
        else handleNext()
    }
    const handleSubmitAbout = async () => {
        setisLoading(true)
        try {
            if (about == '') {
                setShowAlertMsg("Enter the about description")
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 5000)
            }
            else {
                if (reqType == "validate") {
                    await createPortfolio({ basicDetails, skillDetailsArray, projectArray, experienceArray, about, template: 'arnab' }).then(({ status, url }) => {
                        if (status) {
                            setmodalURL(WEBSITE_URL + url)
                            const modal = document.getElementById('my_modal_1')
                            modal.showModal();
                        }
                    })
                }
                else{
                    await updatePortfolio({ basicDetails, skillDetailsArray, projectArray,experienceArray, about, _id: parsedData._id }).then(({ status, url }) => {
                        if (status) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Portfolio has been updated",
                                showConfirmButton: false,
                                timer: 1500
                            }).then((e) => {
                                navigate('/dashboard')
                            })
                        }
                    })
                }
            }
        }
        catch (e) { }
        finally {
            setisLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (!copied) {
            const textInput = document.getElementById('copy-text');
            textInput.select();
            textInput.setSelectionRange(0, 99999);
            try {
                navigator.clipboard.writeText(textInput.value);
                setCopied(true)
                setTimeout(() => setCopied(false), 8000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    }

    const handleFunctions = [
        handleSubmitBasic,
        handleSubmitSkills,
        handleSubmitProjects,
        handleSubmitExperience,
        handleSubmitAbout,
    ]

    return (
        <div>
            <Navbar />
            <div className='w-full sm:mt-20 mt-10 sm:p-5 p-3'>
                <div className='w-full flex justify-center  relative z-0'>
                    <ol class="flex items-center w-full sm:w-3/4 flex justify-center text-xs text-gray-900 font-medium sm:text-base">
                        <li class={`flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4 transition duration-500 ${activeStep > 1 ? "after:bg-indigo-600 text-indigo-600" : "after:bg-gray-200 text-gray-900"}`}>
                            <div class="block whitespace-nowrap z-10">
                                <span class={`w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 transition duration-500 ${activeStep > 1 ? "bg-indigo-600 border-transparent text-white" : activeStep == 1 ? "bg-indigo-50 border-indigo-600 text-indigo-600" : "bg-gray-50 border-gray-200"}`}>1</span> Step 1
                            </div>
                        </li>
                        <li class={`flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4 transition duration-500  ${activeStep > 2 ? "after:bg-indigo-600 text-indigo-600" : "after:bg-gray-200 text-gray-900"}`}>
                            <div class="block whitespace-nowrap z-10">
                                <span class={`w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 transition duration-500 ${activeStep > 2 ? "bg-indigo-600 border-transparent text-white" : activeStep == 2 ? "bg-indigo-50 border-indigo-600 text-indigo-600" : "bg-gray-50 border-gray-200"}`}>2</span> Step 2
                            </div>
                        </li>
                        <li class={`flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4 transition duration-500 ${activeStep > 3 ? "after:bg-indigo-600 text-indigo-600" : "after:bg-gray-200 text-gray-900"}`}>
                            <div class="block whitespace-nowrap z-10">
                                <span class={`w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 transition duration-500 ${activeStep > 3 ? "bg-indigo-600 border-transparent text-white" : activeStep == 3 ? "bg-indigo-50 border-indigo-600 text-indigo-600" : "bg-gray-50 border-gray-200"}`}>3</span> Step 3
                            </div>
                        </li>
                        <li class={`flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4 transition duration-500 ${activeStep > 4 ? "after:bg-indigo-600 text-indigo-600" : "after:bg-gray-200 text-gray-900"}`}>
                            <div class="block whitespace-nowrap z-10">
                                <span class={`w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 transition duration-500 ${activeStep > 4 ? "bg-indigo-600 border-transparent text-white" : activeStep == 4 ? "bg-indigo-50 border-indigo-600 text-indigo-600" : "bg-gray-50 border-gray-200"}`}>4</span> Step 4
                            </div>
                        </li>
                        <li class={`flex relative transition duration-500  ${activeStep > 5 ? "after:bg-indigo-600 text-indigo-600" : "after:bg-gray-200 text-gray-900"}`}>
                            <div class="block whitespace-nowrap z-10">
                                <span class={`w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 transition duration-500 ${activeStep > 5 ? "bg-indigo-600 border-transparent text-white" : activeStep == 5 ? "bg-indigo-50 border-indigo-600 text-indigo-600" : "bg-gray-50 border-gray-200"}`}>5</span> Step 5
                            </div>
                        </li>
                    </ol>
                </div>

                {activeStep == 1 ? <div className='sm:px-24 flex flex-col mt-20'>
                    <div>
                        <h6>Basic Details</h6>
                    </div>
                    <div className='mt-5'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmitBasic()
                        }} >
                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" value={basicDetails.name} onChange={(e) => setBasicDetais({ ...basicDetails, name: e.target.value })} id="first_name" name="1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                                <div>
                                    <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LinkedIn Profile</label>
                                    <input type="url" value={basicDetails.linkedin} onChange={(e) => setBasicDetais({ ...basicDetails, linkedin: e.target.value })} id="website" name="2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                                </div>
                                <div>
                                    <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub Link</label>
                                    <input type="url" value={basicDetails.github} onChange={(e) => setBasicDetais({ ...basicDetails, github: e.target.value })} id="website1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram Link</label>
                                    <input type="text" value={basicDetails.instagram} onChange={(e) => setBasicDetais({ ...basicDetails, instagram: e.target.value })} id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                                </div>
                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input type="email" value={basicDetails.email} onChange={(e) => setBasicDetais({ ...basicDetails, email: e.target.value })} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                            </div>
                            <button type="submit" class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div> : activeStep == 2 ?
                    <div className='w-full flex justify-center'>
                        <div className='sm:px-24 w-full md:w-2/3 flex flex-col mt-20'>
                            <div>
                                <h6>Technical Skills</h6>
                            </div>
                            <div className='mt-5'>
                                <div>
                                    <label for="first_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Technical Skills</label>
                                    <div className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                        <div className='bg-gray-50 border border-gray-300 p-2 mb-2 rounded-lg flex flex-wrap'>
                                            {skillDetailsArray.skills.map((item, index) => {
                                                return (<span id={`badge-dismiss-indigo-${index}`} key={index} class="inline-flex items-center px-2 py-1 m-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                                    {item}
                                                    <button type="button" onClick={() => {
                                                        let skills = skillDetailsArray.skills.filter(x => x != item);
                                                        setSkillDetailsArray({ ...skillDetailsArray, skills })
                                                    }} class="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" data-dismiss-target={`#badge-dismiss-indigo-${index}`} aria-label="Remove">
                                                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span class="sr-only">Remove badge</span>
                                                    </button>
                                                </span>)
                                            })}
                                        </div>
                                        <div>
                                            <div class="relative">
                                                <form action="">
                                                    <input type="search" value={skillDetails.skills} onChange={(e) => setSkillDetails({ ...skillDetails, skills: e.target.value })} id="search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the skill" required />
                                                    <button type="submit" onClick={(e) => {
                                                        e.preventDefault()
                                                        if (skillDetails.skills != '') {
                                                            skillDetailsArray.skills.push(skillDetails.skills)
                                                            setSkillDetails({ ...skillDetails, skills: '' })
                                                        }
                                                    }} class="text-white absolute end-2.5 bottom-2 text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-5'>
                                    <label for="first_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Roles</label>
                                    <div className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                        <div className='bg-gray-50 border border-gray-300 p-2 mb-2 rounded-lg flex flex-wrap'>
                                            {skillDetailsArray.roles.map((item, index) => {
                                                return (<span id={`badge-dismiss-indigo-${index}`} key={index} class="inline-flex items-center px-2 py-1 m-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                                    {item}
                                                    <button type="button" onClick={() => {
                                                        let roles = skillDetailsArray.roles.filter(x => x != item);
                                                        setSkillDetailsArray({ ...skillDetailsArray, roles })
                                                    }} class="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" data-dismiss-target={`#badge-dismiss-indigo-${index}`} aria-label="Remove">
                                                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span class="sr-only">Remove badge</span>
                                                    </button>
                                                </span>)
                                            })}
                                        </div>
                                        <div>
                                            <div class="relative">
                                                <form action="">
                                                    <input type="search" value={skillDetails.roles} onChange={(e) => setSkillDetails({ ...skillDetails, roles: e.target.value })} id="search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the skill" required />
                                                    <button type="submit" onClick={(e) => {
                                                        e.preventDefault()
                                                        if (skillDetails.roles != '') {
                                                            skillDetailsArray.roles.push(skillDetails.roles)
                                                            setSkillDetails({ ...skillDetails, roles: '' })
                                                        }
                                                    }} class="text-white absolute end-2.5 bottom-2 text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    activeStep == 3 ?
                        <ProjectInput projectDetails={projectDetails} setProjectDetails={setProjectDetails} projectsArray={projectArray} setProjectsArray={setProjectsArray} handleSubmitProjects={handleSubmitProjects} setShowAlert={setShowAlert} setShowAlertMsg={setShowAlertMsg} />
                        :
                        activeStep == 4 ?
                            <ExperienceInput experienceDetails={experienceDetails} setExperienceDetails={setExperienceDetails} experienceArray={experienceArray} setExperienceArray={setExperienceArray} handleSubmitExperience={handleSubmitExperience} setShowAlert={setShowAlert} setShowAlertMsg={setShowAlertMsg} />
                            :
                            <div className='sm:px-24 flex flex-col mt-20'>
                                <div>
                                    <h6>Overview Details</h6>
                                </div>
                                <div className='mt-5'>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        handleSubmitAbout()
                                    }} >
                                        <div class="mb-6">
                                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Give Short Overview about yourself</label>
                                            <textarea id="message" value={about} onChange={(e) => setAbout(e.target.value)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                        </div>
                                        <button type="submit" class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </form>
                                </div>
                            </div>
                }
                <div className='sm:px-24 flex justify-between my-10'>
                    <button type="button" disabled={activeStep == 1} onClick={handlePrev} class={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${activeStep == 1 ? "cursor-not-allowed" : ""}`}>Prev</button>
                    <button type="button" onClick={handleFunctions[activeStep - 1]} class={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${activeStep == 5 ? "cursor-not-allowed" : ""}`}>Next</button>
                </div>
            </div>


            <div id="toast-warning" class={`z-20 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed top-5 right-5 ${showAlert ? '' : "hidden"}`} role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                    </svg>
                    <span class="sr-only">Warning icon</span>
                </div>
                <div class="ms-3 text-sm font-normal">{showAlertMsg}</div>
                <button type="button" onClick={() => setShowAlert(false)} class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>


            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">URL</h3>

                    <div className='modal-action justify-center'>
                        <div className="w-full max-w-[20rem]">
                            <div className="relative ">
                                <label htmlFor="copy-text" className="sr-only">Label</label>
                                <input id="copy-text" type="text" className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={modalURL} disabled readOnly />
                                <button data-copy-to-clipboard-target="npm-install-copy-text" onClick={copyToClipboard} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
                                    <span id="default-message" className={copied ? "hidden inline-flex items-center" : "inline-flex items-center"}>
                                        <svg className="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                        </svg>
                                        <span className="text-xs font-semibold">Copy</span>
                                    </span>
                                    <span id="success-message" className={copied ? " inline-flex items-center" : "hidden inline-flex items-center"}>
                                        <svg className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                        </svg>
                                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => {
                                document.getElementById('my_modal_1').close();
                                navigate('/dashboard');
                            }}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    )
}

export default DataValidationArnab





function ProjectInput({ setProjectsArray, projectsArray, setProjectDetails, projectDetails, handleSubmitProjects, setShowAlert, setShowAlertMsg }) {
    const addProject = () => {
        if (projectDetails.title == "" || projectDetails.desc == "" || projectDetails.techStack == "") {
            setShowAlertMsg("Enter title,desc and teck stack")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
        else {
            setProjectsArray([...projectsArray, projectDetails])
            setProjectDetails({
                title: '',
                desc: '',
                techStack: [],
                github: '',
            })
        }
    }

    const deleteProject = (reqIndx) => {
        let projects = projectsArray.filter((item, index) => index != reqIndx)
        setProjectsArray(projects)
    }

    const editProject = (reqIndx) => {
        let project = projectsArray[reqIndx]
        deleteProject(reqIndx)
        setProjectDetails(project)
    }

    return (
        <div className='sm:px-24 flex flex-col mt-20'>
            <div>
                <h6>Project Details</h6>
            </div>
            <div className='mt-5 p-3 sm:p-1 justify-items-center grid'>
                {projectsArray.map((item, index) => {
                    return <div className="project-item w-full lg:w-2/3">
                        <div className="project-desc-left">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <div className='project-stack'>
                                {item.techStack.map((skill) => <p>{skill}</p>)}
                            </div>
                            <div className="links">
                                {item.github != '' ? <a href={item.github} target="_blank" rel="noreferrer">Code<i className="fa-brands fa-github "></i></a> : <></>}
                            </div>
                            <div className='flex justify-end'>
                                <button type='button' onClick={() => {
                                    deleteProject(index)
                                }} class='w-11 h-11 m-1 bg-indigo-50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-indigo-100'>
                                    <svg class="w-6 h-6  dark:text-white text-[#3b82f6]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                    </svg>
                                </button>
                                <button type='button' onClick={() => {
                                    editProject(index)
                                }} class='w-11 h-11 m-1 bg-indigo-50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-indigo-100'>
                                    <svg class="w-6 h-6  dark:text-white text-[#3b82f6]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div className='mt-1'>
                <form onsubmit={(e) => {
                    e.preventDefault()
                    handleSubmitProjects()
                }}>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} id="first_name" name="1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div>
                            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub Link</label>
                            <input type="url" value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} id="website1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                        </div>
                        <div>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
                            <textarea id="message" value={projectDetails.desc} onChange={(e) => setProjectDetails({ ...projectDetails, desc: e.target.value })} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        </div>
                    </div>
                    <div class="mb-6">
                        <MultiSelectInputProject projectDetails={projectDetails} setProjectDetails={setProjectDetails} />
                    </div>
                    <button type="submit" class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
                <div className=' flex justify-end mt-10'>
                    <button type="button" onClick={addProject} class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Project</button>
                    {/* <button type="button" onClick={handlePrev} class={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${activeStep == 1 ? "cursor-not-allowed" : ""}`}>Prev</button>
                    <button type="button" onClick={handleSubmitBasic} class={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${activeStep == 5 ? "cursor-not-allowed" : ""}`}>Next</button> */}
                </div>
            </div>
        </div>
    )
}




function MultiSelectInputProject({ projectDetails, setProjectDetails }) {
    const [input, setInput] = useState('')

    return (
        <div className=''>
            <label for="first_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Tech Stack</label>
            <div className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <div className='bg-gray-50 border border-gray-300 p-2 mb-2 rounded-lg flex flex-wrap'>
                    {projectDetails.techStack.map((item, index) => {
                        return (<span id={`badge-dismiss-indigo-${index}`} key={index} class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                            {item}
                            <button type="button" onClick={() => {
                                let techStack = projectDetails.techStack.filter(x => x != item);
                                setProjectDetails({ ...projectDetails, techStack })
                            }} class="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" data-dismiss-target={`#badge-dismiss-indigo-${index}`} aria-label="Remove">
                                <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Remove badge</span>
                            </button>
                        </span>)
                    })}
                </div>
                <div>
                    <div class="relative">
                        <form action="">
                            <input type="search" value={input} onChange={(e) => setInput(e.target.value)} id="search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the skill" required />
                            <button type="submit" onClick={(e) => {
                                e.preventDefault()
                                if (input != '') {
                                    projectDetails.techStack.push(input)
                                    setProjectDetails({ ...projectDetails, techStack: projectDetails.techStack })
                                    setInput('')
                                }
                            }} class="text-white absolute end-2.5 bottom-2 text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}




function ExperienceInput({ experienceDetails, setExperienceDetails, experienceArray, setExperienceArray, handleSubmitExperience, setShowAlert, setShowAlertMsg }) {
    const addExperience = () => {
        if (experienceDetails.role == "" || experienceDetails.period == "") {
            setShowAlertMsg("Enter role and time period")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
        else {
            setExperienceArray([...experienceArray, experienceDetails])
            setExperienceDetails({
                role: '',
                period: '',
            })
        }
    }

    const deleteExperience = (reqIndx) => {
        let exp = experienceArray.filter((item, index) => index != reqIndx)
        setExperienceArray(exp)
    }

    const editExperience = (reqIndx) => {
        let exp = experienceArray[reqIndx]
        deleteProject(reqIndx)
        setExperienceDetails(exp)
    }

    return (
        <div className='sm:px-24 flex flex-col mt-20'>
            <div>
                <h6>Experience Details</h6>
            </div>
            <div className='mt-5 p-3 sm:p-1 justify-items-center grid'>
                {experienceArray.map((item, index) => {
                    return <div className="project-item w-full lg:w-2/4 !bg-white">
                        <div className="project-desc-left">
                            <h4 className='font-semibold'>{item.role}</h4>
                            <p>{item.period}</p>
                            <div className='flex justify-end'>
                                <button type='button' onClick={() => {
                                    deleteExperience(index)
                                }} class='w-10 h-10 m-1 bg-indigo-50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-indigo-100'>
                                    <svg class="w-5 h-5  dark:text-white text-[#3b82f6]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                    </svg>
                                </button>
                                <button type='button' onClick={() => {
                                    editExperience(index)
                                }} class='w-10 h-10 m-1 bg-indigo-50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-indigo-100'>
                                    <svg class="w-5 h-5  dark:text-white text-[#3b82f6]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div className='mt-1'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    addExperience()
                    return false
                }}>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job role</label>
                            <input type="text" value={experienceDetails.role} onChange={(e) => setExperienceDetails({ ...experienceDetails, role: e.target.value })} id="first_name" name="1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div>
                            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Period</label>
                            <input type="text" value={experienceDetails.period} onChange={(e) => setExperienceDetails({ ...experienceDetails, period: e.target.value })} id="website1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                        </div>
                    </div>
                    <button type="submit" class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
                <div className=' flex justify-end mt-10'>
                    <button type="button" onClick={addExperience} class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Experience</button>
                    {/* <button type="button" onClick={handlePrev} class={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${activeStep == 1 ? "cursor-not-allowed" : ""}`}>Prev</button>
                    <button type="button" onClick={handleSubmitBasic} class={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${activeStep == 5 ? "cursor-not-allowed" : ""}`}>Next</button> */}
                </div>
            </div>
        </div>
    )
}