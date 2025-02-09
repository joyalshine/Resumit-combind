import { WEBSITE_URL } from '@/assets/dataAssets';
import LoadingIcon from '@/components/LoadingIcon/LoadingIcon';
import Navbar from '@/components/NavBar/NavBar'
import useResumeParser from '@/useHooks/useParseResume'
import { Loader2, Loader2Icon, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'
import { LoaderIcon } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const templates = [
    {
        value: "joyal",
        imageSrc: "/images/joyal.png",
        previewLink: "demo1"
    },
    {
        value: "arnab",
        imageSrc: "/images/arnab.png",
        previewLink: "demo2"
    },
    // {
    //     value: "template3",
    //     imageSrc: "/images/template3.png",
    //     previewLink: ""
    // },
    // {
    //     value: "template4",
    //     imageSrc: "/images/template4.png",
    //     previewLink: ""
    // }
]

function ResumeUpload() {
    const [selectedFile, setselectedFile] = useState('')
    const [selectedTemplate, setselectedTemplate] = useState('')

    const [showAlert, setShowAlert] = useState(false)
    const [showAlertMsg, setShowAlertMsg] = useState("")
    const [uploadProgress, setUploadProgess] = useState(0)
    const [isLoading, setisLoading] = useState(false)

    const parseResume = useResumeParser()
    const navigate = useNavigate();

    const deleteFile = (e) => {
        setselectedFile('')
        e.target.value = ''
    }

    const handleSubmit = async () => {
        try {
            setisLoading(true)
            if (selectedFile == '' || selectedFile.type != "application/pdf") {
                setShowAlertMsg("Select the resume")
                setShowAlert(true)
                setTimeout(() => setShowAlert(false), 5000)
            }
            else if (selectedTemplate == '') {
                setShowAlertMsg("Select any Template")
                setShowAlert(true)
                setTimeout(() => setShowAlert(false), 5000)
            }
            else {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('template', selectedTemplate);

                await parseResume({ formData, setUploadProgess }).then(({ status, parsedData }) => {
                    if (status) {
                        navigate('/portfolio/validate', { state: { parsedData, template: selectedTemplate } });
                    }
                })

            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setisLoading(false)
        }

    }
    return (
        <div>
            <Navbar />
            <div className="w-full mt-32 my-auto flex flex-col items-center">
                <div class="w-3/4 sm:w-2/4 py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
                    <div class="grid gap-1">
                        <svg class="mx-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="File">
                                <path id="icon" d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z" fill="#4F46E5" />
                            </g>
                        </svg>
                        <h2 class="text-center text-gray-400   text-xs leading-4">PDF, smaller than 15MB</h2>
                    </div>
                    <div class="grid gap-2">
                        <h4 class="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your Resume here or</h4>
                        <div class="flex items-center justify-center">
                            <label>
                                <input type="file" accept="application/pdf" multiple="false" onChange={(e) => setselectedFile(e.target.files[0])} hidden />
                                <div class="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File</div>
                            </label>
                        </div>
                    </div>
                </div>
                {selectedFile != '' ? <div class="w-3/4 sm:w-2/4 grid gap-1 mt-5">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <g id="Folder Open ">
                                    <path id="icon" d="M5 28.3333V14.8271C5 10.2811 5 8.00803 6.36977 6.56177C6.43202 6.49604 6.49604 6.43202 6.56177 6.36977C8.00803 5 10.2811 5 14.8271 5H15.3287C16.5197 5 17.1151 5 17.6492 5.18666C17.9753 5.30065 18.2818 5.46465 18.5575 5.67278C19.0091 6.0136 19.3394 6.50907 20 7.5C20.6606 8.49093 20.9909 8.9864 21.4425 9.32722C21.7182 9.53535 22.0247 9.69935 22.3508 9.81334C22.8849 10 23.4803 10 24.6713 10H28.3333C31.476 10 33.0474 10 34.0237 10.9763C35 11.9526 35 13.524 35 16.6667V17.5M16.2709 35H25.8093C28.2565 35 29.4801 35 30.3757 34.3164C31.2714 33.6328 31.5942 32.4526 32.2398 30.0921L32.6956 28.4254C33.7538 24.5564 34.2829 22.622 33.2823 21.311C32.2817 20 30.2762 20 26.2651 20H16.7339C14.2961 20 13.0773 20 12.1832 20.6796C11.2891 21.3591 10.9629 22.5336 10.3105 24.8824L9.84749 26.549C8.76999 30.428 8.23125 32.3675 9.23171 33.6838C10.2322 35 12.2451 35 16.2709 35Z" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
                                </g>
                            </svg>
                            <div class="grid gap-1">
                                <h4 class="text-gray-900 text-sm font-normal leading-snug">{selectedFile.name}</h4>
                                <h5 class="text-gray-400   text-xs font-normal leading-4">Selected File</h5>
                            </div>
                        </div>
                        <button onClick={deleteFile}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g id="Upload 3">
                                    <path id="icon" d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#D1D5DB" stroke-width="1.6" stroke-linecap="round" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    {isLoading ? <div class="relative flex items-center gap-2.5 py-1.5">
                        <div class="relative  w-full h-2.5  overflow-hidden rounded-3xl bg-gray-100">
                            <div role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="80" style={{ width: { uploadProgress } }} class="flex h-full items-center justify-center bg-indigo-600  text-white rounded-3xl"></div>
                        </div>
                        <span class="ml-2 bg-white  rounded-full  text-gray-800 text-xs font-medium flex justify-center items-center ">80%</span>
                    </div> : <></>}
                </div> : <></>}
            </div>



            {selectedFile != '' ? <div className='p-5 w-full mt-20 p-10 sm:p-16 lg:28'>
                <div className=' p-3 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed'>
                    <div>
                        <h5 class="mb-4 text-md font-extrabold text-gray-900 dark:text-white md:text-lg lg:text-2xl">Select a <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Template.</span></h5>
                    </div>

                    <div className='flex justify-around flex-wrap'>
                        {templates.map((item) => {
                            return <PreviewCard value={item.value} imageSrc={item.imageSrc} previewLink={item.previewLink} setselectedTemplate={setselectedTemplate} />
                        })}
                    </div>
                    <div className='flex justify-end mt-14'>
                        <button type="button" disabled={isLoading} onClick={handleSubmit} class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{isLoading ? <Loader2 className=" h-6 w-6 animate-spin" /> : "Continue"}</button>
                    </div>
                </div>
            </div> : <></>}

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
        </div>
    )
}


function PreviewCard({ value, imageSrc, previewLink, setselectedTemplate }) {
    return (
        <div className='m-2' onClick={() => setselectedTemplate(value)}>
            <input type="radio" id={value} name="hosting" value={value} class="hidden peer" required />
            <label for={value} class="inline-flex items-center justify-between w-full text-gray-500 bg-white !border-4 border-gray-200 rounded-2xl cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                <div class="relative max-w-sm l transition-all duration-500 ">
                    <div class="block overflow-hidden rounded-2xl">
                        <img src={imageSrc} alt="Card image" />
                    </div>
                    <div class="p-3 flex justify-end">
                        <a href={`${WEBSITE_URL}${previewLink}`} target='_blank'><button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs px-3 py-2.5 text-center me-2 mb-2">Preview</button></a>
                    </div>
                </div>
            </label>
        </div>
    )
}


export default ResumeUpload
