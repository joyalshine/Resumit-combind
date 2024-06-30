import React from 'react'
import { useNavigate } from 'react-router-dom'

const template_preview = {
    "joyal" : "/images/joyal.png",
    "arnab" : "/images/arnab.png",
    "template3" : "/images/template3.png",
    "template4" : "/images/template4.png"
}
function PortfolioCard({id,parsedData}) {
    const navigate = useNavigate()
    return (
        <div>
            <div className="md:w-[25rem] w-[20rem] bg-[#d5ebff]  flex flex-col justify-center items-center border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer ">
                <img src={template_preview[parsedData.template]} alt="" srcset="" />
                <div class="p-3 w-full flex justify-end">
                    <button type="button" onClick={() =>  window.open(`/${id}`,'_blank')} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs px-3 py-2.5 text-center me-2">
                        Preview
                    </button>
                    <button type="button" onClick={() =>  navigate(`/dashboard/edit/${id}`,{ state: { parsedData  ,template:parsedData.template} })} class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-2.5 text-center">Edit</button>
                </div>
            </div>
        </div>
    )
}

export default PortfolioCard
