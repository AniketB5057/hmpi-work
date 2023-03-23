import { useNavigate } from "react-router-dom"

function ManageTheTeam() {
    const navigate = useNavigate()
  return (
    <>
        <div className="manage-the">
                  <div className="flex items-center justify-between flex-wrap">     
                      <div className="bottom-underline">
                        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                        MANAGE THE TEAM
                        </h1>
                      </div>

                      <div className="admin-theme">
                          <button className="text-white small-btn  btn-green" onClick={()=>navigate('add-new-user')}>Add User</button>
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
                  </div>
        
    </>
  )
}

export default ManageTheTeam