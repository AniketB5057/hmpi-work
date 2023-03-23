
function CompanySettings() {
  return (
      <>
             <div className="sm:flex sm:justify-between sm:items-center">           
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
                  </div>   
                  </>
  )
}

export default CompanySettings