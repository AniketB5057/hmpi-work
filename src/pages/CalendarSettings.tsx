
function CalendarSettings() {
  return (
    <>
        <div className="sm:flex sm:justify-between sm:items-center">           
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
                                  <label className="capitalize-label" htmlFor="maps">Maps</label>
                                </div>
                              <p className="mb-0 date">Show a map of all the jobs for the day</p>
                            </div>
                          </div>

                          <div className="col-span-full xl:col-span-6 2xl:col-span-3">
                            <div className="black-text-block">
                            <div className="custom-radio-btn">
                                  <input type="checkbox" id="notes" name="isCompanyNameReserved" value="true"  />
                                  <label className="capitalize-label" htmlFor="notes">Notes</label>
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
            </div>   



    </>
  )
}

export default CalendarSettings