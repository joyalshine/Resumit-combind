import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import ResumeCardItem from "./components/ResumeCardItem";
import { useCookies } from "react-cookie";
import Navbar from "@/components/NavBar/NavBar";
import { useAuthContext } from "@/context/AuthContext";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import useFetchPortfolioList from "@/useHooks/useFetchPortfolioList";
import useFetchResume from "@/useHooks/useFetchResume";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const [resumeList, setResumeList] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [isTabResume, setisTabResume] = useState(true);
  const { authUser } = useAuthContext();

  const fetchResumeList = useFetchResume();
  const fetchPortfolioList = useFetchPortfolioList();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, status } = await fetchPortfolioList();
        const response = await fetchResumeList();

        if (response.status) {
          setResumeList(response.resume);
        }
        if (status) {
          setPortfolios(data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10 md:px-20 lg:px-32">
        <div className="font-bold text-3xl">My Dashboard</div>
        <p>Start Managing your Resume and Portfolio</p>
      </div>
      <div className="sm:w-4/5 w-full p-2 mx-auto mb-20">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center list-none">
            <li
              class="me-2 text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
              role="presentation">
              <button
                onClick={() => setisTabResume(true)}
                class={`inline-block p-4 border-b-2 rounded-t-lg ${isTabResume
                  ? "text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                id="profile-styled-tab"
                data-tabs-target="#styled-profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false">
                Resume
              </button>
            </li>
            <li class="me-2" role="presentation">
              <button
                onClick={() => setisTabResume(false)}
                class={`inline-block p-4 border-b-2 rounded-t-lg ${!isTabResume
                  ? "text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                id="dashboard-styled-tab"
                data-tabs-target="#styled-dashboard"
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected="false">
                Portfolio
              </button>
            </li>
          </ul>
        </div>
        <div>
        <div
            class={`${
              isTabResume ? "" : "hidden"
            } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-5">
              {resumeList.length == 0 ? (
                "No Resume"
              ) : (
                <>
                  {resumeList.length > 0 &&
                    resumeList.map((resume, index) => (
                      <ResumeCardItem key={index} resume={resume} />
                    ))}
                </>
              )}
            </div>
          </div>

          <div
            class={`${!isTabResume ? "" : "hidden"
              } `}>
            <div className="w-full flex justify-end">
              <button onClick={() => navigate('/portfolio/create')} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Create
                </span>
              </button>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex flex-wrap gap-6 justify-center">
                {portfolios.length == 0 ? "No Portfolios.." : portfolios.map((item, index) => (
                  <PortfolioCard id={item.url} parsedData={item} />
                ))}


                {/* <div className="bg-[#d5ebff] hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer flex align-center  rounded-lg">
                  <div className="min-h-48 md:w-[25rem] w-[20rem] flex flex-col justify-center items-center border-primary">
                    <a href="/portfolio/create" class="">
                      <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span class="relative px-5  py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
                          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                          </svg>
                        </span>
                      </button>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
