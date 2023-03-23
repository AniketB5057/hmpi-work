
function ProductsAndServices() {
  return (
    <>
        <div className="sm:flex sm:justify-between sm:items-center">           
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
              </div>  
    </>
  )
}

export default ProductsAndServices