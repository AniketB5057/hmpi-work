import { Link } from "react-router-dom";
import user_upload from "../images/user-upload.svg";

function AddNewUser() {
  return (
    <>
        <div>           
            <div className="manage-the-team">
              <Link to='/settings/manage-the-team'>
                <p className="flex mb-[24px]">
                  <span className="mr-[6px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.707 16.293L10.414 12L14.707 7.70697L13.293 6.29297L7.58603 12L13.293 17.707L14.707 16.293Z" fill="#398378"/>
                    </svg>
                  </span>
                  Manage the Team 
                </p>
              </Link>
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
                        <p className="ml-[30px] date">
                          This allows them access to everything- including billing, client lists, editing all user permissions etc.
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
             </div> 


    </>
  )
}

export default AddNewUser