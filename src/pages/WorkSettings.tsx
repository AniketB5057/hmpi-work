

function WorkSettings() {
  return (
    <>
        <div className="sm:flex sm:justify-between sm:items-center">           
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
             </div> 


    </>
  )
}

export default WorkSettings