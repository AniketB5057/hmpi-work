import  { Suspense, lazy } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  useAnalyticsData,
  useOnboardingData,
  userActivityData,
} from "../hooks/dashboard/useDashboardData";

import OverviewAnalyticsCard from "./components/dashboard/AnalyticsCard";
import OnboardinTodoList from "./components/dashboard/OnboardinTodoList";
import RecentActivityCard from "./components/dashboard/RecentActivityCard";
import { isMobile } from "react-device-detect";
import service_buddy_payments from "../images/service-buddy-payments.png";
import user_upload from "../images/user-upload.svg";

import CompanySettings from "./CompanySettings";
import CompanyBranding from "./CompanyBranding";
import ProductsAndServices from "./ProductsAndServices";
import ServiceBuddyPayments from "./ServiceBuddyPayments";
import Integrations from "./Integrations";
import ManageTheTeam from "./ManageTheTeam";
import WorkSettings from "./WorkSettings";
import CalendarSettings from "./CalendarSettings";
// import AddNewUser from "./AddNewUser";

const AddNewUser = lazy(()=>import('./AddNewUser'))

function Settings() {
  const analyticsDataHook = useAnalyticsData();
  const onboardingDataHook = useOnboardingData();
  const activityDataHook = userActivityData();

  return (
    <>
      <div className="flex flex-row flex-wrap h-full">
        <div className="basis-full lg:basis-1/5">
          <div className="settings-sidebar">
            <h6>Settings</h6>

            <p className="settings-title mt-[40px] mb-[15px]">
              Company Management
            </p>

            <ul>
              <li>
                <NavLink to="/settings/company-settings">Company Settings</NavLink>
              </li>
              <li>
                <NavLink to="/settings/company-branding">Company Branding</NavLink>
              </li>
              <li>
                <NavLink to="/settings/products-and-services">Products & Services</NavLink>
              </li>
              <li>
                <NavLink to="/settings/service-buddy-payments">Service Buddy Payments</NavLink>
              </li>
              <li>
                <NavLink to="/settings/integrations">Integrations</NavLink>
              </li>
            </ul>

            <p className="settings-title mb-[15px]">Team Settings</p>

            <ul>
              <li>
                <NavLink to="/settings/manage-the-team">Manage the Team</NavLink>
              </li>

              <li>
                <NavLink to="/settings/work-settings">Work Settings</NavLink>
              </li>

              <li>
                <NavLink to="/settings/calendar-settings">Calendar Settings</NavLink>
              </li>
            </ul>

            <p className="settings-title mb-[15px]">Client Settings</p>

            <ul>
              <li>
                <NavLink to="/settings/emails-and-texts">Emails & Texts</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="basis-full lg:basis-4/5 ">
          <div className="intro-js-dashboard px-4 sm:px-6 lg:px-6 py-8 w-full mx-auto">
            <main>
              <div className="w-full max-w-9xl mx-auto">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route index element={ <Navigate to='company-settings'/>}/>
                    <Route path="company-settings" element={ <CompanySettings />}/>
                    <Route path="company-branding" element={<CompanyBranding />}/>
                    <Route path="products-and-services" element={<ProductsAndServices/>}/>
                    <Route path="service-buddy-payments" element={<ServiceBuddyPayments/>}/>
                    <Route path="integrations" element={<Integrations/>}/>
                    <Route path="manage-the-team" >
                      <Route index element={<ManageTheTeam/>}/>
                      <Route path="add-new-user" element={<AddNewUser/>}/>
                    </Route>
                    <Route path="work-settings" element={<WorkSettings/>}/>
                    <Route path="calendar-settings" element={<CalendarSettings/>}/>
                  </Routes>
                  </Suspense>
                {/************************************ Account and Billing ************************************/}

                {/* Page header */}
                {/* <div className="sm:flex sm:justify-between sm:items-center">            
              <div className="mb-[10px] bottom-underline">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                Account and Billing
                </h1>
              </div>
            </div> 


                <div className="panel-block">
                  <div className="panel-title flex justify-between items-center flex-wrap">
                    <p>
                      Account Overview
                    </p>

                    <div className="admin-theme">
                    <button className="bg-blue-500 text-white btn-green small-btn">
                      Choose Plan
                    </button>
                    </div>
                  </div>

                  <div className="panel-data grid md:grid-cols-3 sm:grid-cols-1 gap-6">
                      <div className="">
                          <p className="green-light mb-[14px]">Active since</p>

                          <p className="mb-0 date">Jan 25, 2023</p>
                      </div>


                      <div className="">
                          <p className="green-light mb-[14px]">Account status</p>

                          <p className="mb-0 date">Active</p>
                      </div>

                      <div className="">
                          <p className="green-light mb-[14px]">Current plan</p>

                          <p className="mb-0 date">In trial</p>
                      </div>
                  </div>
              </div>


              <div className="panel-block">
                
                  <div className="panel-title flex justify-between items-center flex-wrap">
                    <p>
                    Billing details
                    </p>

                    <div className="admin-theme">
                    <button className="bg-blue-500 text-white btn-green small-btn white-bg">
                      Choose Plan
                    </button>
                    </div>
                  </div>

                  <div className="panel-data grid grid-cols-1 gap-6">
                      <div className="flex items-center">
                        <div className="mr-[20px]">
                          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="25" cy="25" r="25" fill="#398378"/>
                            <g clip-path="url(#clip0_1478_2255)">
                            <path d="M15 21.25C15 20.9185 15.1317 20.6005 15.3661 20.3661C15.6005 20.1317 15.9185 20 16.25 20H21.25C21.5815 20 21.8995 20.1317 22.1339 20.3661C22.3683 20.6005 22.5 20.9185 22.5 21.25C22.5 21.5815 22.3683 21.8995 22.1339 22.1339C21.8995 22.3683 21.5815 22.5 21.25 22.5H16.25C15.9185 22.5 15.6005 22.3683 15.3661 22.1339C15.1317 21.8995 15 21.5815 15 21.25Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 13.75C13.6739 13.75 12.4021 14.2768 11.4645 15.2145C10.5268 16.1521 10 17.4239 10 18.75L10 31.25C10 32.5761 10.5268 33.8479 11.4645 34.7855C12.4021 35.7232 13.6739 36.25 15 36.25H35C36.3261 36.25 37.5979 35.7232 38.5355 34.7855C39.4732 33.8479 40 32.5761 40 31.25V18.75C40 17.4239 39.4732 16.1521 38.5355 15.2145C37.5979 14.2768 36.3261 13.75 35 13.75H15ZM35 16.25H15C14.337 16.25 13.7011 16.5134 13.2322 16.9822C12.7634 17.4511 12.5 18.087 12.5 18.75V27.5H37.5V18.75C37.5 18.087 37.2366 17.4511 36.7678 16.9822C36.2989 16.5134 35.663 16.25 35 16.25ZM37.5 30H12.5V31.25C12.5 31.913 12.7634 32.5489 13.2322 33.0178C13.7011 33.4866 14.337 33.75 15 33.75H35C35.663 33.75 36.2989 33.4866 36.7678 33.0178C37.2366 32.5489 37.5 31.913 37.5 31.25V30Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1478_2255">
                            <rect width="30" height="30" fill="white" transform="translate(10 10)"/>
                            </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="black-text-block">
                          <p className="green-light mb-[5px]">No credit card</p>

                          <p className="mb-0 date">Continue using Service Buddy by choosing a plan</p>
                        </div>
                      </div>
                  </div>
              </div>


              <div className="panel-block">
                  <div className="panel-title">
                    <p>
                    Payment history
                    </p>
                  </div>

                  <div className="panel-data grid grid-cols-1 gap-6">
                      <div className="flex items-center">
                        <div className="mr-[20px]">
                          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="25" cy="25" r="25" fill="#398378"/>
                            <g clip-path="url(#clip0_1478_2255)">
                            <path d="M15 21.25C15 20.9185 15.1317 20.6005 15.3661 20.3661C15.6005 20.1317 15.9185 20 16.25 20H21.25C21.5815 20 21.8995 20.1317 22.1339 20.3661C22.3683 20.6005 22.5 20.9185 22.5 21.25C22.5 21.5815 22.3683 21.8995 22.1339 22.1339C21.8995 22.3683 21.5815 22.5 21.25 22.5H16.25C15.9185 22.5 15.6005 22.3683 15.3661 22.1339C15.1317 21.8995 15 21.5815 15 21.25Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 13.75C13.6739 13.75 12.4021 14.2768 11.4645 15.2145C10.5268 16.1521 10 17.4239 10 18.75L10 31.25C10 32.5761 10.5268 33.8479 11.4645 34.7855C12.4021 35.7232 13.6739 36.25 15 36.25H35C36.3261 36.25 37.5979 35.7232 38.5355 34.7855C39.4732 33.8479 40 32.5761 40 31.25V18.75C40 17.4239 39.4732 16.1521 38.5355 15.2145C37.5979 14.2768 36.3261 13.75 35 13.75H15ZM35 16.25H15C14.337 16.25 13.7011 16.5134 13.2322 16.9822C12.7634 17.4511 12.5 18.087 12.5 18.75V27.5H37.5V18.75C37.5 18.087 37.2366 17.4511 36.7678 16.9822C36.2989 16.5134 35.663 16.25 35 16.25ZM37.5 30H12.5V31.25C12.5 31.913 12.7634 32.5489 13.2322 33.0178C13.7011 33.4866 14.337 33.75 15 33.75H35C35.663 33.75 36.2989 33.4866 36.7678 33.0178C37.2366 32.5489 37.5 31.913 37.5 31.25V30Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1478_2255">
                            <rect width="30" height="30" fill="white" transform="translate(10 10)"/>
                            </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="black-text-block">
                          <p className="green-light mb-[5px]">No payment history</p>

                          <p className="mb-0 date">Find your past payments here when your trial ends</p>
                        </div>
                      </div>
                  </div>
              </div>


              <div className="panel-block">
                  <div className="panel-title">
                    <p>
                    Cancel your account
                    </p>
                  </div>

                  <div className="panel-data grid grid-cols-1 gap-6">
                      <div className="flex items-center">                  
                        <div className="black-text-block">
                          <p className="mb-0 date">Find your past payments here when your trial ends</p>
                        </div>
                      </div>
                  </div>
              </div> */}

                {/************************************ Company Branding ************************************/}

                {/* Page header */}
                 {/* <div className="sm:flex sm:justify-between sm:items-center">           
              <div className="mb-[10px] bottom-underline">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                Company Settings
                </h1>
              </div>
            </div>


            <div className="panel-block">
                  <div className="panel-title flex justify-between items-center">
                    <p>
                      Company Details
                    </p>
                  </div>

                  <div className="panel-data admin-theme">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[34px]">
                        <div>
                          <label
                            className="block"
                            htmlFor="company_name"
                          >
                          Company name
                          </label>
                          <input
                            id="company_name"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Company name"                       
                          />
                        </div>

                        <div>
                          <label
                            className="block"
                            htmlFor="phone_number"
                          >
                          Phone number
                          </label>
                          <input
                            id="phone_number"
                            className="form-input w-full mb-[24px]"
                            type="text"
                            placeholder="Phone number" 
                          />
                        </div>
                      

                        <div>
                          <label
                            className="block"
                            htmlFor="website_url"
                          >
                          Website URL
                          </label>
                          <input
                            id="website_url"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Website URL"                       
                          />
                        </div>


                        <div>
                          <label
                            className="block"
                            htmlFor="email"
                          >
                          Email address
                          </label>
                          <input
                            id="email"
                            className="form-input w-full mb-[24px]"
                            type="email" 
                            placeholder="Email address"                       
                          />
                        </div>


                        <div>
                          <label
                            className="block"
                            htmlFor="street_1"
                          >
                          Street 1
                          </label>
                          <input
                            id="street_1"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Street 1"                       
                          />
                        </div>


                        <div>
                          <label
                            className="block"
                            htmlFor="street_2"
                          >
                          Street 2
                          </label>
                          <input
                            id="street_2"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Street 2"                       
                          />
                        </div>


                        <div>
                          <label
                            className="block"
                            htmlFor="city"
                          >
                          City
                          </label>
                          <input
                            id="city"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="City"                       
                          />
                        </div>


                        <div>
                          <label
                            className="block"
                            htmlFor="state"
                          >
                          State
                          </label>
                          <input
                            id="state"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="State"                       
                          />
                        </div>


                        <div>
                          <label
                            className="block"
                            htmlFor="zip_code"
                          >
                          Zip code
                          </label>
                          <input
                            id="zip_code"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Zip code"                       
                          />
                        </div>


                        <div>
                          <label
                            className="block"
                            htmlFor="country"
                          >
                          Country
                          </label>
                        
                          <select className="form-select w-full mb-[24px]">
                              <option>Country</option>
                              <option>United States</option>
                              <option>India</option>                            
                            </select>
                        </div>
                  </div>


                  <div className="title-black-text flex justify-between">
                    <p className="mb-[24px]">
                      Business Hours
                    </p>

                    <div>
                    <div className="form-switch">
                    <input
                      type="checkbox"
                      id="comments"
                      className="sr-only"      
                    />
                    <label className="bg-slate-400" htmlFor="comments">
                      <span
                        className="bg-white shadow-sm"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Enable smart sync</span>
                    </label>
                  </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between">
                      <div className="timing-clock flex flex-wrap order-2 sm:order-1">
                          <div>
                            <div>
                              <p className="mb-[15px]">Sunday</p>
                            </div>
                            <div>
                              <p className="mb-[15px]">Closed</p>
                            </div>
                          </div>

                          <div>
                            <div>
                              <p className="mb-[15px]">Monday</p>
                            </div>
                            <div>
                              <p className="mb-[15px]">09:00 AM  – 05:00 PM</p>
                            </div>
                          </div>

                          <div>
                            <div>
                              <p className="mb-[15px]">Tuesday</p>
                            </div>
                            <div>
                              <p className="mb-[15px]">09:00 AM  – 05:00 PM</p>
                            </div>
                          </div>


                          <div>
                            <div>
                              <p className="mb-[15px]">Wednesday</p>
                            </div>
                            <div>
                              <p className="mb-[15px]">09:00 AM  – 05:00 PM</p>
                            </div>
                          </div>


                          <div>
                            <div>
                              <p className="mb-[15px]">Thursday</p>
                            </div>
                            <div>
                              <p className="mb-[15px]">09:00 AM  – 05:00 PM</p>
                            </div>
                          </div>


                          <div>
                            <div>
                              <p className="mb-[15px]">Friday</p>
                            </div>
                            <div>
                              <p className="mb-[15px]">09:00 AM  – 05:00 PM</p>
                            </div>
                          </div>


                          <div>
                            <div>
                              <p className="mb-[15px] md:mb-[0px]">Strurday</p>
                            </div>
                            <div>
                              <p className="mb-[15px] md:mb-[0px]">09:00 AM  – 05:00 PM</p>
                            </div>
                          </div>
                      </div>

                      <div className="order-1 sm:order-2 mb-[24px] md:mb-[0]">
                      <button className="py-2 px-4 bg-blue-500 text-white btn-green">Edit</button>
                    </div>
                  </div>

                  </div>

                
              </div>



              <div className="panel-block">
                  <div className="panel-title flex justify-between items-center flex-wrap">
                    <p className="mb-[10px] sm:mb-[0px]">
                    Tax Settings
                    </p>

                    <div className="admin-theme flex flex-wrap">
                    <button className="bg-blue-500 text-white btn-green small-btn white-bg disabled mr-[20px] my-[6px] sm:my-[0px]">
                        <svg className="mr-[6px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16675 15.8346V10.8346H4.16675V9.16797H9.16675V4.16797H10.8334V9.16797H15.8334V10.8346H10.8334V15.8346H9.16675Z" fill="#898A8F"/>
                        </svg> Create Tax Rate
                    </button>

                    <button className="bg-blue-500 text-white btn-green small-btn white-bg my-[6px] sm:my-[0px]">
                        <svg className="mr-[6px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16675 15.8346V10.8346H4.16675V9.16797H9.16675V4.16797H10.8334V9.16797H15.8334V10.8346H10.8334V15.8346H9.16675Z" fill="#398378"/>
                        </svg>Create Tax Group
                    </button>
                    </div>
                  </div>

                  <div className="panel-data admin-theme">
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[34px]">
                            <div>
                              <input
                                id="company_name"
                                className="form-input w-full mb-[14px]"
                                type="text" 
                                placeholder="Tax ID name (ex: GST)"                       
                              />
                              <p>
                              <i>Tax ID name and number will appear on invoices</i>
                              </p>
                            </div>

                            <div>
                              <input
                                id="company_name"
                                className="form-input w-full mb-[14px]"
                                type="text" 
                                placeholder="Tax ID number"                       
                              />
                            </div>
                        </div>

                    <div className="grid grid-cols-1 mt-[24px]">
                      <div className="flex items-center">
                        <div className="mr-[20px]">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="25" fill="#398378"/>
                          <path d="M33.75 16.25L16.25 33.75M31.25 33.75C30.587 33.75 29.9511 33.4866 29.4822 33.0178C29.0134 32.5489 28.75 31.913 28.75 31.25C28.75 30.587 29.0134 29.9511 29.4822 29.4822C29.9511 29.0134 30.587 28.75 31.25 28.75C31.913 28.75 32.5489 29.0134 33.0178 29.4822C33.4866 29.9511 33.75 30.587 33.75 31.25C33.75 31.913 33.4866 32.5489 33.0178 33.0178C32.5489 33.4866 31.913 33.75 31.25 33.75ZM18.75 21.25C18.087 21.25 17.4511 20.9866 16.9822 20.5178C16.5134 20.0489 16.25 19.413 16.25 18.75C16.25 18.087 16.5134 17.4511 16.9822 16.9822C17.4511 16.5134 18.087 16.25 18.75 16.25C19.413 16.25 20.0489 16.5134 20.5178 16.9822C20.9866 17.4511 21.25 18.087 21.25 18.75C21.25 19.413 20.9866 20.0489 20.5178 20.5178C20.0489 20.9866 19.413 21.25 18.75 21.25Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        </div>
                        <div className="black-text-block">
                          <p className="green-light mb-[5px]">No tax rates</p>

                          <p className="mb-[14px] date">Create one or more tax rates to apply them to quotes and invoices.</p>


                          <div className="admin-theme">
                            <div className="panel-title panel-title-c-remove">
                              <button className="bg-blue-500 text-white btn-green small-btn">                             
                              <svg className="mr-[6px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.16675 15.8346V10.8346H4.16675V9.16797H9.16675V4.16797H10.8334V9.16797H15.8334V10.8346H10.8334V15.8346H9.16675Z" fill="white"/>
                              </svg>
                              Create Tax Rate
                            </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>



              <div className="panel-block">
                  <div className="panel-title flex justify-between items-center">
                    <p>
                    Regional Settings
                    </p>
                  </div>

                  <div className="panel-data admin-theme">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[34px]">
                        <div>
                              <label
                                className="block"
                                htmlFor="country"
                              >
                              Country
                              </label>
                            
                              <select className="form-select w-full mb-[24px]">
                                  <option>Country</option>
                                  <option>United States</option>
                                  <option>India</option>                            
                                </select>
                            </div>


                            <div>
                              <label
                                className="block"
                                htmlFor="country"
                              >
                              Timezone
                              </label>
                            
                              <select className="form-select w-full mb-[24px]">
                                  <option>(GMT-05:00) America/New_York</option>
                                  <option>(GMT-05:00) America/New_York</option>
                                  <option>(GMT-05:00) America/New_York</option>                            
                                </select>
                            </div>


                            <div>
                              <label
                                className="block"
                                htmlFor="country"
                              >
                              Date format
                              </label>
                            
                              <select className="form-select w-full mb-[24px]">
                                  <option>Jan 31, 2023</option>
                                  <option>Jan 31, 2023</option>
                                  <option>Jan 31, 2023</option>                            
                                </select>
                            </div>


                            <div>
                              <label
                                className="block"
                                htmlFor="country"
                              >
                              Time format
                              </label>
                            
                              <select className="form-select w-full mb-[24px]">
                                  <option>12 Hour (1:30PM)</option>
                                  <option>12 Hour (1:30PM)</option>
                                  <option>12 Hour (1:30PM)</option>                            
                                </select>
                            </div>


                            <div>
                              <label
                                className="block"
                                htmlFor="country"
                              >
                              First day of the week
                              </label>
                            
                              <select className="form-select w-full">
                                  <option>Sunday</option>
                                  <option>Sunday</option>
                                  <option>Sunday</option>                            
                                </select>
                            </div>

                        </div>
                      </div>
                  </div>


                  <div className="flex justify-end admin-theme">
                    <button className="text-white btn-green">Update Settings</button>
                  </div>   */}

                {/************************************ Company Branding ************************************/}
                {/* <div className="sm:flex sm:justify-between sm:items-center">           
                <div className="bottom-underline">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Company Branding
                  </h1>
                </div>
            </div>

              <div>
                <p className="mb-[24px] date">Create one or more tax rates to apply them to quotes and invoices.</p>
              </div>


            <div className="panel-block">
                  <div className="panel-title flex justify-between items-center">
                    <p>
                      Social networks
                    </p>
                  </div>

                  <div className="panel-data admin-theme">

                    <div className="grid grid-cols-1">
                        <p className="mb-[24px] date">
                          Include any social media icons in emails with your clients
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[34px]">
                                              
                        <div className="relative social-networks">                       
                          <input
                            id="company_name"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Facebook page URL"                       
                          />
                          <div className="absolute top-0">
                              <svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 8C0 3.58172 3.58172 0 8 0H50V58H8C3.58172 58 0 54.4183 0 50V8Z" fill="#3B5998"/>
                                <path d="M27.5 30.875H30.625L31.875 25.875H27.5V23.375C27.5 22.0875 27.5 20.875 30 20.875H31.875V16.675C31.4675 16.6213 29.9287 16.5 28.3037 16.5C24.91 16.5 22.5 18.5713 22.5 22.375V25.875H18.75V30.875H22.5V41.5H27.5V30.875Z" fill="white"/>
                              </svg>
                          </div>
                        </div>
                    

                        <div className="relative social-networks">                       
                          <input
                            id="company_name"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Instagram account URL"                       
                          />
                          <div className="absolute top-0">
                          <svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 8C0 3.58172 3.58172 0 8 0H50V58H8C3.58172 58 0 54.4183 0 50V8Z" fill="#D62976"/>
                          <path d="M19.75 16.5H30.25C34.25 16.5 37.5 19.75 37.5 23.75V34.25C37.5 36.1728 36.7362 38.0169 35.3765 39.3765C34.0169 40.7362 32.1728 41.5 30.25 41.5H19.75C15.75 41.5 12.5 38.25 12.5 34.25V23.75C12.5 21.8272 13.2638 19.9831 14.6235 18.6235C15.9831 17.2638 17.8272 16.5 19.75 16.5ZM19.5 19C18.3065 19 17.1619 19.4741 16.318 20.318C15.4741 21.1619 15 22.3065 15 23.5V34.5C15 36.9875 17.0125 39 19.5 39H30.5C31.6935 39 32.8381 38.5259 33.682 37.682C34.5259 36.8381 35 35.6935 35 34.5V23.5C35 21.0125 32.9875 19 30.5 19H19.5ZM31.5625 20.875C31.9769 20.875 32.3743 21.0396 32.6674 21.3326C32.9604 21.6257 33.125 22.0231 33.125 22.4375C33.125 22.8519 32.9604 23.2493 32.6674 23.5424C32.3743 23.8354 31.9769 24 31.5625 24C31.1481 24 30.7507 23.8354 30.4576 23.5424C30.1646 23.2493 30 22.8519 30 22.4375C30 22.0231 30.1646 21.6257 30.4576 21.3326C30.7507 21.0396 31.1481 20.875 31.5625 20.875ZM25 22.75C26.6576 22.75 28.2473 23.4085 29.4194 24.5806C30.5915 25.7527 31.25 27.3424 31.25 29C31.25 30.6576 30.5915 32.2473 29.4194 33.4194C28.2473 34.5915 26.6576 35.25 25 35.25C23.3424 35.25 21.7527 34.5915 20.5806 33.4194C19.4085 32.2473 18.75 30.6576 18.75 29C18.75 27.3424 19.4085 25.7527 20.5806 24.5806C21.7527 23.4085 23.3424 22.75 25 22.75ZM25 25.25C24.0054 25.25 23.0516 25.6451 22.3483 26.3483C21.6451 27.0516 21.25 28.0054 21.25 29C21.25 29.9946 21.6451 30.9484 22.3483 31.6517C23.0516 32.3549 24.0054 32.75 25 32.75C25.9946 32.75 26.9484 32.3549 27.6517 31.6517C28.3549 30.9484 28.75 29.9946 28.75 29C28.75 28.0054 28.3549 27.0516 27.6517 26.3483C26.9484 25.6451 25.9946 25.25 25 25.25Z" fill="white"/>
                          </svg>
                          </div>
                        </div>


                        <div className="relative social-networks">                       
                          <input
                            id="company_name"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Twitter account URL"                       
                          />
                          <div className="absolute top-0">
                          <svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 8C0 3.58172 3.58172 0 8 0H50V58H8C3.58172 58 0 54.4183 0 50V8Z" fill="#00ACEE"/>
                          <path d="M38.075 21.5C37.1125 21.9375 36.075 22.225 35 22.3625C36.1 21.7 36.95 20.65 37.35 19.3875C36.3125 20.0125 35.1625 20.45 33.95 20.7C32.9625 19.625 31.575 19 30 19C27.0625 19 24.6625 21.4 24.6625 24.3625C24.6625 24.7875 24.7125 25.2 24.8 25.5875C20.35 25.3625 16.3875 23.225 13.75 19.9875C13.2875 20.775 13.025 21.7 13.025 22.675C13.025 24.5375 13.9625 26.1875 15.4125 27.125C14.525 27.125 13.7 26.875 12.975 26.5V26.5375C12.975 29.1375 14.825 31.3125 17.275 31.8C16.4885 32.0153 15.6627 32.0452 14.8625 31.8875C15.2021 32.9531 15.867 33.8855 16.7638 34.5537C17.6607 35.2218 18.7444 35.5921 19.8625 35.6125C17.9671 37.113 15.6175 37.9241 13.2 37.9125C12.775 37.9125 12.35 37.8875 11.925 37.8375C14.3 39.3625 17.125 40.25 20.15 40.25C30 40.25 35.4125 32.075 35.4125 24.9875C35.4125 24.75 35.4125 24.525 35.4 24.2875C36.45 23.5375 37.35 22.5875 38.075 21.5Z" fill="white"/>
                          </svg>

                          </div>
                        </div>




                        <div className="relative social-networks">                       
                          <input
                            id="company_name"
                            className="form-input w-full mb-[24px]"
                            type="text" 
                            placeholder="Google Business profile URL"                       
                          />
                          <div className="absolute top-0">
                          <svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 8C0 3.58172 3.58172 0 8 0H50V58H8C3.58172 58 0 54.4183 0 50V8Z" fill="#3CBA54"/>
                            <path d="M24.9999 40.7188C23.0726 40.7192 21.1749 40.2442 19.475 39.3359C17.7751 38.4277 16.3254 37.1142 15.2545 35.5118C14.1835 33.9094 13.5243 32.0676 13.3352 30.1495C13.1461 28.2315 13.4331 26.2964 14.1706 24.5158C14.9081 22.7351 16.0734 21.1638 17.5633 19.9412C19.0531 18.7185 20.8216 17.8822 22.7119 17.5063C24.6022 17.1304 26.5561 17.2265 28.4004 17.7862C30.2447 18.3459 31.9225 19.3518 33.2851 20.7148C33.4162 20.8455 33.5202 21.0007 33.5912 21.1717C33.6622 21.3426 33.6987 21.5259 33.6987 21.7109C33.6987 21.896 33.6622 22.0793 33.5912 22.2502C33.5202 22.4211 33.4162 22.5764 33.2851 22.707C33.0183 22.9662 32.661 23.1111 32.289 23.1111C31.917 23.1111 31.5597 22.9662 31.2929 22.707C30.4699 21.8755 29.4897 21.2162 28.4092 20.7676C27.3288 20.3189 26.1698 20.0898 24.9999 20.0938C23.2988 20.0949 21.6336 20.5833 20.2013 21.5011C18.7689 22.4188 17.6294 23.7276 16.9175 25.2726C16.2055 26.8176 15.9509 28.5341 16.1838 30.2192C16.4167 31.9044 17.1273 33.4875 18.2316 34.7815C19.3359 36.0755 20.7877 37.0261 22.4152 37.521C24.0428 38.0159 25.778 38.0343 27.4157 37.5741C29.0534 37.1139 30.525 36.1943 31.6565 34.924C32.7881 33.6538 33.5321 32.086 33.8007 30.4063H24.9999C24.627 30.4063 24.2693 30.2581 24.0056 29.9944C23.7418 29.7306 23.5937 29.373 23.5937 29C23.5937 28.627 23.7418 28.2694 24.0056 28.0056C24.2693 27.7419 24.627 27.5938 24.9999 27.5938H35.3124C35.6854 27.5938 36.0431 27.7419 36.3068 28.0056C36.5705 28.2694 36.7187 28.627 36.7187 29C36.7125 32.1061 35.4759 35.0832 33.2795 37.2796C31.0832 39.4759 28.106 40.7126 24.9999 40.7188Z" fill="white"/>
                            </svg>

                          </div>
                        </div>



                        <div className="relative social-networks">                       
                          <input
                            id="company_name"
                            className="form-input w-full"
                            type="text" 
                            placeholder="Yelp URL"                       
                          />
                          <div className="absolute top-0">
                          <svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 8C0 3.58172 3.58172 0 8 0H50V58H8C3.58172 58 0 54.4183 0 50V8Z" fill="#FF1A1A"/>
                            <g clip-path="url(#clip0_245_4202)">
                            <path d="M16.5136 28.0809L22.3507 30.9291C23.4757 31.4799 23.2999 33.127 22.0871 33.4317L15.7871 35.0026C15.6021 35.0491 15.4094 35.0554 15.2218 35.0212C15.0342 34.987 14.8561 34.913 14.6995 34.8042C14.5429 34.6954 14.4114 34.5543 14.3139 34.3904C14.2164 34.2265 14.1551 34.0437 14.1341 33.8541C13.9408 32.1692 14.1209 30.4624 14.6615 28.8549C14.7221 28.6749 14.8205 28.5099 14.95 28.3708C15.0794 28.2318 15.2371 28.122 15.4124 28.0488C15.5877 27.9755 15.7766 27.9405 15.9665 27.946C16.1564 27.9516 16.3429 27.9976 16.5136 28.0809ZM19.0917 42.0995C20.4883 43.0563 22.0761 43.6982 23.7453 43.9809C23.9331 44.0131 24.1257 44.0048 24.31 43.9564C24.4943 43.908 24.6661 43.8207 24.8139 43.7003C24.9617 43.58 25.082 43.4294 25.1667 43.2587C25.2514 43.0879 25.2986 42.9011 25.305 42.7106L25.5335 36.2172C25.5746 34.9692 24.0394 34.3475 23.2009 35.2739L18.8527 40.102C18.7254 40.2437 18.6298 40.4109 18.5723 40.5925C18.5149 40.7741 18.4969 40.9659 18.5196 41.1551C18.5423 41.3442 18.6051 41.5263 18.7039 41.6892C18.8027 41.852 18.9351 41.9919 19.0923 42.0995H19.0917ZM27.6078 35.6588L31.0537 41.1666C31.1552 41.3284 31.2901 41.4666 31.4493 41.572C31.6085 41.6775 31.7883 41.7479 31.9769 41.7784C32.1654 41.8089 32.3582 41.7988 32.5426 41.7489C32.7269 41.699 32.8985 41.6104 33.0458 41.4889C34.3518 40.4093 35.4059 39.0572 36.1343 37.5274C36.2146 37.3551 36.2575 37.1679 36.2603 36.9778C36.2631 36.7878 36.2256 36.5994 36.1504 36.4249C36.0752 36.2503 35.964 36.0937 35.824 35.9652C35.684 35.8367 35.5184 35.7393 35.338 35.6793L29.1611 33.6719C27.971 33.2911 26.9457 34.5977 27.6078 35.6588ZM36.299 27.911C35.6236 26.3573 34.6153 24.971 33.3453 23.8498C33.2024 23.7246 33.0344 23.6312 32.8527 23.5759C32.6709 23.5205 32.4794 23.5045 32.291 23.5289C32.1025 23.5533 31.9214 23.6175 31.7597 23.7173C31.598 23.8171 31.4594 23.9502 31.3531 24.1077L27.7203 29.4936C27.023 30.5307 27.9957 31.8731 29.1968 31.5274L35.4453 29.7397C35.6284 29.6858 35.798 29.5936 35.9428 29.4692C36.0876 29.3448 36.2044 29.1911 36.2853 29.0182C36.3663 28.8453 36.4095 28.6572 36.4123 28.4663C36.4151 28.2754 36.3772 28.0861 36.3013 27.911H36.299ZM17.6392 15.768C17.4732 15.8479 17.3255 15.9611 17.2053 16.1007C17.0851 16.2403 16.9949 16.4031 16.9405 16.5791C16.886 16.755 16.8685 16.9403 16.8889 17.1234C16.9093 17.3065 16.9673 17.4834 17.0591 17.643L23.1599 28.2157C23.8455 29.3993 25.6566 28.9129 25.6566 27.5477V15.3403C25.6583 15.1558 25.6215 14.973 25.5486 14.8035C25.4757 14.634 25.3683 14.4816 25.2332 14.3559C25.0982 14.2302 24.9384 14.1341 24.7642 14.0735C24.5899 14.013 24.4049 13.9894 24.221 14.0043C21.9379 14.1858 19.7072 14.7835 17.6392 15.768Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_245_4202">
                            <rect width="22.5" height="30" fill="white" transform="translate(14 14)"/>
                            </clipPath>
                            </defs>
                            </svg>
                          </div>
                        </div>


                        <div className="relative social-networks">                       
                          <input
                            id="company_name"
                            className="form-input w-full"
                            type="text" 
                            placeholder="Angie’s list member URL"                       
                          />
                          <div className="absolute top-0">
                          <svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 8C0 3.58172 3.58172 0 8 0H50V58H8C3.58172 58 0 54.4183 0 50V8Z" fill="#00A226"/>
                          <path d="M34.4576 28.9829H21.7075L20.1266 35.1739L18.5945 28.9829H15.6879C13.3111 28.9829 11.3854 27.0562 11.3854 24.6804C11.3854 22.3047 13.3111 20.3779 15.6879 20.3779H34.4576C36.8333 20.3779 38.759 22.3047 38.759 24.6804C38.759 27.0562 36.8333 28.9829 34.4576 28.9829ZM34.5161 17H15.6804C11.4397 17 8 20.4386 8 24.6794C8 28.9212 11.4397 32.3598 15.6804 32.3598H16.4454L20.101 42L23.7301 32.3598H34.5161C38.7579 32.3598 42.1965 28.9212 42.1965 24.6794C42.1965 20.4386 38.7579 17 34.5161 17Z" fill="white"/>
                          </svg>


                          </div>
                        </div>

                    </div>
                  </div>              
              </div>


              <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-x-[24px]">
                  <div className="panel-block">
                      <div className="panel-title flex justify-between items-center">
                        <p>
                          PDF Style
                        </p>
                      </div>

                      <div className="panel-data admin-theme">
                        <div className="text-center">                     
                          <button className="py-2 px-4 bg-blue-500 text-white btn-green small-btn">
                            Changes PDF Style
                            </button>
                        </div>
                      </div>
                  </div>
          


                  <div className="panel-block">
                      <div className="panel-title flex justify-between items-center">
                        <p>
                        Company Logo
                        </p>
                      </div>

                      <div className="panel-data admin-theme">
                        <div className="text-center">
                            <div>
                              <div className="no-logo">
                                No Logo
                              </div>
                            </div>

                            <input style={{ display: "none" }} ref={inputRef} type="file" readOnly/>

                          <button className="py-2 px-4 bg-blue-500 text-white btn-green small-btn"     
                          onClick={() => {
                                if (inputRef && inputRef.current) {
                                  inputRef.current.click()
                                }
                              }}>
                              Add Logo
                            </button>

                        </div>
                      </div>
                  </div>
              </div>
      

                  <div className="flex justify-end admin-theme">
                    <button className="text-white btn-green">Update Settings</button>
                  </div> */}

                {/************************************ Products & Services ************************************/}
                {/* <div className="sm:flex sm:justify-between sm:items-center">           
                <div className="bottom-underline">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Products & Services
                  </h1>
                </div>
            </div>


              <div>
                <p className="mb-[24px] date">Add or update your Products & Services to the Service Buddy Platform</p>
              </div>


              <div className="panel-block">
                  <div className="panel-title flex justify-between items-center flex-wrap">
                    <p>
                      Services
                    </p>

                    <div className="admin-theme flex flex-wrap">
                    <button className="bg-blue-500 text-white btn-green small-btn white-bg disabled mr-[20px] my-[6px] sm:my-[0px]">
                        Sort A-Z
                    </button>

                    <button className="bg-blue-500 text-white btn-green small-btn white-bg my-[6px] sm:my-[0px]">
                        <svg className="mr-[6px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16675 15.8346V10.8346H4.16675V9.16797H9.16675V4.16797H10.8334V9.16797H15.8334V10.8346H10.8334V15.8346H9.16675Z" fill="#398378"/>
                        </svg>Add Service
                    </button>
                    </div>
                  </div>

                  <div className="admin-theme">
                      <div className="flex services-list-table">
                          <div>
                            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g opacity="0.7">
                              <circle cx="1.6" cy="1.6" r="1.6" fill="#898A8F"/>
                              <circle cx="1.6" cy="6.3998" r="1.6" fill="#898A8F"/>
                              <circle cx="1.6" cy="11.2001" r="1.6" fill="#898A8F"/>
                              <circle cx="6.40005" cy="1.6" r="1.6" fill="#898A8F"/>
                              <circle cx="6.40005" cy="6.3998" r="1.6" fill="#898A8F"/>
                              <circle cx="6.40005" cy="11.2001" r="1.6" fill="#898A8F"/>
                              </g>
                            </svg>
                          </div>
                          <div className="">
                            <p className="green-text">Materials</p>
                          </div>
                          <div className="">
                            <p>No description</p>
                          </div>
                      </div>


                      <div className="flex services-list-table">
                          <div>
                            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g opacity="0.7">
                              <circle cx="1.6" cy="1.6" r="1.6" fill="#898A8F"/>
                              <circle cx="1.6" cy="6.3998" r="1.6" fill="#898A8F"/>
                              <circle cx="1.6" cy="11.2001" r="1.6" fill="#898A8F"/>
                              <circle cx="6.40005" cy="1.6" r="1.6" fill="#898A8F"/>
                              <circle cx="6.40005" cy="6.3998" r="1.6" fill="#898A8F"/>
                              <circle cx="6.40005" cy="11.2001" r="1.6" fill="#898A8F"/>
                              </g>
                            </svg>
                          </div>
                          <div className="">
                            <p className="green-text">Labor</p>
                          </div>
                          <div className="">
                            <p>Hourly labor charge</p>
                          </div>
                      </div>
                  </div>
              </div>


              <div className="panel-block">
                  <div className="panel-title flex justify-between items-center flex-wrap">
                    <p>
                      Products
                    </p>

                    <div className="admin-theme flex flex-wrap">
                    <button className="bg-blue-500 text-white btn-green small-btn white-bg disabled mr-[20px] my-[6px] sm:my-[0px]">
                        Sort A-Z
                    </button>

                    <button className="bg-blue-500 text-white btn-green small-btn white-bg my-[6px] sm:my-[0px]">
                        <svg className="mr-[6px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16675 15.8346V10.8346H4.16675V9.16797H9.16675V4.16797H10.8334V9.16797H15.8334V10.8346H10.8334V15.8346H9.16675Z" fill="#398378"/>
                        </svg>Add Service
                    </button>
                    </div>
                  </div>

                  <div className="panel-data admin-theme">
                      <div className="gri grid-cols-1">
                          <div>
                              <p className="date">Add a new product and it will show up here.</p>
                          </div>
                      </div>
                  </div>
              </div>


              <div className="panel-block">
                  <div className="panel-title flex justify-between items-center flex-wrap">
                    <p>
                      Costs
                    </p>
                  </div>

                  <div className="panel-data admin-theme">
                      <div className="flex flex-wrap justify-between">
                          <div>
                              <p className="block-main-text mb-[14px]">Product & Services costs</p>
                              <p className="date">Add a new product and it will show up here.</p>
                          </div>
                          <div>
                          
                          <div className="form-switch mt-[10px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"      
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                            

                          </div>
                      </div>
                  </div>
              </div>


              <div className="panel-block">
                  <div className="panel-title flex justify-between items-center flex-wrap">
                    <p>
                    Bulk Import Products and Services
                    </p>
                  </div>

                  <div className="panel-data admin-theme">
                    <div className="flex flex-wrap justify-between items-center">
                          <div className="basis-10/12">            
                              <p className="date">
                                Bulk import your products & services by uploading a .csv exported from programs 
                                like Microsoft Excel, Google sheets, or Numbers. 
                              </p>
                          </div>

                          <div className="panel-title panel-title-c-remove">
                            <button className="bg-blue-500 text-white btn-green small-btn white-bg my-[6px] sm:my-[0px]">
                              
                                <svg className="mr-[6px]"  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.99999 15.0013L13.3333 10.8346H10.8333V1.66797H9.16666V10.8346H6.66666L9.99999 15.0013Z" fill="#398378"/>
                                <path d="M15.8333 7.5H12.5V9.16667H15.8333V16.6667H4.16667V9.16667H7.5V7.5H4.16667C3.2475 7.5 2.5 8.2475 2.5 9.16667V16.6667C2.5 17.5858 3.2475 18.3333 4.16667 18.3333H15.8333C16.7525 18.3333 17.5 17.5858 17.5 16.6667V9.16667C17.5 8.2475 16.7525 7.5 15.8333 7.5Z" fill="#398378"/>
                                </svg>

                                Import CSV
                            </button>
                          </div>
                      </div>
                  </div>
              </div>  */}

                {/************************************ Service Buddy Payments ************************************/}

                {/* <div className="service-buddy-payments">
              <div className="sm:flex sm:justify-between sm:items-center">           
                <div className="bottom-underline">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Service Buddy Payments
                  </h1>
                </div>
            </div>


              <div>
                <p className="mb-[24px] date">We've made getting paid simple</p>

                <p className="mb-[24px] date">Turn on Service Buddy Payments to start accepting all major credit and debit cards on your invoices or quote deposits.</p>
              </div>

              <div className="flex items-center flex-wrap mb-[24px]">
                <span>
                <svg width="47" height="37" viewBox="0 0 47 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_1321_1254)">
                  <rect x="3" y="3" width="35" height="25" rx="2" fill="white"/>
                  </g>
                  <g clip-path="url(#clip0_1321_1254)">
                  <path d="M31.222 19.7681L30.997 18.6431H28.483L28.083 19.7601L26.068 19.7641C27.0273 17.4573 27.9886 15.1513 28.952 12.8461C29.116 12.4551 29.407 12.2561 29.836 12.2581C30.164 12.2611 30.699 12.2611 31.442 12.2591L33 19.7651L31.222 19.7681ZM29.049 17.1021H30.669L30.064 14.2821L29.049 17.1021ZM16.06 12.2571L18.086 12.2591L14.954 19.7691L12.903 19.7671C12.3872 17.7834 11.8779 15.7981 11.375 13.8111C11.275 13.4151 11.077 13.1381 10.696 13.0071C10.1332 12.8185 9.56784 12.6379 9 12.4651L9 12.2601H12.237C12.797 12.2601 13.124 12.5311 13.229 13.0871C13.335 13.6441 13.601 15.0621 14.029 17.3411L16.06 12.2571ZM20.87 12.2591L19.268 19.7671L17.34 19.7651L18.94 12.2571L20.87 12.2591ZM24.78 12.1201C25.357 12.1201 26.084 12.3001 26.502 12.4651L26.164 14.0221C25.786 13.8701 25.164 13.6651 24.641 13.6721C23.881 13.6851 23.411 14.0041 23.411 14.3101C23.411 14.8081 24.227 15.0591 25.067 15.6031C26.026 16.2231 26.152 16.7801 26.14 17.3851C26.127 18.6411 25.067 19.8801 22.831 19.8801C21.811 19.8651 21.443 19.7791 20.611 19.4841L20.963 17.8591C21.81 18.2141 22.169 18.3271 22.893 18.3271C23.556 18.3271 24.125 18.0591 24.13 17.5921C24.134 17.2601 23.93 17.0951 23.186 16.6851C22.442 16.2741 21.398 15.7051 21.412 14.5631C21.429 13.1011 22.814 12.1201 24.781 12.1201H24.78Z" fill="#1A1F71"/>
                  </g>
                  <defs>
                  <filter id="filter0_d_1321_1254" x="0" y="0" width="47" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="3" dy="3"/>
                  <feGaussianBlur stdDeviation="3"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1321_1254"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1321_1254" result="shape"/>
                  </filter>
                  <clipPath id="clip0_1321_1254">
                  <rect width="24" height="24" fill="white" transform="translate(9 4)"/>
                  </clipPath>
                  </defs>
                  </svg>
                </span>

                <span>
                  <svg width="47" height="37" viewBox="0 0 47 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1321_1256)">
                    <rect x="3" y="3" width="35" height="25" rx="2" fill="white"/>
                    </g>
                    <path d="M17.7467 8.58447H24.2295V20.233H17.7467V8.58447Z" fill="#FF5F00"/>
                    <path d="M18.1583 14.409C18.1583 12.0422 19.2697 9.943 20.9778 8.58466C19.7225 7.59681 18.1378 7 16.4091 7C12.3134 7 9 10.3134 9 14.409C9 18.5044 12.3134 21.8179 16.409 21.8179C18.1377 21.8179 19.7224 21.2211 20.9778 20.2332C19.2697 18.8955 18.1583 16.7757 18.1583 14.409Z" fill="#EB001B"/>
                    <path d="M32.9762 14.409C32.9762 18.5044 29.6628 21.8179 25.5672 21.8179C23.8385 21.8179 22.2538 21.2211 20.9984 20.2332C22.7272 18.8749 23.8179 16.7757 23.8179 14.409C23.8179 12.0422 22.7065 9.943 20.9984 8.58466C22.2537 7.59681 23.8385 7 25.5672 7C29.6628 7 32.9762 10.334 32.9762 14.409Z" fill="#F79E1B"/>
                    <defs>
                    <filter id="filter0_d_1321_1256" x="0" y="0" width="47" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="3" dy="3"/>
                    <feGaussianBlur stdDeviation="3"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1321_1256"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1321_1256" result="shape"/>
                    </filter>
                    </defs>
                    </svg>
                </span>

                <span>
                  <svg width="47" height="37" viewBox="0 0 47 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1321_1258)">
                    <rect x="3" y="3" width="35" height="25" rx="2" fill="white"/>
                    </g>
                    <path d="M8.37219 12.4346C8.36204 12.4606 8.31709 12.5631 8.27214 12.6627C8.22864 12.7623 8.12859 12.986 8.05174 13.1607C7.97344 13.3354 7.82264 13.6761 7.71534 13.9186C7.60804 14.1611 7.44419 14.5278 7.35284 14.7342C7.26149 14.9406 7.14549 15.2034 7.09329 15.3188C7.04254 15.4343 7.00049 15.5325 7.00049 15.5397C7.00049 15.5455 7.20639 15.5484 7.46014 15.5469L7.91834 15.5426L7.96764 15.4271C7.99519 15.3636 8.05029 15.2308 8.09089 15.1312C8.13149 15.0316 8.17064 14.9421 8.17934 14.932C8.18949 14.919 8.35914 14.9146 8.93624 14.9146H9.68009L9.81494 15.2322L9.94979 15.5498H10.4239H10.8981L10.8328 15.4011C10.7458 15.2034 10.4544 14.5465 10.4225 14.4744C10.408 14.4426 10.3108 14.2246 10.2079 13.9908C10.1035 13.7569 9.91064 13.321 9.77724 13.0236C9.64384 12.7262 9.52784 12.4606 9.51914 12.4346L9.50464 12.3884H8.94784H8.39249L8.37219 12.4346ZM9.00149 13.2906C9.06384 13.4437 9.24509 13.8753 9.26249 13.9114C9.30599 14.0038 9.37994 14.1972 9.37559 14.2087C9.37124 14.2232 8.49689 14.229 8.48239 14.216C8.47804 14.2116 8.52299 14.0961 8.58099 13.959C8.63899 13.8219 8.72309 13.6241 8.76514 13.5216C8.88694 13.2329 8.92899 13.1477 8.94204 13.1622C8.94784 13.1694 8.97539 13.2271 9.00149 13.2906Z" fill="#016FD0"/>
                    <path d="M11.0895 13.9691V15.5498L11.4998 15.5469L11.9087 15.5426L11.9116 14.4238C11.9131 13.8089 11.9189 13.3022 11.9247 13.2979C11.9305 13.2935 11.9508 13.3296 11.9682 13.3773C12.0233 13.5259 12.2553 14.1553 12.393 14.5321C12.467 14.7299 12.5351 14.9161 12.5467 14.9435C12.5569 14.9709 12.612 15.1167 12.6671 15.2683L12.7686 15.5426H13.1485H13.5284L13.6879 15.1095C13.7749 14.8713 13.8691 14.6173 13.8952 14.5465C13.9213 14.4744 13.9924 14.2795 14.0547 14.1135C14.1156 13.946 14.1881 13.7482 14.2171 13.6732C14.3302 13.3614 14.3563 13.2964 14.3679 13.2892C14.3752 13.2849 14.381 13.7901 14.381 14.4152V15.5498H14.7942H15.2075V13.9691V12.3884H14.5492H13.8909L13.8749 12.4274C13.8662 12.4505 13.8285 12.5559 13.7894 12.6627C13.4066 13.7309 13.1673 14.3791 13.1557 14.3762C13.1485 14.3733 13.0919 14.2318 13.0296 14.0615C12.7976 13.4234 12.6294 12.9658 12.4844 12.5717L12.4162 12.3884H11.7536H11.0895V13.9691Z" fill="#016FD0"/>
                    <path d="M15.8745 13.9576C15.8745 14.8223 15.8803 15.5339 15.8861 15.5426C15.8977 15.5599 18.5715 15.5628 18.5715 15.5455C18.5715 15.5397 18.5715 15.3838 18.573 15.199V14.8641L17.6479 14.8569L16.7228 14.8497V14.5899V14.33L17.6261 14.3257L18.528 14.3228V13.9691V13.6155L17.6261 13.6126L16.7228 13.6082L16.7184 13.3599C16.7155 13.1348 16.717 13.1102 16.7402 13.1001C16.7547 13.0929 17.1723 13.0886 17.6682 13.0886L18.5701 13.09L18.5744 12.7392L18.5788 12.3884H17.2274H15.8745V13.9576Z" fill="#016FD0"/>
                    <path d="M19.1515 13.9677V15.5498H19.572H19.9925L19.9954 14.9969L19.9997 14.4455L20.1534 14.4412L20.3057 14.4368L20.3854 14.5205C20.4289 14.5667 20.5449 14.6996 20.645 14.8136C20.7436 14.9291 20.9292 15.1413 21.0568 15.2856L21.2873 15.5498H21.8093H22.3328L22.2472 15.4603C22.1994 15.4112 22.1559 15.3665 22.1515 15.3621C22.1472 15.3578 22.0732 15.277 21.9862 15.1817C21.8992 15.0864 21.7977 14.9753 21.7615 14.9363C21.6629 14.8324 21.5179 14.675 21.4265 14.5754C21.3845 14.5278 21.3366 14.4787 21.3236 14.4657C21.2786 14.4253 21.2917 14.3993 21.3671 14.3805C21.4686 14.356 21.6281 14.2824 21.7107 14.2246C21.9775 14.037 22.1138 13.7858 22.1298 13.4566C22.1486 13.0669 22.0123 12.7868 21.6948 12.5674C21.6252 12.5183 21.499 12.4664 21.3482 12.4231C21.2699 12.4 21.1525 12.3971 20.2071 12.3927L19.1515 12.387V13.9677ZM21.0611 13.1174C21.1597 13.1492 21.2424 13.2286 21.2743 13.3195C21.3033 13.4061 21.3033 13.4509 21.2757 13.5303C21.2467 13.6126 21.1815 13.6775 21.0887 13.7194C21.0176 13.7511 20.9988 13.7526 20.5391 13.7569C20.2767 13.7598 20.0461 13.7584 20.0273 13.754L19.9925 13.7454V13.422C19.9925 13.2185 19.9983 13.0958 20.007 13.0929C20.0142 13.09 20.239 13.09 20.5029 13.09C20.919 13.0914 20.9959 13.0958 21.0611 13.1174Z" fill="#016FD0"/>
                    <path d="M22.6025 13.9691V15.5498H23.023H23.4435V13.9691V12.3884H23.023H22.6025V13.9691Z" fill="#016FD0"/>
                    <path d="M25.2704 12.3986C24.6643 12.4635 24.2119 12.7912 24.0263 13.3022C23.9379 13.5462 23.9292 13.6039 23.9292 13.9764C23.9292 14.3257 23.9379 14.395 24.0046 14.6043C24.035 14.7025 24.1467 14.9233 24.2018 14.9941C24.3656 15.2077 24.6034 15.3766 24.8615 15.4618C25.0471 15.5239 25.1414 15.5369 25.4517 15.5455L25.7562 15.5527L25.7982 15.4618C25.8403 15.3694 26.0331 14.9638 26.0795 14.8699C26.081 14.8656 25.9345 14.8569 25.7533 14.8526C25.5184 14.8468 25.398 14.8367 25.3357 14.8209C24.9514 14.7169 24.7571 14.4325 24.7571 13.9692C24.7571 13.5274 24.9355 13.2618 25.3139 13.1449C25.3821 13.1247 25.4792 13.1203 25.9592 13.1146L26.5247 13.1088L26.529 12.7479L26.5319 12.3885L25.9273 12.3913C25.5938 12.3913 25.298 12.3957 25.2704 12.3986Z" fill="#016FD0"/>
                    <path d="M27.5716 12.3985C27.5672 12.4057 27.4295 12.7146 27.2642 13.0885C27.0989 13.4609 26.9524 13.7929 26.9379 13.8247C26.9234 13.8564 26.8843 13.9445 26.8509 14.0196C26.7552 14.2361 26.7335 14.2837 26.7132 14.3299C26.6755 14.4137 26.4116 15.0098 26.3652 15.1167C26.3391 15.1759 26.284 15.2986 26.2434 15.3881L26.1709 15.5497L26.6349 15.5469L27.1003 15.5425L27.1612 15.3982C27.1946 15.3188 27.254 15.1773 27.2917 15.0835L27.3613 14.9146H28.1124H28.8621L28.9969 15.2322L29.1318 15.5483L29.6016 15.5526C29.8611 15.5555 30.0757 15.5541 30.0786 15.5512C30.0815 15.5483 30.0786 15.5382 30.0728 15.5295C30.0656 15.5209 30.0366 15.4574 30.0061 15.3881C29.9771 15.3188 29.9322 15.2148 29.9046 15.1571C29.8785 15.0993 29.8249 14.9795 29.7872 14.8929C29.7495 14.8049 29.7031 14.7009 29.6857 14.662C29.6509 14.5869 29.5769 14.4194 29.2376 13.6515C29.1274 13.4046 29.0259 13.1751 29.0085 13.139C28.9926 13.1029 28.9476 13.0019 28.9085 12.9152C28.8708 12.8272 28.8041 12.6756 28.7606 12.576L28.6808 12.3956L28.1298 12.3912C27.8268 12.3898 27.5745 12.3927 27.5716 12.3985ZM28.1414 13.1823C28.1414 13.191 28.2357 13.4219 28.3517 13.6977C28.4677 13.9719 28.5619 14.2029 28.5619 14.2101C28.5619 14.2159 28.3604 14.2217 28.1124 14.2217C27.8659 14.2217 27.6629 14.2159 27.6629 14.2087C27.6629 14.1986 27.7978 13.8666 27.8369 13.7814C27.8442 13.7655 27.8601 13.7265 27.8732 13.6948C27.8877 13.663 27.9399 13.5374 27.9906 13.4162C28.0414 13.2949 28.0834 13.1895 28.0834 13.1823C28.0834 13.1736 28.0965 13.1679 28.1124 13.1679C28.1284 13.1679 28.1414 13.1751 28.1414 13.1823Z" fill="#016FD0"/>
                    <path d="M30.2585 13.9691V15.5498H30.679H31.0995V14.5538C31.0995 14.0052 31.1053 13.5577 31.1126 13.5577C31.1227 13.5577 31.7955 14.5552 32.2726 15.2784L32.4524 15.5498H32.9642H33.4775V13.9691V12.3884H33.0643H32.651V13.3484C32.651 14.112 32.6467 14.3083 32.6322 14.3083C32.622 14.3083 32.6075 14.2954 32.6003 14.2795C32.5916 14.2636 32.3059 13.832 31.9623 13.3195L31.3388 12.3884H30.7994H30.2585V13.9691Z" fill="#016FD0"/>
                    <path d="M11.0895 18.0762V19.6641H12.4293C13.4878 19.6641 13.7705 19.6597 13.7749 19.6453C13.7778 19.6366 13.7807 19.4778 13.7807 19.296L13.7792 18.9639L12.8541 18.9596L11.9305 18.9567V18.6897V18.4226H12.8295H13.7285V18.0689V17.7153H12.8338L11.9377 17.7167L11.9334 17.4554L11.9305 17.1956L12.8541 17.1927L13.7792 17.1884V16.8419V16.4955L12.4351 16.4911L11.0895 16.4882V18.0762Z" fill="#016FD0"/>
                    <path d="M13.9779 16.5012C13.9823 16.5128 14.1824 16.7394 15.1118 17.7773C15.2452 17.926 15.3525 18.0559 15.3482 18.066C15.3438 18.0762 15.1205 18.3302 14.8508 18.6319C14.5797 18.9336 14.2636 19.2902 14.1447 19.423L13.9315 19.6641H14.4651H14.9987L15.2307 19.3927C15.3598 19.244 15.5512 19.0202 15.6585 18.8961C15.7658 18.7719 15.86 18.6666 15.8702 18.6622C15.8789 18.6593 15.9949 18.7806 16.1268 18.9322C16.2573 19.0852 16.4531 19.3104 16.5589 19.4331L16.7532 19.6568L17.3013 19.6612L17.8494 19.6641L17.8103 19.6179C17.774 19.576 17.4971 19.2613 17.136 18.8557C17.0679 18.7792 16.9214 18.6132 16.8098 18.4876C16.6981 18.362 16.5662 18.2133 16.5169 18.157C16.4342 18.0646 16.4081 18.0141 16.4371 18.0011C16.4429 17.9982 16.5546 17.8769 16.6865 17.7297C16.8185 17.5825 16.9461 17.4395 16.9707 17.4121C17.165 17.1956 17.7566 16.533 17.7726 16.5128C17.7914 16.4897 17.7595 16.4882 17.2622 16.4882H16.7315L16.4661 16.7943C16.3197 16.9632 16.1587 17.1494 16.108 17.2086C15.9992 17.3371 15.9006 17.441 15.889 17.441C15.8803 17.441 15.8252 17.3804 15.4105 16.8997C15.2728 16.7409 15.135 16.5835 15.1031 16.5489L15.0466 16.4882H14.5101C14.1867 16.4882 13.975 16.494 13.9779 16.5012Z" fill="#016FD0"/>
                    <path d="M17.9871 16.4969C17.9813 16.5027 17.9769 17.2172 17.9769 18.0863V19.6641H18.3974H18.8179V19.1458V18.6276L19.424 18.6218C20.107 18.6146 20.1722 18.6059 20.4042 18.4962C20.6058 18.401 20.7493 18.2696 20.8566 18.0819C20.9523 17.9159 20.9712 17.8235 20.9712 17.5493C20.9712 17.3168 20.9683 17.2981 20.9291 17.1884C20.8755 17.0339 20.8175 16.9372 20.7203 16.8318C20.5826 16.6846 20.4115 16.5864 20.1925 16.5287C20.0751 16.4983 20.0461 16.4969 19.0354 16.4926C18.4641 16.4882 17.9929 16.4911 17.9871 16.4969ZM19.9489 17.2418C20.2186 17.376 20.2012 17.7773 19.9214 17.8842C19.8619 17.9073 19.7996 17.9101 19.3399 17.9101H18.8252L18.8208 17.5521L18.8179 17.1941L19.3428 17.1985L19.8692 17.2028L19.9489 17.2418Z" fill="#016FD0"/>
                    <path d="M21.37 18.0762V19.6641H21.7905H22.211L22.2139 19.104L22.2182 18.5453L22.3719 18.541L22.5271 18.5366L22.7707 18.8167C22.9055 18.9697 23.1274 19.2238 23.2622 19.3797L23.5087 19.6626H24.0293L24.5513 19.6641L24.515 19.6236C24.4947 19.602 24.3947 19.4937 24.2917 19.3826C24.1888 19.2714 24.0742 19.1473 24.038 19.1083C24.0017 19.0679 23.8973 18.9538 23.8045 18.8557C23.558 18.5915 23.5 18.5237 23.5087 18.5107C23.5116 18.5034 23.5406 18.4933 23.5696 18.4876C23.7146 18.4616 23.9249 18.3475 24.051 18.2292C24.2598 18.0328 24.3483 17.8076 24.3468 17.4843C24.3468 17.3226 24.341 17.2909 24.3033 17.1783C24.2323 16.9747 24.1554 16.8636 23.9916 16.7308C23.8379 16.6052 23.632 16.5287 23.3855 16.5027C23.2985 16.494 22.8504 16.4882 22.3038 16.4882H21.37V18.0762ZM23.2637 17.2172C23.3492 17.2418 23.4449 17.3183 23.4783 17.389C23.5044 17.4439 23.5102 17.5911 23.487 17.6489C23.4638 17.7124 23.3724 17.799 23.3014 17.8264C23.2405 17.8495 23.181 17.8524 22.7257 17.8524H22.2182L22.2139 17.542C22.2124 17.3717 22.2139 17.2245 22.2168 17.2143C22.2284 17.1855 23.1651 17.1884 23.2637 17.2172Z" fill="#016FD0"/>
                    <path d="M24.821 18.0762V19.6641H26.1695H27.518V19.3104V18.9567L26.5944 18.9538L25.6693 18.9495V18.6897V18.4298L26.5726 18.4255L27.4745 18.4226L27.4716 18.0718L27.4673 17.7225L26.5654 17.7181L25.662 17.7153V17.4554V17.1956H26.59H27.518V16.8419V16.4882H26.1695H24.821V18.0762Z" fill="#016FD0"/>
                    <path d="M28.8448 16.5027C28.2633 16.5662 27.895 16.9488 27.895 17.4886C27.895 17.7211 27.9704 17.952 28.0893 18.0834C28.1183 18.1151 28.1415 18.1455 28.1415 18.1512C28.1415 18.17 28.3242 18.2869 28.4098 18.3259C28.5954 18.4067 28.6418 18.4111 29.2435 18.4212C29.867 18.4313 29.8714 18.4313 29.9511 18.5352C30.0004 18.5987 30.0135 18.7402 29.9772 18.8095C29.9453 18.8701 29.8728 18.9235 29.7945 18.9409C29.7539 18.951 29.4059 18.9567 28.8636 18.9567H27.9965V19.3119V19.6655L28.9579 19.6598C29.4857 19.6569 29.9337 19.6511 29.954 19.6453C29.9743 19.6395 30.0106 19.6323 30.0338 19.6266C30.2397 19.5876 30.4383 19.4836 30.5732 19.3436C30.7588 19.1516 30.8385 18.9394 30.8385 18.6319C30.8385 18.2335 30.6761 17.9693 30.3383 17.8163C30.173 17.7413 30.0468 17.7268 29.461 17.7167C28.8564 17.7066 28.8636 17.7081 28.7853 17.607C28.707 17.5045 28.7273 17.3385 28.8288 17.2635C28.9173 17.197 28.9332 17.1956 29.7075 17.1956C30.2788 17.1956 30.447 17.1913 30.4586 17.1768C30.4789 17.1523 30.766 16.5244 30.766 16.5041C30.766 16.4854 29.0202 16.4839 28.8448 16.5027Z" fill="#016FD0"/>
                    <path d="M32.0202 16.4982C31.9115 16.5069 31.7447 16.5488 31.636 16.5935C31.3518 16.709 31.1676 16.9154 31.0763 17.2171C31.04 17.3384 31.04 17.6285 31.0763 17.7585C31.1633 18.076 31.3822 18.2868 31.723 18.3821C31.8216 18.4095 31.8839 18.4124 32.3972 18.4211C32.9584 18.4297 32.9627 18.4297 33.0178 18.4629C33.0468 18.4817 33.0903 18.5207 33.1121 18.5495C33.1454 18.5928 33.1512 18.6145 33.1512 18.6881C33.1498 18.7935 33.1121 18.8613 33.0222 18.9148L32.9627 18.9494L32.0521 18.9537L31.143 18.9581L31.1459 19.3074L31.1502 19.6567H32.0927C32.8438 19.6567 33.0555 19.6524 33.1367 19.6365C33.5833 19.547 33.8632 19.3002 33.9661 18.9061C34.0009 18.7675 34.0009 18.4947 33.9647 18.3648C33.8719 18.0299 33.6399 17.8263 33.2614 17.7498C33.1773 17.731 33.0294 17.7253 32.6365 17.7209C32.3537 17.7166 32.0971 17.7079 32.0681 17.6993C31.9477 17.6675 31.8694 17.5362 31.8912 17.4062C31.9028 17.3297 31.9956 17.2345 32.0782 17.2114C32.1174 17.2012 32.3769 17.1955 32.8699 17.1955H33.6036L33.6558 17.0829C33.8516 16.6642 33.927 16.4997 33.927 16.4939C33.927 16.4867 32.1 16.491 32.0202 16.4982Z" fill="#016FD0"/>
                    <defs>
                    <filter id="filter0_d_1321_1258" x="0" y="0" width="47" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="3" dy="3"/>
                    <feGaussianBlur stdDeviation="3"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1321_1258"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1321_1258" result="shape"/>
                    </filter>
                    </defs>
                    </svg>
                  </span>

                  <span className="payment-transaction mr-[10px]">
                    3.1% + 30  / TRANSACTION
                  </span>

                  <span className="payment-transaction">
                    1% / BANK TRANSFER (ACH)
                  </span>
              </div>


                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[34px]">
                    
                      <div className="panel-title">
                        <p className="uppercase mb-[14px]">
                          WE'VE GOT YOU COVERED
                        </p>

                        <div className="ml-2 mb-[24px] checkbox-block">
                          <label
                            className="block text-sm mb-1 flex"
                            htmlFor="reminder_checkbox"
                          >
                          
                            <input
                              className="form-checkbox mr-[12px]"
                              type="checkbox"
                              checked="checked"                        
                            />
                            <p><span>Contactless payments.</span> Send invoices by text message or email and let your clients pay online.</p>
                          </label>
                        </div>


                        
                        <div className="ml-2 mb-[24px] checkbox-block">
                          <label
                            className="block text-sm mb-1 flex"
                            htmlFor="reminder_checkbox"
                          >
                          
                            <input
                              className="form-checkbox mr-[12px]"
                              type="checkbox"
                              checked="checked"                        
                            />
                          
                          <p><span> Save cards on file.</span> Securely save your client's cards on file for future billing or set up automatic payments (on available plans).</p>
                          </label>
                        </div>

                        <div className="ml-2 mb-[24px] checkbox-block">
                          <label
                            className="block text-sm mb-1 flex "
                            htmlFor="reminder_checkbox"
                          >
                          
                            <input
                              className="form-checkbox mr-[12px]"
                              type="checkbox"
                              checked="checked"                        
                            />
                              <p>
                                <span>Instant payouts.</span> Have the flexibility to speed up your cash flow and get paid out in seconds for an additional 1% fee.
                                </p>
                          </label>
                        </div>      


                        <div>
                          <div className="panel-title">
                            <p className="mb-[14px] mt-[6px]">
                              Verify business details
                            </p>
                          </div>

                          <div className="verify-business-details">
                            <p className="mb-[24px]">We'll need your <span>legal business name</span> and <span>SSN</span> as part of US legal requirements to verify your identity.</p>

                            <p className="mb-[24px]">Rest assured,that all of your personal information is kept secure by our bank level encryption.</p>

                            <div className="admin-theme">
                            <button className="py-2 px-4 bg-blue-500 text-white btn-green mt-[6px]">Finish Verification</button>
                            </div>
                          </div>

                          <div className="panel-title">
                            <p className="mb-[14px] mt-[30px]">
                              Where should we deposit your money
                            </p>
                          </div>

                            <div className="verify-business-details">
                              <p className="mb-[24px]">
                              To deposit your money into your bank, we'll need your bank details. Don't have your bank login? Connect manually instead.
                              </p>


                            <div className="admin-theme">
                            <button className="py-2 px-4 bg-blue-500 text-white btn-green mt-[6px]">Connect</button>
                            </div>
                            </div>
                        </div>        

                      </div>
                  

                    <div className="">
                      <div className="image-inside-text">
                        <img src={service_buddy_payments}  />
                        <p>
                        No more chasing down unpaid invocies.  Automate Payments with <span>Service Buddy</span>
                        </p>
                      </div>
                    </div>
                </div>

                <div className="green-border mt-[30px] mb-[24px]">
                  
                </div>
                <div className="text-center">
                  <p className="chat-with-text">Have a question before you want to get started? <span>Chat with a payments specialist.</span></p>
                </div>
                </div> */}

                {/************************************ Products & Services ************************************/}
                {/* <div className="sm:flex sm:justify-between sm:items-center">
                  <div className="bottom-underline">
                    <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                      Integrations
                    </h1>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8 gap-x-6 gap-y-7">
                  <div className="col-span-full xl:col-span-6 2xl:col-span-4 integration-box">
                    <div className="flex flex-col h-full px-5 py-6">
                      <div className="grow">
                        <header className="flex items-center mb-[21px]">
                          <svg
                            width="152"
                            height="63"
                            viewBox="0 0 152 63"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M76.6576 1.09353L71.5122 2.18731V6.43917C71.5122 9.22752 71.5353 10.6987 71.5892 10.6987C71.674 10.6987 81.6489 8.55739 81.8569 8.49577C81.9801 8.45726 81.9878 8.18767 81.9878 4.2208C81.9878 0.885558 81.9647 -0.00794888 81.8954 -0.000246048C81.8415 -0.000246048 79.4844 0.492723 76.6576 1.09353Z"
                              fill="#008CDD"
                            />
                            <path
                              d="M33.8849 5.96183L28.8011 7.0402V24.6407C28.8011 41.3093 28.8089 42.2798 28.9398 42.9268C29.3943 45.1529 30.3186 46.9168 31.8437 48.4419C34.0544 50.668 36.9968 51.7233 40.5092 51.5615C43.0742 51.446 45.0922 51.0608 46.5557 50.3984L47.0179 50.1904V45.954V41.7252L46.8484 41.7714C45.9164 42.0487 44.7918 42.2875 44.1371 42.3491C41.8263 42.5725 40.178 41.8562 39.4616 40.3233C38.9995 39.3374 39.0072 39.5146 39.0072 30.8568V22.9462H43.0125H47.0179V18.4786V14.0111H43.0125H39.0072L38.9917 9.44342L38.9686 4.87576L33.8849 5.96183Z"
                              fill="#008CDD"
                            />
                            <path
                              d="M12.1249 13.3639C8.78969 13.7491 6.4789 14.5425 4.40689 16.0137C4.03716 16.2756 3.39784 16.8378 2.9819 17.2692C1.50299 18.7943 0.655697 20.4196 0.178133 22.6379C0.0240799 23.3235 0.000971937 23.6855 0.000971937 25.0258C-0.00673071 26.0656 0.0317825 26.7897 0.101106 27.144C0.686507 30.1403 2.44271 32.2971 5.67012 33.9916C6.79471 34.5847 7.75754 34.9853 10.3918 35.9635C12.9491 36.9186 14.0121 37.3962 14.7053 37.9046C15.5834 38.5516 15.9223 39.1447 15.9223 40.0074C15.9146 41.2783 15.1598 42.064 13.627 42.4106C12.9645 42.5647 10.8232 42.5801 9.92968 42.4414C6.95646 41.987 4.05256 41.0627 1.33353 39.6916C0.871371 39.4605 0.478536 39.2757 0.455428 39.2757C0.43232 39.2757 0.416915 41.5094 0.416915 44.2362V49.2044L1.40285 49.5818C7.58808 51.9927 14.4896 52.2315 19.4733 50.2057C24.0871 48.334 26.6059 44.6367 26.6059 39.7378C26.6059 35.0931 24.4954 31.989 19.8892 29.8476C18.8879 29.3778 18.0791 29.0696 15.8607 28.2994C12.279 27.0593 11.3162 26.5355 10.777 25.5572C10.3918 24.8409 10.5151 23.8473 11.0697 23.2696C11.3932 22.9229 11.9478 22.6533 12.5794 22.5147C13.1802 22.3915 15.0828 22.376 16.0918 22.4839C18.7877 22.792 21.7995 23.6547 23.9947 24.7562C24.2874 24.9025 24.5416 25.0258 24.5647 25.0258C24.5878 25.0258 24.6032 22.8228 24.6032 20.1346V15.2357L24.272 15.097C22.8239 14.4731 20.2358 13.8261 17.9019 13.5026C17.0623 13.3871 12.8182 13.2869 12.1249 13.3639Z"
                              fill="#008CDD"
                            />
                            <path
                              d="M102.284 13.4027C100.05 13.7493 97.9785 14.689 96.2608 16.1448C95.9912 16.3759 95.7524 16.553 95.7447 16.5376C95.7293 16.5299 95.6061 15.9445 95.4597 15.2436L95.1978 13.9727L90.5916 13.9495L85.9932 13.9341V38.4671C85.9932 51.9621 86.0163 63 86.0548 63C86.0856 63 88.4426 62.507 91.2926 61.9062L96.4688 60.8124V54.8583C96.4688 51.5847 96.4842 48.9042 96.5073 48.9042C96.5304 48.9042 96.9001 49.1429 97.3315 49.4356C99.3881 50.8067 101.198 51.4075 103.555 51.4999C108.778 51.6925 113.23 48.9889 115.833 44.0515C117.189 41.4788 117.982 38.3823 118.275 34.5772C118.383 33.106 118.321 30.0558 118.159 28.7232C117.127 20.5738 112.868 15.0202 106.521 13.5413C105.974 13.4181 105.504 13.3796 104.287 13.3564C103.44 13.341 102.538 13.3564 102.284 13.4027ZM102.33 22.6689C105.435 23.2235 107.584 26.5203 107.961 31.319C108.277 35.3398 106.983 39.3298 104.78 41.1168C103.755 41.941 102.762 42.2799 101.321 42.2799C99.6191 42.2799 98.1788 41.7946 97.0465 40.8395L96.5073 40.385L96.4842 32.5437C96.4688 25.8655 96.4842 24.687 96.5766 24.5484C96.6382 24.4637 96.8847 24.2249 97.1312 24.0169C98.4406 22.9077 100.574 22.3608 102.33 22.6689Z"
                              fill="#008CDD"
                            />
                            <path
                              d="M134.135 13.4332C129.829 14.0264 126.186 16.3526 123.729 20.0729C122.111 22.5301 121.094 25.2953 120.571 28.6845C120.44 29.5318 120.401 30.2327 120.37 31.9966C120.332 34.3536 120.416 35.6092 120.725 37.4039C122.111 45.3453 127.064 50.275 134.751 51.338C135.93 51.5074 138.579 51.5613 139.95 51.4535C143.301 51.1839 146.359 50.3751 148.793 49.1196L149.386 48.8115V44.629V40.4464L148.554 40.8162C146.282 41.8329 143.779 42.4491 141.075 42.6648C136.831 42.9883 133.989 42.2103 132.386 40.2847C131.655 39.3989 131.077 37.9816 130.931 36.7338L130.877 36.2716H141.167H151.45L151.504 35.2163C151.589 33.6373 151.504 30.0093 151.35 28.8771C150.164 19.9189 145.558 14.3653 138.533 13.4332C137.524 13.2946 135.136 13.2946 134.135 13.4332ZM137.37 21.8985C139.688 22.3914 141.244 24.3941 141.606 27.3365C141.645 27.6908 141.683 28.1145 141.683 28.2762V28.5689H136.215H130.746V28.1992C130.746 27.66 130.946 26.443 131.139 25.8345C131.578 24.4095 132.51 23.1771 133.65 22.507C134.72 21.8831 136.168 21.6443 137.37 21.8985Z"
                              fill="#008CDD"
                            />
                            <path
                              d="M65.119 13.6335C64.549 13.7028 63.4553 14.034 63.0008 14.2574C62.038 14.7504 61.1522 15.5438 60.5129 16.5066C60.2895 16.8378 60.0969 17.0612 60.0815 16.9996C60.0584 16.9456 59.9198 16.3063 59.7657 15.59C59.6116 14.8659 59.4653 14.2189 59.4499 14.1419C59.4114 14.0186 59.1264 14.0109 54.9053 14.0109H50.407V32.4203V50.8296H55.6448H60.8826V38.2974V25.7575L61.5219 25.1413C62.608 24.0937 63.694 23.593 65.3501 23.3542C66.1589 23.2464 66.4208 23.2387 67.1911 23.3157C67.684 23.362 68.2463 23.4544 68.4543 23.516L68.8163 23.6238V18.7866V13.9493L68.3002 13.8261C67.2142 13.5642 66.1512 13.5026 65.119 13.6335Z"
                              fill="#008CDD"
                            />
                            <path
                              d="M71.5122 32.4203V50.8296H76.75H81.9878V32.4203V14.0109H76.75H71.5122V32.4203Z"
                              fill="#008CDD"
                            />
                          </svg>
                        </header>

                        <div className="text-sm">
                          Connect your stripe account to accept payments.
                        </div>

                        <p className="flex items-center my-[21px] pb-[15px] accounts-connected">
                          <span className="mr-[4px]">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1597_3756)">
                                <path
                                  d="M18.6055 14.6002C18.5665 14.4616 18.4751 14.3436 18.3508 14.2711C18.2264 14.1985 18.0787 14.1771 17.9389 14.2113L16.5555 14.5835C17.3125 13.4677 17.7715 12.1768 17.8889 10.8335C18.0023 9.57678 17.8186 8.31098 17.3524 7.1384C16.8863 5.96581 16.1509 4.91933 15.2055 4.08351C15.0963 3.99312 14.9565 3.94795 14.815 3.95725C14.6735 3.96655 14.5409 4.02961 14.4444 4.13351C14.3473 4.24407 14.298 4.38865 14.3074 4.53551C14.3168 4.68238 14.384 4.81952 14.4944 4.91684C15.309 5.63586 15.9427 6.53667 16.3443 7.54628C16.7458 8.55588 16.9038 9.64588 16.8055 10.728C16.7104 11.8677 16.3281 12.9648 15.6944 13.9168L15.5555 12.5224C15.566 12.4403 15.558 12.357 15.5322 12.2784C15.5063 12.1998 15.4632 12.128 15.406 12.0682C15.3489 12.0084 15.2791 11.9621 15.2017 11.9327C15.1244 11.9033 15.0415 11.8916 14.959 11.8984C14.8766 11.9051 14.7967 11.9302 14.7251 11.9718C14.6536 12.0134 14.5923 12.0704 14.5457 12.1388C14.499 12.2071 14.4682 12.285 14.4555 12.3667C14.4428 12.4485 14.4485 12.532 14.4722 12.6113L14.75 16.1891L18.2222 15.2668C18.3597 15.2266 18.4764 15.1348 18.5479 15.0106C18.6193 14.8863 18.64 14.7393 18.6055 14.6002Z"
                                  fill="#898A8F"
                                />
                                <path
                                  d="M2.39446 9.48901C2.46829 9.53649 2.55181 9.56686 2.6389 9.5779C2.78389 9.59692 2.93053 9.558 3.04702 9.4696C3.1635 9.3812 3.24043 9.25043 3.26112 9.10567C3.49068 7.41076 4.35205 5.86512 5.67273 4.77828C6.99342 3.69145 8.67594 3.14364 10.3833 3.24456L9.1389 4.09456C9.05085 4.1609 8.98453 4.25193 8.94837 4.35607C8.91221 4.46021 8.90785 4.57275 8.93585 4.67938C8.96384 4.78601 9.02293 4.88189 9.10559 4.95484C9.18824 5.02778 9.29073 5.07449 9.40001 5.08901C9.52517 5.10045 9.65052 5.06911 9.75557 5.00012L12.7167 2.96679L10.1833 0.422341C10.1383 0.353264 10.0784 0.295092 10.008 0.252049C9.93764 0.209006 9.85857 0.182171 9.77655 0.173493C9.69452 0.164815 9.61159 0.174512 9.53377 0.201879C9.45596 0.229247 9.38522 0.273598 9.32668 0.331713C9.26815 0.389828 9.22329 0.460249 9.19536 0.537862C9.16743 0.615475 9.15713 0.698334 9.16522 0.780422C9.17331 0.86251 9.19957 0.941768 9.2421 1.01244C9.28464 1.08311 9.34237 1.14343 9.41112 1.18901L10.3556 2.13345C8.38381 2.03917 6.44835 2.68754 4.93128 3.95057C3.41421 5.21359 2.42578 6.99948 2.16112 8.95567C2.14688 9.05746 2.16115 9.16119 2.20234 9.25535C2.24353 9.34951 2.31004 9.43039 2.39446 9.48901Z"
                                  fill="#898A8F"
                                />
                                <path
                                  d="M12.0723 16.6276C11.2047 16.9047 10.2896 17.0012 9.38337 16.9109C8.27968 16.8028 7.2189 16.4276 6.29262 15.8178C5.36633 15.208 4.60238 14.382 4.0667 13.4109L5.45003 13.9276C5.57755 13.9497 5.70878 13.9266 5.82109 13.8623C5.93339 13.798 6.01972 13.6965 6.06516 13.5753C6.1106 13.4541 6.11231 13.3209 6.06999 13.1986C6.02767 13.0763 5.94398 12.9726 5.83337 12.9054L3.28337 11.9609L2.4667 11.6665L1.85003 15.1943C1.82865 15.3353 1.86229 15.479 1.94399 15.5959C2.02569 15.7128 2.14918 15.7937 2.28892 15.8221H2.38337C2.51412 15.8244 2.64152 15.7806 2.74315 15.6983C2.84477 15.616 2.9141 15.5005 2.93892 15.3721L3.17225 14.0387C3.8006 15.1394 4.68318 16.0738 5.74629 16.7639C6.80941 17.4539 8.02219 17.8796 9.28337 18.0054C10.3378 18.1099 11.4024 17.9964 12.4111 17.6721C12.5396 17.6189 12.6434 17.5195 12.7021 17.3935C12.7609 17.2675 12.7702 17.124 12.7284 16.9915C12.6865 16.8589 12.5965 16.7469 12.476 16.6774C12.3556 16.608 12.2135 16.5863 12.0778 16.6165L12.0723 16.6276Z"
                                  fill="#898A8F"
                                />
                                <path
                                  d="M12.2222 7.22217H7.77772C7.63038 7.22217 7.48907 7.2807 7.38489 7.38489C7.2807 7.48907 7.22217 7.63038 7.22217 7.77772V12.2222C7.22217 12.3695 7.2807 12.5108 7.38489 12.615C7.48907 12.7192 7.63038 12.7777 7.77772 12.7777H12.2222C12.3695 12.7777 12.5108 12.7192 12.615 12.615C12.7192 12.5108 12.7777 12.3695 12.7777 12.2222V7.77772C12.7777 7.63038 12.7192 7.48907 12.615 7.38489C12.5108 7.2807 12.3695 7.22217 12.2222 7.22217ZM11.6666 11.6666H8.33328V8.33328H11.6666V11.6666Z"
                                  fill="#898A8F"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1597_3756">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          15+ accounts connected
                        </p>

                        <div className="admin-theme">
                          <button className="bg-blue-500 text-white btn-green small-btn">
                            Connect Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full xl:col-span-6 2xl:col-span-4 integration-box">
                    <div className="flex flex-col h-full px-5 py-6">
                      <div className="grow">
                        <header className="flex items-center">
                          <svg
                            width="63"
                            height="63"
                            viewBox="0 0 63 63"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <rect
                              width="63"
                              height="63"
                              fill="url(#pattern0)"
                            />
                            <defs>
                              <pattern
                                id="pattern0"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1"
                              >
                                <use
                                  xlinkHref="#image0_1597_3773"
                                  transform="scale(0.00195312)"
                                />
                              </pattern>
                              <image
                                id="image0_1597_3773"
                                width="512"
                                height="512"
                                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAgAElEQVR4nOzdd4Acdf3/8dd7Znav5dJJp5MuzQCR3F1MCM0uKBEFERWlSkIqTTlqyl0aFkTFhliCoihFICH5koT8aNJMuYSi9BLSc2V3Z96/PyASklyu7e77s7uvx1/mbnfm+SX3vXlnduYzABEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREVF+EusAIkqfqpvW7yfFqT5R6PcG0EshvTxN7afwywAtEU/KIkTlAs/b+R4BIgDbAE2q6laBtyXScKsvsknD6C2F/5pE3hvLrhz4rt3/ZUSUbhwAiHLQmNq6nskIx4no4SoyRIBhqhgsQJcM7rYRghehWAXIc4Lo3xp4zy+fOPBliGgG90tEGcABgCgHjKpZ/TGBPwbASIGMBHSgddNOArwHlRUQLBcvXLFhW/Tk6urhCesuIto3DgBEDqqc8Vw3icXHqcqpAE4BMMC6qfW0HpAlonpv6EX3PTpl2H+ti4hoTxwAiBxROeO5bgiKvwjgK4COAxBYN6WF4nlA7/bU+/0j0wetsc4hovdxACAyNKx6VbxbaXCaiJ4FyCkA4tZNmaX/AuQOjfSPK6YPecO6hqiQcQAgMnD83Lr+fqhnA3IJcur0ftpEAB4GvJuXTznsHl5ESJR9HACIsqhi1tqxnidTFDgVgNfiGwpDHURvScb9Xz126cCt1jFEhYIDAFEWVNasO1EQXaeQ461bHLYNkJ+EfnL2yknDN1rHEOU7DgBEmaIqVTXrT1fR7wM40jonh2wD5CcRvLmPTj3sHesYonzFAYAoA0bV1h0riloBRlu35LAdgPxIo+jGFdOHbLOOIco3HACI0qhi5osHiJ+6AcDZ4P9/pcvrEFzX94BBt905XkLrGKJ8wV9QRGkwrHpVvEen4HJVXAmgyLonP+m/IpELHp0y+AnrEqJ8wAGAqIOqZq+tUE9uhWK4dUsBiKD4hapO4ccCRB3DAYConSpmrS0XDzWAfBf8/6WsUsF/JNILl08b8k/rFqJcxV9aRO1QMWvtMeJ5v3fpoTwF6vZSNF744NQjd1iHEOUaDgBEbaEqlXPqLoXKbOT9sr05Y63neV97ZPLA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xeVbCwvb7LrB8UnAGaF7MpiD/83N5tSWFWXtq9LZOwAcou+i4ZeRZ9PcGUKO/JuS6HPwBRblz11XWpkx75+KSAYr92hQm02XG4mbHOsfOieDNAIVnohm187s8nromBOVU5vl+RXDu7rZtbhNcLxd6J6wvMGdh/Jacv/aEVUfha4Rkew0cE7DYIMpGFfQXM9mcTYT2UOJyB9aM6UoZ+6g5tQAcFCPJSVtW3s80tx/DlxI8/mh/QKoxFhQN3pZbegYEckdA2ev72B5lOBWAgwM3ZMGezFbjnNvTVmXFZl2iE8y5OQAcKjiJSVnmifGmDPcoR+592/eAzwHXrU3se/J18Y99UnoIBHJbRfM3tA9jny0wTiHzqF7kmgPxgpiKlvF+U88P7PTztBBqZRrm+FR9V9S8t2mODHM4TJgCNA2dNNx+hj3p82oits0PVv/kyd3hw4SkWbI3QbP3dQrJr4U4xLbf2cg2z7otsWNFRE80RQVPrdmyhl7QgelS7MaAA5VvGBCQdRu+wBP2BAiBuDeD+zk0F2H4/CuwSqDVY6vrFt/3huUl8ehu0REDlVcvrWwVdvPLozcLo3xC23/q9oFobv+n/8b7CXcqymIqmsmd90cuiiUZjsAfFXJkpK8zezrgef3No97AueZ2bnunJbGjH1gDe7xmxbZG+7+RpSw+nXjljXbH1ARyV49yl9vcWphi3NiS/Qys144vYCepOfuayNYgzmvYrwaG6+4R6+untZZx50foAHga/RbOPTkRF5hJ/BObnZmhHdw9/aYnQ60A2sB3gYoMKyt4/nAScBuw/Y63gQc/KrezgN/3ur4Nojex3jPPPFBhL1V2P6TzTqVT0Ry3eDbN37HWtIxjunoxN8zrKM5Hd28PVg++EkYrYhpjdEWrAC8EWcXxhfAHvBdYI3AhzjvEvkWJ9oSJfw/tEhsWbWz+zbKTXdKRURERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERESy1H8BaepV5PT2quYAAAAASUVORK5CYII="
                              />
                            </defs>
                          </svg>
                        </header>

                        <div className="text-sm my-[50px]">
                          Google Ads Integration.
                        </div>

                        <div className="admin-theme">
                          <button className="bg-blue-500 text-white btn-green small-btn white-bg">
                            Coming Soon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full xl:col-span-6 2xl:col-span-4 integration-box">
                    <div className="flex flex-col h-full px-5 py-6">
                      <div className="grow">
                        <header className="flex items-center">
                          <svg
                            width="182"
                            height="63"
                            viewBox="0 0 182 63"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <rect
                              width="182"
                              height="63"
                              fill="url(#pattern1)"
                            />
                            <defs>
                              <pattern
                                id="pattern1"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1"
                              >
                                <use
                                  xlinkHref="#image0_1597_3784"
                                  transform="matrix(0.000392465 0 0 0.00113379 -0.00235479 0)"
                                />
                              </pattern>
                              <image
                                id="image0_1597_3784"
                                width="2560"
                                height="882"
                                xlinkHref="data:image/png;base64,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+fzfAJwP4PwwDNPDw8MHisgBqrq7iOwOYFsRaVPVJmza1vdpAMMAfgvgd57n3d3S0vKzMAyLdp8FERHR7HAAkIiIiIiIiCihwjCcVygUTrbumMTX1qxZM/bs/xDH8UUiktQBQAFwBoBPWocQERERERERUWWND/HdOf5GREQ0Z3jWAURERERERES0ZSMjI+8EsJ11x0RU9eLn/rc4ji8DsMEgpyyqemYYhnw+hIiIiIiIiIiIiIgaAp/wJiIiIiIiIkooVU3y9r+/yefz/3FH/eDg4JMicqNFUJkWFAqFN1pHEBERERERERERERFVAgcAiYiIiIiIiBIom83uDOAo646JqOqFE/1eHMcX1bJlBpI8WElEREREREREREREVDYOABIRERERERElkKqeASBl3TEBjeP40ol+s729/XoAf69hz3Sd1NPT8zzrCCIiIiIiIiIiIiKi2eIAIBEREREREVECjQ8AJtX3BwcHfz/Rb4ZhuFFE1tYyaJq2KpVKJ1lHEBERERERERERERHNFgcAiYiIiIiIiBLGOXcIgL2sOyaiqhdP9T6lUonbABMRERERERERERERVRkHAImIiIiIiIiS50zrgElsnDdv3teneqeBgYE7APy6Bj0z9dpsNrundQQRERERERERERER0WxwAJCIiIiIiIgoQcIwbAbwLuuOSVy/fPnyv5f5vl+rasksxXF8unUDEREREREREREREdFscACQiIiIiIiIKEEKhcIJALa27piIqpa9tW86nf4/AFrFnNk6q7OzM2UdQUREREREREREREQ0UxwAJCIiIiIiIkqWJG//+9TGjRtvLPedV6xY8TCAH1axZ7Z22W233Q63jiAiIiIiIiIiIiIimikOABIRERERERElRCaT2QXAEdYdExGRy4eGhjZM52Oms2KgBRE5y7qBiIiIiIiIiIiIiGimOABIRERERERElBCpVOosAEnekvbi6X5AU1PT5QCmNTRYYycsXbo0sVsuExERERERERERERFNhgOARERERERERMlxmnXARFT14Vwud8d0P27FihVPAbihCkmV0pxKpU62jiAiIiIiIiIiIiIimgkOABIRERERERElgO/7rwXwMuuOiXiedyEAncnHchtgIiIiIiIiIiIiIqLq4AAgERERERERUQJ4nnemdcNkROTSmX7s8PDwDQD+VsGcSjvE9/3EDl8SEREREREREREREU2EA4BERERERERExjKZzFaqepJ1xyR+3N/f/6uZfvCaNWvGAFxRwZ5qSPQAJhERERERERERERHRlnAAkIiIiIiIiMiY53knAdjaumMSF8/2AHEcJ30b4DM6OztT1h1ERERERERERERERNPBAUAiIiIiIiIiYwnf/rc4Nja2drYHGRgY+BGAGa8iWAM7L1y48CjrCCIiIiIiIiIiIiKi6eAAIBEREREREZEh3/cXqOqbrDsmceOqVaser9CxLqnQcaoijuOzrBuIiIiIiIiIiIiIiKaDA4BEREREREREts5Esq/PZ73972aqeiEArdTxKk1E3t7b27uNdQcRERERERERERERUbmS/AIDERERERERUaMTETnDOmIS60ql0nWVOlg+n38EwPcrdbwqaC6VSu+2jiAiIiIiIiIiIiIiKhcHAImIiIiIiIiM+L7/OgB7WHdMRFWvHBwcfKbCh72owserKG4DTERERERERERERET1hAOAREREREREREZEJNHDZqlUqmLb/z7rmFcAqPRQYcWIyKszmcy+1h1EREREREREREREROXgACARERERERGRAedcK4CTrDsm8aeHHnrou5U+aF9f39MArq/0cSvJ87zTrBuIiIiIiIiIiIiIiMrBAUAiIiIiIiIiA6p6EoB2646JqOpFa9euLVXp8IneBtjzvDPDMExbdxARERERERERERERTYUDgEREREREREQGkr79r4hcUq1jt7W13Sgij1fr+LOlqjsWCoVjrDuIiIiIiIiIiIiIiKbCAUAiIiIiIiKiGuvt7V0I4PXWHZO4O4qi+6t18DAMi3EcX1Gt41fImdYBRERERERERERERERT4QAgERERERERUY0Vi8WzkOxr8otrcI5EbwMM4O2+729vHUFERERERERERERENJkkv9hARERERERE1IhERE63jphEXCqVLq/2SfL5/J0AHqz2eWZhnoi82zqCiIiIiIiIiIiIiGgyHAAkIiIiIiIiqqFsNvtGVd3dumMSNw8ODv6pRueqxUqDs3GWdQARERERERERERER0WQ4AEhERERERERUQ3EcJ32orGZDealU6iIAca3ONwOvdM7tZx1BRERERERERERERDQRDgASERERERER1cjixYvbAJxg3TGJkdHR0WtqdbK+vr5HAXyvVuebCRE5w7qBiIiI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"
                              />
                            </defs>
                          </svg>
                        </header>

                        <div className="text-sm my-[50px]">
                          Google Ads Integration.
                        </div>

                        <div className="admin-theme">
                          <button className="bg-blue-500 text-white btn-green small-btn white-bg">
                            Coming Soon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full xl:col-span-6 2xl:col-span-4 integration-box">
                    <div className="flex flex-col h-full px-5 py-6">
                      <div className="grow">
                        <header className="flex items-center">
                          <svg
                            width="63"
                            height="63"
                            viewBox="0 0 63 63"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_1677_2934)">
                              <path
                                d="M31.5 0C23.1457 0 15.1335 3.31874 9.22614 9.22614C3.31874 15.1335 0 23.1457 0 31.5C0 39.8543 3.31874 47.8665 9.22614 53.7739C15.1335 59.6813 23.1457 63 31.5 63C39.8543 63 47.8665 59.6813 53.7739 53.7739C59.6813 47.8665 63 39.8543 63 31.5C63 23.1457 59.6813 15.1335 53.7739 9.22614C47.8665 3.31874 39.8543 0 31.5 0ZM33.1852 10.8491C35.6921 10.8491 37.7265 12.8861 37.7265 15.4009V39.1991H41.9265C43.9336 39.1467 45.8409 38.3126 47.242 36.8744C48.6431 35.4362 49.4272 33.5078 49.4272 31.5C49.4272 29.4922 48.6431 27.5637 47.242 26.1256C45.8409 24.6874 43.9336 23.8533 41.9265 23.8009H40.1782V19.2491H41.9239C43.5313 19.2505 45.1227 19.5685 46.6073 20.1849C48.0918 20.8013 49.4404 21.7041 50.576 22.8417C51.7117 23.9793 52.6122 25.3294 53.226 26.815C53.8399 28.3006 54.1551 29.8926 54.1537 31.5C54.1555 33.1073 53.8406 34.6992 53.227 36.1848C52.6134 37.6704 51.7132 39.0205 50.5778 40.1582C49.4423 41.2958 48.0939 42.1986 46.6095 42.8151C45.1251 43.4315 43.5338 43.7495 41.9265 43.7509H33.1879L33.1852 10.8491ZM20.958 19.2491H29.6966V52.1482C27.1871 52.1482 25.1554 50.1112 25.1554 47.5991V23.7983H20.9554C18.9377 23.8355 17.0153 24.6632 15.6016 26.1032C14.1878 27.5433 13.3958 29.4807 13.3958 31.4987C13.3958 33.5167 14.1878 35.4541 15.6016 36.8941C17.0153 38.3342 18.9377 39.1619 20.9554 39.1991H22.7036V43.7483H20.958C19.3509 43.7469 17.7598 43.429 16.2756 42.8127C14.7914 42.1964 13.4431 41.2938 12.3077 40.1565C11.1723 39.0191 10.272 37.6693 9.65827 36.184C9.04454 34.6987 8.72937 33.1071 8.73075 31.5C8.72903 29.8927 9.04394 28.3008 9.65752 26.8152C10.2711 25.3296 11.1713 23.9795 12.3067 22.8418C13.4422 21.7042 14.7906 20.8014 16.275 20.1849C17.7594 19.5685 19.3507 19.2505 20.958 19.2491Z"
                                fill="#7DB00E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1677_2934">
                                <rect width="63" height="63" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </header>

                        <div className="text-sm my-[50px]">Quickbooks.</div>

                        <div className="admin-theme">
                          <button className="bg-blue-500 text-white btn-green small-btn white-bg">
                            Coming Soon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}


         {/************************************ Calendar Settings ************************************/} 
          {/* <div className="sm:flex sm:justify-between sm:items-center">           
                <div className="bottom-underline">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Calendar Settings
                  </h1>
                </div>
            </div>



            <div className="calendar-settings">
            <div className="panel-block">
                
                <div className="panel-title flex justify-between items-center flex-wrap">
                  <p>
                  Calendar Sync
                  </p>              
                </div>

                <div className="panel-data grid grid-cols-1 gap-6">
                    <div className="flex items-start flex-col">
                        <div className="black-text-block">
                          <p className="mb-0 date">Sync your Service Buddy calendar to apps like iCal or Google Calendar.</p>
                        </div>

                          <div className="panel-title set-up mt-[24px]">
                            <div className="admin-theme">
                                <button className="bg-blue-500 text-white btn-green small-btn white-bg">
                                  Set Up Calendar Sync
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="panel-block">
                
                <div className="panel-title flex justify-between items-center flex-wrap">
                  <p>
                   Calendar Colors
                  </p>
                </div>

                <div className="panel-data grid grid-cols-1 gap-6">
                    <div className="flex items-center">
                      <div className="mr-[20px]">
                      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="25" fill="#398378"/>
                      <g clip-path="url(#clip0_1434_1070)">
                      <path d="M18.5095 10C18.788 10 19.055 10.1106 19.252 10.3075C19.4489 10.5045 19.5595 10.7715 19.5595 11.05V13.0135H30.835V11.0635C30.835 10.785 30.9456 10.518 31.1425 10.321C31.3395 10.1241 31.6065 10.0135 31.885 10.0135C32.1635 10.0135 32.4305 10.1241 32.6275 10.321C32.8244 10.518 32.935 10.785 32.935 11.0635V13.0135H37C37.7954 13.0135 38.5582 13.3294 39.1208 13.8916C39.6834 14.4539 39.9996 15.2166 40 16.012V37.0015C39.9996 37.7969 39.6834 38.5596 39.1208 39.1219C38.5582 39.6841 37.7954 40 37 40H13C12.2046 40 11.4418 39.6841 10.8792 39.1219C10.3166 38.5596 10.0004 37.7969 10 37.0015V16.012C10.0004 15.2166 10.3166 14.4539 10.8792 13.8916C11.4418 13.3294 12.2046 13.0135 13 13.0135H17.4595V11.0485C17.4599 10.7703 17.5707 10.5036 17.7676 10.307C17.9644 10.1104 18.2313 10 18.5095 10ZM12.1 21.613V37.0015C12.1 37.1197 12.1233 37.2367 12.1685 37.3459C12.2137 37.4551 12.28 37.5543 12.3636 37.6379C12.4472 37.7215 12.5464 37.7878 12.6556 37.833C12.7648 37.8782 12.8818 37.9015 13 37.9015H37C37.1182 37.9015 37.2352 37.8782 37.3444 37.833C37.4536 37.7878 37.5528 37.7215 37.6364 37.6379C37.72 37.5543 37.7863 37.4551 37.8315 37.3459C37.8767 37.2367 37.9 37.1197 37.9 37.0015V21.634L12.1 21.613ZM20.0005 31.9285V34.4275H17.5V31.9285H20.0005ZM26.2495 31.9285V34.4275H23.7505V31.9285H26.2495ZM32.5 31.9285V34.4275H29.9995V31.9285H32.5ZM20.0005 25.963V28.462H17.5V25.963H20.0005ZM26.2495 25.963V28.462H23.7505V25.963H26.2495ZM32.5 25.963V28.462H29.9995V25.963H32.5ZM17.4595 15.112H13C12.8818 15.112 12.7648 15.1353 12.6556 15.1805C12.5464 15.2257 12.4472 15.292 12.3636 15.3756C12.28 15.4592 12.2137 15.5584 12.1685 15.6676C12.1233 15.7768 12.1 15.8938 12.1 16.012V19.5145L37.9 19.5355V16.012C37.9 15.8938 37.8767 15.7768 37.8315 15.6676C37.7863 15.5584 37.72 15.4592 37.6364 15.3756C37.5528 15.292 37.4536 15.2257 37.3444 15.1805C37.2352 15.1353 37.1182 15.112 37 15.112H32.935V16.5055C32.935 16.784 32.8244 17.051 32.6275 17.248C32.4305 17.4449 32.1635 17.5555 31.885 17.5555C31.6065 17.5555 31.3395 17.4449 31.1425 17.248C30.9456 17.051 30.835 16.784 30.835 16.5055V15.112H19.5595V16.492C19.5595 16.7705 19.4489 17.0375 19.252 17.2345C19.055 17.4314 18.788 17.542 18.5095 17.542C18.231 17.542 17.964 17.4314 17.767 17.2345C17.5701 17.0375 17.4595 16.7705 17.4595 16.492V15.112Z" fill="white" stroke="white" stroke-width="0.8"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_1434_1070">
                      <rect width="30" height="30" fill="white" transform="translate(10 10)"/>
                      </clipPath>
                      </defs>
                      </svg>

                      </div>
                      <div className="black-text-block">
                        <p className="green-light mb-[5px]">No colors are assigned</p>

                        <p className="mb-0 date">Service Buddy recomends color coding your calendar to stay organized</p>


                        <div className="panel-title set-up mt-[14px]">
                        <div className="admin-theme">
                          <button className="bg-blue-500 text-white btn-green small-btn">
                            Assign A Color
                          </button>
                        </div>
                      </div>

                      </div>
                    </div>
                </div>
            </div>



            <div className="panel-block">
                
                <div className="panel-title flex justify-between items-center flex-wrap">
                  <p>
                  Other Options
                  </p>              
                </div>

                   <div className="panel-data grid grid-cols-1 gap-6">                                   
                        <div className="grid grid-cols-12 gap-8 gap-x-6 gap-y-7">          
                         <div className="col-span-full xl:col-span-6 2xl:col-span-3">
                            <div className="black-text-block">
                              <div className="custom-radio-btn">
                                  <input type="checkbox" id="maps" name="isCompanyNameReserved" value="true" checked />
                                  <label className="capitalize-label" for="maps">Maps</label>
                                </div>
                              <p className="mb-0 date">Show a map of all the jobs for the day</p>
                            </div>
                          </div>

                          <div className="col-span-full xl:col-span-6 2xl:col-span-3">
                            <div className="black-text-block">
                            <div className="custom-radio-btn">
                                  <input type="checkbox" id="notes" name="isCompanyNameReserved" value="true"  />
                                  <label className="capitalize-label" for="notes">Notes</label>
                                </div>
                              <p className="mb-0 date">Provide space for notes on each job</p>
                            </div>
                          </div>
                     </div>                                        
                </div>
            </div>



            <div className="flex justify-end admin-theme">
                    <button className="text-white btn-green">Update settings</button>
                  </div> 
            </div>    */}



           {/************************************ Work Settings ************************************/} 
           {/* <div className="sm:flex sm:justify-between sm:items-center">           
                <div className="bottom-underline">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                   Work Settings
                  </h1>
                </div>
            </div>



            <div className="calendar-settings work-settings">
                <div className="panel-block">
                    
                    <div className="panel-title flex justify-between items-center flex-wrap">
                      <p>
                      Quotes
                      </p>              
                    </div>

                    <div className="panel-data grid grid-cols-1 gap-6">
                        <div className="flex items-start justify-between flex-wrap">

                            <div className="black-text-block">
                              <div className="black-text-block">
                                <p className="green-light mb-[8px]">Reminder</p>
                              </div>
                              <p className="mb-0 date mb-[14px]">Add a reminder to your calendar to check in on quotes that haven’t been converted after</p>


                              <div className="days">
                                <span className="days-text">Days</span>
                                <span>2</span>
                              </div>
                            </div>

                            <div>
                                  <div className="form-switch">
                                  <input
                                    type="checkbox"
                                    id="comments"
                                    className="sr-only"      
                                  />
                                  <label className="bg-slate-400" htmlFor="comments">
                                    <span
                                      className="bg-white shadow-sm"
                                      aria-hidden="true"
                                    ></span>
                                    <span className="sr-only">Enable smart sync</span>
                                  </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="panel-block">
                    
                    <div className="panel-title flex justify-between items-center flex-wrap">
                      <p>
                      Jobs
                      </p>              
                    </div>

                    <div className="panel-data admin-theme">
                      
                            <div>
                            <div className="black-text-block">
                                <p className="green-light mb-[8px]"> Job Visit Titles</p>
                              </div>
                              <p className="mb-0 date mb-[24px]">
                              This is how Service Buddy will display Job Titles on your calendar
                              </p>


                              <div>                         
                                <input id="company_name" className="form-input w-full mb-[24px]" type="text" placeholder="Company name" value="{{CLIENT_NAME}} - {{JOB_TITLE}}" />                              
                                </div>

                                <div>                         
                                <select className="form-select w-full">
                                  <option>Custom Variables</option>                             
                                  </select>                             
                                </div>
                            </div>
                      
                    </div>
                </div>



                <div className="panel-block">
                    
                    <div className="panel-title flex justify-between items-center flex-wrap">
                      <p>
                      Invoices
                      </p>              
                    </div>

                    <div className="panel-data admin-theme">                   
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[34px]">
                      <div>
                        <label className="block" htmlFor="zip_code">Invoice subject</label>
                        <input id="zip_code" className="form-input w-full mb-[24px]" type="text" placeholder="Invoice subject" value="For Services Rendered" />
                      </div>
                      <div>
                        <label className="block" htmlFor="country">Invoice payment due</label>
                        <select className="form-select w-full mb-[24px]">
                          <option>Net 30</option>
                          <option>Net 30</option>
                          <option>Net 30</option>
                        </select>
                      </div>
                    </div>   

                        <div> 
                            <div className="black-text-block">
                                <p className="green-light mb-[8px]">Invoice reminders</p>
                            </div>
                              <p className="mb-0 date mb-[24px]">
                                Set up scheduled reminders to invoice customers for recurring jobs.
                              </p>                          
                        </div>


                        <div className="custom-radio-btn small-checkbox">
                                      <input type="checkbox" id="team-member" name="isCompanyNameReserved" value="true" />
                                      <label className="capitalize-label" htmlFor="team-member">Have Service Buddy reassign incomplete invoice reminders to a team member</label>
                            </div>
                              
                            <div className="black-text-block">
                                <p className="green-light mb-[14px]">Assigned To</p>
                            </div>

                            <div className="custom-radio-btn small-checkbox margin-remove">
                                      <input type="checkbox" id="username" name="isCompanyNameReserved" value="true" />
                                      <label className="capitalize-label flex items-center grey" htmlFor="username">
                                        <span className="mr-[8px]">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4C6 4.53043 6.21071 5.03914 6.58579 5.41421C6.96086 5.78929 7.46957 6 8 6C8.53043 6 9.03914 5.78929 9.41421 5.41421C9.78929 5.03914 10 4.53043 10 4C10 3.46957 9.78929 2.96086 9.41421 2.58579C9.03914 2.21071 8.53043 2 8 2ZM8 9C10.67 9 16 10.33 16 13V16H0V13C0 10.33 5.33 9 8 9ZM8 10.9C5.03 10.9 1.9 12.36 1.9 13V14.1H14.1V13C14.1 12.36 10.97 10.9 8 10.9Z" fill="#398378"/>
                                      </svg>


                                        </span>
                                        Ashvin J</label>
                            </div>
                      </div>

                </div>


                  <div className="panel-block">                
                      <div className="panel-title flex justify-between items-center flex-wrap">
                        <p>
                        Statements
                        </p>              
                      </div>

                      <div className="panel-data admin-theme">                         
                        <div>
                        <label className="block">Sort order of billing history</label>
                          <select className="form-select w-full mb-[24px]">
                            <option>Newest first</option>
                            <option>Newest first</option>
                            <option>Newest first</option>
                          </select>
                        </div>


                        <div>
                          <label className="block" htmlFor="zip_code">Contract/disclaimer</label>
                              <p className="mb-[8px]">
                              <i>This message will appear at the bottom of every statement</i>
                              </p>
                              <textarea className="form-input"  name="" id="" rows={4} placeholder="Contract/disclaimer"></textarea>
                        </div>
                      </div> 
                  </div>


                  <div className="flex justify-end admin-theme">
                    <button className="text-white btn-green">Update settings</button>
                  </div> 
             </div> */}



          {/************************************ New User ************************************/}

           {/* <div>           
             <div className="manage-the-team">
              <p className="flex mb-[24px]">
                <span className="mr-[6px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.707 16.293L10.414 12L14.707 7.70697L13.293 6.29297L7.58603 12L13.293 17.707L14.707 16.293Z" fill="#398378"/>
                  </svg>
              </span>
                Manage the Team </p>
             </div>
                <div className="bottom-underline">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  New User
                  </h1>
                </div>
            </div>



            <div className="manage-new-user calendar-settings">
                <div className="panel-block">
                    <div className="panel-title flex justify-between items-center">
                      <p>
                        Company Details
                      </p>
                    </div>

                    <div className="panel-data admin-theme">

                      <div className="flex items-center mb-[24px]">
                        <div className="mr-[20px]">
                            <img src={user_upload} alt="" />
                        </div>
                        <div className="flex">
                        <div className="upload-btn-wrapper">
                          <button className="btn">Upload User Image</button>
                          <input type="file" name="myfile" />
                        </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[34px]">
                          <div>
                            <label
                              className="block"
                              htmlFor="full_name"
                            >
                            Full name
                            </label>
                            <input
                              id="full_name"
                              className="form-input w-full mb-[24px]"
                              type="text" 
                              placeholder="Full name"                       
                            />
                          </div>

                          <div>
                            <label
                              className="block"
                              htmlFor="street_address"
                            >
                            Street address
                            </label>
                            <input
                              id="street_address"
                              className="form-input w-full mb-[24px]"
                              type="text"
                              placeholder="Street address" 
                            />
                          </div>
                        

                        

                          <div>
                            <label
                              className="block"
                              htmlFor="email"
                            >
                            Email address
                            </label>
                            <input
                              id="email"
                              className="form-input w-full mb-[24px]"
                              type="email" 
                              placeholder="Email address"                       
                            />
                          </div>


                        


                          <div>
                            <label
                              className="block"
                              htmlFor="city"
                            >
                            City
                            </label>
                            <input
                              id="city"
                              className="form-input w-full mb-[24px]"
                              type="text" 
                              placeholder="City"                       
                            />
                          </div>


                          <div>
                            <label
                              className="block"
                              htmlFor="state"
                            >
                            Mobile phone number (if applicable)
                            </label>
                            <input
                              id="state"
                              className="form-input w-full mb-[24px]"
                              type="text" 
                              placeholder="Mobile phone number"                       
                            />
                          </div>



                          <div>
                            <label
                              className="block"
                              htmlFor="state"
                            >
                              Province
                            </label>
                            <input
                              id="state"
                              className="form-input w-full mb-[24px]"
                              type="text" 
                              placeholder="Province"                       
                            />
                          </div>


                          <div>
                            <label
                              className="block"
                              htmlFor="zip_code"
                            >
                            Postal code
                            </label>
                            <input
                              id="zip_code"
                              className="form-input w-full"
                              type="text" 
                              placeholder="Postal code"                       
                            />
                          </div>


                          <div>
                            <label
                              className="block"
                              htmlFor="country"
                            >
                            Country
                            </label>
                          
                            <select className="form-select w-full">
                                <option>Country</option>
                                <option>United States</option>
                                <option>India</option>                            
                              </select>
                          </div>
                    </div>
      

                    </div>              
                </div>   


                <div className="panel-block overflow-hidden">
                
                   <div className="panel-data white-bg">
                            <div className="black-text-block mb-[40px]">
                              <div className="custom-radio-btn">
                                  <input type="checkbox" id="maps" name="isCompanyNameReserved" value="true" checked />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps">Make Administrator</label>
                                </div>
                              <p className="ml-[30px] date">This allows them access to everything- including billing, client lists, editing all user permissions etc.
                              </p>                        
                     </div>  



                <div className="preset-block mb-[24px]">
                    <h3 className="mb-[6px]">Preset permission levels</h3>
                    <p className="date">Start with a preset permission level, and customize further as needed.</p>
                </div> 

                    <div>
                    <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="permission_levels" value="true"  checked/>
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">Limited View</label>
                                </div>
                              <p className="ml-[30px] date">Can view their schedule, mark work complete, and track their time</p>                   
                     </div> 

                     <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-2" name="permission_levels" value="true"  />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-2">Employee</label>
                                </div>
                              <p className="ml-[30px] date">Can view Clients and Properties, Rewuests etc.</p>                        
                     </div> 

                     <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-3" name="permission_levels" value="true"  />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-3">Manager</label>
                                </div>
                              <p className="ml-[30px] date">Can edit job, team and client details. Recommended for team leads.</p>                        
                     </div> 


                     <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-4" name="permission_levels" value="true"  />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-4">Owner</label>
                                </div>
                              <p className="ml-[30px] date">Can manage all areas excluding reports and payroll. Recommended for management.</p>                        
                     </div> 


                     <div className="black-text-block">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-5" name="permission_levels" value="true"  />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-5">Custom</label>
                                </div>                                                  
                     </div> 
                    </div>  

                     <div className="preset-border"></div> 

                     <div className="flex flex-wrap justify-between">
                        <div className="preset-block mb-[24px]">
                          <h3>Schedule</h3>
                        </div> 

                        <div className="form-switch mb-[20px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                              checked
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>

                     <div>
                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="schedule" value="true"  checked/>
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View their own schedule</label>
                                    </div>                   
                        </div> 


                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="schedule" value="true" />
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View and complete their own schedule</label>
                                    </div>                   
                        </div> 



                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="schedule" value="true" />
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">Edit their own schedule</label>
                                    </div>                   
                        </div> 


                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="schedule" value="true" />
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">Edit everyone's schedule</label>
                                    </div>                   
                        </div> 


                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="schedule" value="true" />
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">Edit and delete everyone's schedule</label>
                                    </div>                   
                        </div> 
                    </div>

                    <div className="preset-border"></div> 


               

                    <div className="flex flex-wrap justify-between">
                        <div className="preset-block mb-[24px]">
                          <h3>Time tracking and timesheets</h3>
                        </div> 

                        <div className="form-switch mb-[20px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                              checked
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>

                     <div>
                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="time_tracking" value="true"  checked/>
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View and record their own</label>
                                    </div>                   
                        </div> 


                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="time_tracking" value="true" />
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, record, and edit their own</label>
                                    </div>                   
                        </div> 



                        <div className="black-text-block mb-[24px]">
                                  <div className="custom-radio-btn">
                                      <input type="radio" id="maps-1" name="time_tracking" value="true" />
                                      <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, record, and edit everyone's</label>
                                    </div>                   
                        </div> 
                    </div>


                    <div className="preset-border"></div> 


                <div className="flex flex-wrap justify-between">
                        <div className="preset-block mb-[24px]">
                        <h3 className="mb-[6px]">Notes</h3>
                    <p className="date">Includes all notes across Service Buddy. You can hide notes for a feature by turning off permissions for that feature.</p>
                        </div> 

                        <div className="form-switch mb-[20px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                              checked
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>

                    <div>
                    <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View notes on jobs and visits only</label>
                                </div>               
                     </div>

                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View all notes</label>
                                </div>               
                     </div>


                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" checked/>
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View and edit all</label>
                                </div>               
                     </div> 


                     <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, edit, and delete all</label>
                                </div>               
                     </div>
                     </div>


                     <div className="preset-border"></div> 
            

                    <div className="flex flex-wrap justify-between">
                        <div className="preset-block">
                        <h3 className="mb-[6px]">Show pricing</h3>
                      <p className="date">Allows editing of quotes, invoices, and line items on jobs.</p>
                        </div> 

                        <div className="form-switch my-[10px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>

                    <div className="preset-border"></div> 
                    
                    <div className="flex flex-wrap justify-between mb-[24px]">
                        <div className="preset-block">
                        <h3 className="mb-[6px]">Clients and properties</h3>
                      <p className="date">Includes access to all client custom fields.</p>
                        </div> 
                    </div>

                  

                    <div>
                    <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View client name and address only</label>
                                </div>               
                     </div>

                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" checked/>
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View full client and property info</label>
                                </div>               
                     </div>


                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View and edit full client and property info</label>
                                </div>               
                     </div> 


                     <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, edit, and delete full client and property info</label>
                                </div>               
                     </div>


                     <div className="custom-radio-btn small-checkbox">
                                      <input type="checkbox" id="team-member" name="isCompanyNameReserved" value="true" />
                                      <label className="capitalize-label" htmlFor="team-member">Show clients on their Service Buddy menu</label>
                            </div>
                     </div>

                     <div className="preset-border"></div> 


                     <div className="flex flex-wrap justify-between">
                        <div className="preset-block mb-[24px]">
                          <h3>Requests</h3>
                        </div> 

                        <div className="form-switch mb-[20px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                              checked
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>




                    <div>
                    <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" checked/>
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View only</label>
                                </div>               
                     </div>

                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, and edit</label>
                                </div>               
                     </div>


                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, edit, and delete</label>
                                </div>               
                     </div> 




                     <div className="custom-radio-btn small-checkbox">
                                      <input type="checkbox" id="requests-on" name="isCompanyNameReserved" value="true" />
                                      <label className="capitalize-label" htmlFor="requests-on">Show requests on their Service Buddy menu</label>
                            </div>
                     </div>



                     <div className="preset-border"></div> 

                     <div className="flex flex-wrap justify-between">
                        <div className="preset-block mb-[24px]">
                          <h3>Quotes</h3>
                        </div> 

                        <div className="form-switch mb-[20px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                              checked
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>



                    <div>
                    <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" checked/>
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View only</label>
                                </div>               
                     </div>

                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn disable-radio">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, and edit</label>
                                </div>               
                     </div>


                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn disable-radio">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, edit, and delete</label>
                                </div>               
                     </div> 


                    <div className="mb-[24px] block-text">
                      <p>Turn on <span>show pricing</span> to create and edit quotes.</p>
                    </div>

                     <div className="custom-radio-btn disable-radio small-checkbox">
                                      <input type="checkbox" id="requests-on" name="isCompanyNameReserved" value="true" />
                                      <label className="capitalize-label" htmlFor="requests-on">Show quotes on their Service Buddy menu</label>
                            </div>

                      <div className="mb-[24px] block-text pt-[10px]">
                        <p>Turn on <span>show pricing</span> to see a list off all quotes.</p>
                      </div>
                      
                     </div>


                     


                     <div className="preset-border"></div> 


                  
                     <div className="flex flex-wrap justify-between">
                        <div className="preset-block mb-[24px]">
                          <h3>Jobs</h3>
                        </div> 

                        <div className="form-switch mb-[20px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                              checked
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>



                    <div>
                    <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn">
                                  <input type="radio" id="maps-1" name="notes" value="true" checked/>
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View only</label>
                                </div>               
                     </div>

                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn disable-radio">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, and edit</label>
                                </div>               
                     </div>


                      <div className="black-text-block mb-[24px]">
                              <div className="custom-radio-btn disable-radio">
                                  <input type="radio" id="maps-1" name="notes" value="true" />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, edit, and delete</label>
                                </div>               
                     </div> 


                    <div className="mb-[24px] block-text">
                      <p>Select <span>edit their own schedule</span> to create and edit jobs.</p>
                    </div>

                     <div className="custom-radio-btn small-checkbox">
                                      <input type="checkbox" id="show-quotes" name="isCompanyNameReserved" value="true" />
                                      <label className="capitalize-label" htmlFor="show-quotes">Show quotes on their Service Buddy menu</label>
                            </div>
                     </div>


                     <div className="preset-border"></div> 

                        <div className="flex flex-wrap justify-between">
                          <div className="preset-block mb-[24px]">
                            <h3>Invoices</h3>
                          </div> 

                          <div className="form-switch mb-[20px]">
                              <input
                                type="checkbox"
                                id="comments"
                                className="sr-only"
                                checked
                              />
                              <label className="bg-slate-400" htmlFor="comments">
                                <span
                                  className="bg-white shadow-sm"
                                  aria-hidden="true"
                                ></span>
                                <span className="sr-only">Enable smart sync</span>
                              </label>
                            </div>
                        </div>



                        <div>
                        <div className="black-text-block mb-[24px]">
                                <div className="custom-radio-btn">
                                    <input type="radio" id="maps-1" name="notes" value="true" checked/>
                                    <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View only</label>
                                  </div>               
                        </div>

                        <div className="black-text-block mb-[24px]">
                                <div className="custom-radio-btn disable-radio">
                                    <input type="radio" id="maps-1" name="notes" value="true" />
                                    <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, and edit</label>
                                  </div>               
                        </div>


                        <div className="black-text-block mb-[24px]">
                                <div className="custom-radio-btn disable-radio">
                                    <input type="radio" id="maps-1" name="notes" value="true" />
                                    <label className="capitalize-label mb-[6px]" htmlFor="maps-1">View, create, edit, and delete</label>
                                  </div>               
                        </div> 


                        <div className="mb-[24px] block-text">
                        <p>Turn on <span>show pricing</span>  to create and edit invoices.</p>
                        </div>

                        <div className="custom-radio-btn disable-radio small-checkbox">
                                        <input type="checkbox" id="requests-on" name="isCompanyNameReserved" value="true" />
                                        <label className="capitalize-label" htmlFor="requests-on">Show quotes on their Service Buddy menu</label>
                              </div>

                        <div className="block-text pt-[10px]">
                          <p>Turn on <span>show pricing</span> to see a list off all invoices.</p>
                          
                        </div>
                        
                        </div>



                    <div className="preset-border"></div> 
                    
                    <div className="flex flex-wrap justify-between">
                        <div className="preset-block">
                        <h3 className="mb-[6px]">Reports</h3>
                      <p className="date">Users will only be able to see reports available to them based on their other permissions.</p>
                        </div> 


                        <div className="form-switch my-[10px]">
                            <input
                              type="checkbox"
                              id="comments"
                              className="sr-only"
                              checked
                            />
                            <label className="bg-slate-400" htmlFor="comments">
                              <span
                                className="bg-white shadow-sm"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Enable smart sync</span>
                            </label>
                          </div>
                    </div>

                </div>
            </div>


               <div className="panel-block">                
                      <div className="panel-title flex justify-between items-center flex-wrap">
                        <p>
                        Email Subscriptions
                        </p>              
                      </div>

                          <div className="panel-data">
                            <div className="black-text-block">
                              <div className="custom-radio-btn">
                                  <input type="checkbox" id="maps" name="isCompanyNameReserved" value="true" checked />
                                  <label className="capitalize-label mb-[6px]" htmlFor="maps">Surveys</label>
                                </div>
                              <p className="ml-[30px] date">Receive occasional surveys to tell us how we're doing
                              </p>                        
                           </div> 
                          </div>
                     </div>

                     <div className="flex justify-end admin-theme">
                    <button className="text-white btn-green">Save User</button>
                  </div> 

                  <div className="preset-border border-solid"></div>

                    <div className="privacy-policy text-center">
                      <a href="">Privacy Policy</a>
                    </div>
             </div> */}



             {/************************************ MANAGE THE TEAM ************************************/}

                {/* <div className="manage-the">
                  <div className="flex items-center justify-between flex-wrap">     
                      <div className="bottom-underline">
                        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                        MANAGE THE TEAM
                        </h1>
                      </div>

                      <div className="admin-theme">
                          <button className="text-white small-btn  btn-green">Add User</button>
                      </div>
                  </div>

                  <div>
                    <p className="date">Add, manage, and grant permmissions to Service Buddy users.</p>
                  </div>


                  <div className="grid grid-cols-12 gap-8 gap-x-6 gap-y-7 mt-[42px]">          
                      <div className="col-span-full xl:col-span-8 2xl:col-span-8 order-2 sm:order-1">
                        <div className="manage-the-team">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                Name
                                </th>

                                <th>
                                Email 
                                </th>

                                <th>
                                Last Login
                                </th>

                                <th>
                                Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="flex">
                                  <div className="flex items-center mr-[14px]">
                                    <div className="flex">
                                    <span className="mr-[8px]">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4C6 4.53043 6.21071 5.03914 6.58579 5.41421C6.96086 5.78929 7.46957 6 8 6C8.53043 6 9.03914 5.78929 9.41421 5.41421C9.78929 5.03914 10 4.53043 10 4C10 3.46957 9.78929 2.96086 9.41421 2.58579C9.03914 2.21071 8.53043 2 8 2ZM8 9C10.67 9 16 10.33 16 13V16H0V13C0 10.33 5.33 9 8 9ZM8 10.9C5.03 10.9 1.9 12.36 1.9 13V14.1H14.1V13C14.1 12.36 10.97 10.9 8 10.9Z" fill="#398378"/>
                                      </svg>


                                        </span> 
                                    </div>
                                    <div>
                                      AJ
                                    </div>
                                  </div>
                                    <div className="flex flex-col">
                                      <p className="name">Ashvin J</p>
                                        <p className="account-owner">
                                        Account Owner
                                        </p>
                                    </div>
                                </td>

                                <td>
                                  <a href="mailto:ashvin.j@brilworks.com">ashvin.j@brilworks.com</a>
                                </td>

                                <td>
                                 2 Feb 2023
                                </td>

                                <td>

                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-span-full xl:col-span-4 2xl:col-span-4 order-1 sm:order-2">
                        <div className="active-users flex justify-between">
                          <div>
                            <p>Active Users</p>
                          </div>
                          <div>
                            <span> 1 OF 1</span>
                          </div>
                        </div>
                      </div>
                  </div>
                  </div> */}

              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
