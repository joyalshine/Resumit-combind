import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useCookies } from "react-cookie";
import './NavBar.css'


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuthContext();
  const [cookies, setCookie, removeCookie] = useCookies(["authUser"]);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("authUser", { path: "/" });
    window.location.href = "/";
  };

  const handleMobileNavBtn = () => {
    console.log("hello")
    var element = document.getElementById("nav-box");
    element.classList.toggle("mobile-nav-display");
  }

  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      var element = document.getElementById("nav-box");
      element.classList.add("mobile-nav-display");
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      class="pt-4 mb-1 border-b-default border-solid border-gray-200 z-30 w-full bg-white ">
      <div class="mx-auto max-w-7xl  lg:px-8">
        <div class="w-full flex flex-col lg:flex-row">
          <div class="flex justify-between lg:hidden px-4">
            <a href="https://pagedone.io/" class="flex items-center">
              <svg
                width="40"
                height="33"
                viewBox="0 0 40 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">

                <path
                  d="M24.5473 11.8941C25.1905 12.5063 25.2068 13.5149 24.5837 14.1468L18.7585 20.054C18.1354 20.686 17.1087 20.702 16.4654 20.0898C15.8222 19.4776 15.8059 18.469 16.429 17.8371L22.2542 11.9299C22.8773 11.2979 23.904 11.2819 24.5473 11.8941Z"
                  fill="url(#paint0_linear_6727_44729)"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 4.54673C0 2.03564 2.07211 0 4.62819 0H21.5399V0.00124069C28.9908 0.0998525 35 6.06429 35 13.4075C35 20.8123 28.8897 26.8151 21.3523 26.8151C18.6648 26.8151 16.1587 26.052 14.0463 24.7342L6.58815 31.9057C4.13431 34.2652 0 32.5573 0 29.1841V4.54673ZM11.5194 22.7055C9.15709 20.295 7.70452 17.0179 7.70452 13.4075C7.70452 12.5277 8.43056 11.8144 9.32619 11.8144C10.2218 11.8144 10.9479 12.5277 10.9479 13.4075C10.9479 19.0526 15.6061 23.6288 21.3523 23.6288C27.0985 23.6288 31.7567 19.0526 31.7567 13.4075C31.7567 7.76248 27.0985 3.18626 21.3523 3.18626H4.62819C3.86336 3.18626 3.24334 3.79536 3.24334 4.54673V29.1841C3.24334 29.7351 3.91866 30.014 4.31948 29.6286L11.5194 22.7055Z"
                  fill="url(#paint1_linear_6727_44729)"></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_6727_44729"
                    x1="31.5325"
                    y1="2.21268"
                    x2="1.00231"
                    y2="33.2898"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9038FF"></stop>
                    <stop offset="0.993738" stop-color="#5551FF"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6727_44729"
                    x1="31.5325"
                    y1="2.21268"
                    x2="1.00231"
                    y2="33.2898"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9038FF"></stop>
                    <stop offset="0.993738" stop-color="#5551FF"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <svg width="100" height="50" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="35" font-family="Arial, sans-serif" font-weight="600" font-size="24px" fill="#000">Resumit</text>
              </svg>
            </a>
            <button onClick={handleMobileNavBtn}
              type="button"
              class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>


            <div className="absolute mobile-nav-display bg-white top-16 shadow-2xl right-11 w-2/5 z-10 p-2 rounded-lg" id="nav-box">
              <ul class="flex lg:items-center max-lg:gap-4 max-lg:mb-4 !pl-0 flex-col mt-2 md:mt-0 lg:flex-row">
                <li className="flex justify-center">
                  <a
                    href="/"
                    class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:text-base md:mb-0 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li className="flex justify-center">
                  <a
                    href="/#featuresSection"
                    class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
                    Features
                  </a>
                </li>
                {authUser ? (
                  <li className="flex justify-center">
                    <Link to={"/dashboard"}>
                      <a
                        href="#featuresSection"
                        class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
                        Dashboard
                      </a>
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>

              <div class="flex lg:items-center justify-start flex-col lg:flex-row max-lg:gap-4 mb-2 sm:mb-1  lg:justify-end">
                {authUser ? (
                  <button
                    onClick={handleLogout}
                    class="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={() => navigate("/auth/login")}
                      class="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/auth/sign-in")}
                      class="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm lg:ml-5 hover:bg-indigo-700">
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            </div>



          </div>
          <div
            class="hidden w-full lg:flex justify-between max-lg:bg-white max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200 "
            id="navbar">
            <a href="https://pagedone.io/" class="hidden lg:flex items-center">
              <svg
                width="40"
                height="33"
                viewBox="0 0 40 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24.5473 11.8941C25.1905 12.5063 25.2068 13.5149 24.5837 14.1468L18.7585 20.054C18.1354 20.686 17.1087 20.702 16.4654 20.0898C15.8222 19.4776 15.8059 18.469 16.429 17.8371L22.2542 11.9299C22.8773 11.2979 23.904 11.2819 24.5473 11.8941Z"
                  fill="url(#paint0_linear_6759_45513)"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 4.54673C0 2.03564 2.07211 0 4.62819 0H21.5399V0.00124069C28.9908 0.0998525 35 6.06429 35 13.4075C35 20.8123 28.8897 26.8151 21.3523 26.8151C18.6648 26.8151 16.1587 26.052 14.0463 24.7342L6.58815 31.9057C4.13431 34.2652 0 32.5573 0 29.1841V4.54673ZM11.5194 22.7055C9.15709 20.295 7.70452 17.0179 7.70452 13.4075C7.70452 12.5277 8.43056 11.8144 9.32619 11.8144C10.2218 11.8144 10.9479 12.5277 10.9479 13.4075C10.9479 19.0526 15.6061 23.6288 21.3523 23.6288C27.0985 23.6288 31.7567 19.0526 31.7567 13.4075C31.7567 7.76248 27.0985 3.18626 21.3523 3.18626H4.62819C3.86336 3.18626 3.24334 3.79536 3.24334 4.54673V29.1841C3.24334 29.7351 3.91866 30.014 4.31948 29.6286L11.5194 22.7055Z"
                  fill="url(#paint1_linear_6759_45513)"></path>
                  
                <defs>
                  <linearGradient
                    id="paint0_linear_6759_45513"
                    x1="31.5325"
                    y1="2.21268"
                    x2="1.00231"
                    y2="33.2898"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9038FF"></stop>
                    <stop offset="0.993738" stop-color="#5551FF"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6759_45513"
                    x1="31.5325"
                    y1="2.21268"
                    x2="1.00231"
                    y2="33.2898"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9038FF"></stop>
                    <stop offset="0.993738" stop-color="#5551FF"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <svg width="100" height="50" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="35" font-family="Arial, sans-serif" font-weight="600" font-size="24" fill="#000">Resumit</text>
              </svg>
            </a>

            <div className="md:flex " id="nav-box">
              <ul id="currentModal" class="flex lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-2 md:mt-0 lg:flex-row">
                <li className="flex justify-center">
                  <a
                    href="/"
                    class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li className="flex justify-center">
                  <a
                    href="/#featuresSection"
                    class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
                    Features
                  </a>
                </li>
                {authUser ? (
                  <li className="flex justify-center">
                    <Link to={"/dashboard"}>
                      <a
                        href="#featuresSection"
                        class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
                        Dashboard
                      </a>
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>

              <div class="flex lg:items-center justify-start flex-col lg:flex-row max-lg:gap-4 mb-2 sm:mb-1  lg:justify-end">
                {authUser ? (
                  <button
                    onClick={handleLogout}
                    class="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                    Logout
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => navigate("/auth/login")}
                      class="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/auth/sign-in")}
                      class="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm lg:ml-5 hover:bg-indigo-700">
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex">
          {children}
        </a>
      </li>
    </>
  );
};



// import { useAuthContext } from '@/context/AuthContext';
// import React, { useState } from 'react'
// import { useCookies } from 'react-cookie';
// import { Link, useNavigate } from 'react-router-dom'

// function NavBar() {
//   const [open, setOpen] = useState(false);
//   const { authUser } = useAuthContext();
//   const [cookies, setCookie, removeCookie] = useCookies(["authUser"]);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     removeCookie("authUser", { path: "/" });
//     window.location.href = "/";
//   };
//   return (
//     <header>
//       <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
//         <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//           <div class="flex items-center lg:order-2">
//             <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
//               <span class="sr-only">Open main menu</span>
//               <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
//               <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//             </button>
//           </div>
//           <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
//             {/* <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//               <li>
//                 <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
//               </li>
//               <li>
//                 <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
//               </li>
//               <li>
//                 <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
//               </li>
//               <li>
//                 <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
//               </li>
//               <li>
//                 <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
//               </li>
//               <li>
//                 <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//               </li>
//             </ul> */}
//             <ul class="flex lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-2 md:mt-0 lg:flex-row">
//               <li className="flex justify-center">
//                 <a
//                   href="/"
//                   class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
//                   Home
//                 </a>
//               </li>
//               <li className="flex justify-center">
//                 <a
//                   href="/#featuresSection"
//                   class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
//                   Features
//                 </a>
//               </li>
//               {authUser ? (
//                 <li className="flex justify-center">
//                   <Link to={"/dashboard"}>
//                     <a
//                       href="#featuresSection"
//                       class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900">
//                       Dashboard
//                     </a>
//                   </Link>
//                 </li>
//               ) : (
//                 <></>
//               )}
//             </ul>

//             <div class="flex lg:items-center justify-start flex-col lg:flex-row max-lg:gap-4 mb-2 sm:mb-1  lg:justify-end">
//               {authUser ? (
//                 <button
//                   onClick={handleLogout}
//                   class="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
//                   Logout
//                 </button>
//               ) : (
//                 <div>
//                   <button
//                     onClick={() => navigate("/auth/login")}
//                     class="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
//                     Login
//                   </button>
//                   <button
//                     onClick={() => navigate("/auth/sign-in")}
//                     class="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm lg:ml-5 hover:bg-indigo-700">
//                     Sign up
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   )
// }

// export default NavBar
