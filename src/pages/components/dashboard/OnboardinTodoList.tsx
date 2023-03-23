import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LiveChatContext } from "../../../contexts/LiveChatProvider";

export interface todoListType {
  name: string;
  completed: boolean;
  cta_text: string;
  cta_link?: string;
}
export interface OnboardinTodoListProps {
  todo_list: todoListType[];
  heading: string;
  sub_heading: string;
}
function OnboardinTodoList(props: OnboardinTodoListProps) {
  const { todo_list, heading, sub_heading } = props;
  const { openLiveChat } = useContext(LiveChatContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <>
        <div className="on-boarding-setup-model">
          {/* <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Open regular modal
          </button> */}
          {showModal ? (
            <>
              <div className="popup-height justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-[16px]">
                <div className="relative w-auto mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*body*/}
                    <div className="on-boarding-setup admin-theme">
                      {/***************************Profile Setup***************************/}
                      <div className="text-center">
                        <div className="bottom-underline">
                          <h1>Profile Setup</h1>
                        </div>

                        <p>
                          Add your name and number so your team and clients can
                          reach you.
                        </p>
                      </div>

                      <div className="setup-form">
                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="first_name"
                          >
                            First Name
                          </label>
                          <input
                            id="first_name"
                            className="form-input w-full mb-[24px] md:mb-[36px]"
                            type="text"
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="first_name"
                          >
                            Your phone number
                          </label>
                          <input
                            id="first_name"
                            className="form-input w-full mb-[24px] md:mb-[36px]"
                            type="text"
                          />
                        </div>

                        <div className="would-like-checkbox">
                          <div className="flex">
                            <div>
                              <input
                                className="form-checkbox mr-[14px]"
                                type="checkbox"
                                // checked="checked"
                              />
                            </div>
                            <div>
                              <p>
                                I would like to receive SMS marketing
                                notifications from Service Buddy. You can
                                unsubscribe at any time. For more details,
                                review our Privacy Policy.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-[32px] md:mt-[40px] text-center">
                          <button className="py-2 px-4 bg-blue-500 text-white btn-green">
                            Next
                          </button>
                        </div>
                      </div>

                      {/***************************Set up your Business***************************/}
                      {/* <div className="text-center">
                        <div className="bottom-underline">
                          <h1>set up YOUR Business</h1>
                        </div>

                        <p>Let's get you up and running</p>
                      </div>

                      <div className="setup-form">
                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="first_name"
                          >
                            Company name
                          </label>
                          <input
                            id="first_name"
                            className="form-input w-full mb-[24px] md:mb-[36px]"
                            type="text"
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="first_name"
                          >
                            Company size (including you)
                          </label>

                          <div className="mb-[14px] md:mb-[26px]">
                            <div className="flex flex-wrap">
                              <div className="company-size active mr-[17px]">
                                JUST ME
                              </div>

                              <div className="company-size mr-[17px]">
                                2-5 PEOPLE
                              </div>

                              <div className="company-size mr-[17px]">
                                6-10 PEOPLE
                              </div>

                              <div className="company-size">10+ PEOPLE</div>
                            </div>
                          </div>

                          <div className="mb-[24px] md:mb-[36px]">
                            <select className="form-select w-full">
                              <option>Select industry</option>
                              <option>Construction</option>
                              <option>Electricians Businesses</option>
                              <option>Landscaping</option>
                              <option>Plumbing</option>
                              <option>HVAC</option>
                              <option>Property Management</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-[32px] md:mt-[40px] text-center">
                          <button className="py-2 px-4 bg-blue-500 text-white btn-green">
                            Next
                          </button>
                        </div>
                      </div> */}

                      {/***************************What do you use to stay organized today?***************************/}

                      {/* <div className="text-center">
                        <div className="bottom-underline what-do-you">
                          <h1 className="">
                            What do you use to stay organized today?
                          </h1>
                        </div>

                        <p>click all that apply</p>
                      </div>

                      <div className="six-box mt-[34px]">
<div className="flex items-center">
<div>
<div>
<input className="form-checkbox mr-[26px]" type="checkbox" checked="checked"/>
</div>
</div>
<div>
<div className="flex items-center">
<div className="mr-[15px]">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.8076 0C7.03038 0 7.24404 0.0884998 7.40157 0.24603C7.5591 0.403561 7.6476 0.617218 7.6476 0.84V2.4108H16.668V0.8508C16.668 0.628018 16.7565 0.414361 16.914 0.25683C17.0716 0.0992998 17.2852 0.0108 17.508 0.0108C17.7308 0.0108 17.9444 0.0992998 18.102 0.25683C18.2595 0.414361 18.348 0.628018 18.348 0.8508V2.4108H21.6C22.2363 2.4108 22.8466 2.66349 23.2966 3.11332C23.7467 3.56315 23.9997 4.17329 24 4.8096V21.6012C23.9997 22.2375 23.7467 22.8477 23.2966 23.2975C22.8466 23.7473 22.2363 24 21.6 24H2.4C1.76369 24 1.15342 23.7473 0.703368 23.2975C0.253315 22.8477 0.000318156 22.2375 0 21.6012L0 4.8096C0.000318156 4.17329 0.253315 3.56315 0.703368 3.11332C1.15342 2.66349 1.76369 2.4108 2.4 2.4108H5.9676V0.8388C5.96792 0.616226 6.05656 0.402877 6.21405 0.245606C6.37155 0.0883348 6.58503 -2.27116e-07 6.8076 0ZM1.68 9.2904V21.6012C1.68 21.6958 1.69862 21.7894 1.73481 21.8767C1.77099 21.9641 1.82403 22.0435 1.89088 22.1103C1.95774 22.1772 2.03711 22.2302 2.12447 22.2664C2.21182 22.3026 2.30545 22.3212 2.4 22.3212H21.6C21.6946 22.3212 21.7882 22.3026 21.8755 22.2664C21.9629 22.2302 22.0423 22.1772 22.1091 22.1103C22.176 22.0435 22.229 21.9641 22.2652 21.8767C22.3014 21.7894 22.32 21.6958 22.32 21.6012V9.3072L1.68 9.2904ZM8.0004 17.5428V19.542H6V17.5428H8.0004ZM12.9996 17.5428V19.542H11.0004V17.5428H12.9996ZM18 17.5428V19.542H15.9996V17.5428H18ZM8.0004 12.7704V14.7696H6V12.7704H8.0004ZM12.9996 12.7704V14.7696H11.0004V12.7704H12.9996ZM18 12.7704V14.7696H15.9996V12.7704H18ZM5.9676 4.0896H2.4C2.30545 4.0896 2.21182 4.10822 2.12447 4.14441C2.03711 4.18059 1.95774 4.23362 1.89088 4.30048C1.82403 4.36734 1.77099 4.44671 1.73481 4.53407C1.69862 4.62142 1.68 4.71505 1.68 4.8096V7.6116L22.32 7.6284V4.8096C22.32 4.71505 22.3014 4.62142 22.2652 4.53407C22.229 4.44671 22.176 4.36734 22.1091 4.30048C22.0423 4.23362 21.9629 4.18059 21.8755 4.14441C21.7882 4.10822 21.6946 4.0896 21.6 4.0896H18.348V5.2044C18.348 5.42718 18.2595 5.64084 18.102 5.79837C17.9444 5.9559 17.7308 6.0444 17.508 6.0444C17.2852 6.0444 17.0716 5.9559 16.914 5.79837C16.7565 5.64084 16.668 5.42718 16.668 5.2044V4.0896H7.6476V5.1936C7.6476 5.41638 7.5591 5.63004 7.40157 5.78757C7.24404 5.9451 7.03038 6.0336 6.8076 6.0336C6.58482 6.0336 6.37116 5.9451 6.21363 5.78757C6.0561 5.63004 5.9676 5.41638 5.9676 5.1936V4.0896Z" fill="#398378" stroke="#398378" stroke-width="0.8"/>
</svg>
</div>
<div>
ONLINE CALENDAR
</div>
</div>
</div>
</div>


<div className="flex items-center">
<div>
<div>
<input className="form-checkbox mr-[26px]" type="checkbox" checked="checked"/>
</div>
</div>
<div>
<div className="flex items-center">
<div className="mr-[15px]">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.71 16.71L18.29 14.29C18.197 14.1963 18.0864 14.1219 17.9646 14.0711C17.8427 14.0203 17.712 13.9942 17.58 13.9942C17.448 13.9942 17.3173 14.0203 17.1954 14.0711C17.0736 14.1219 16.963 14.1963 16.87 14.29L13.29 17.87C13.1973 17.9634 13.124 18.0743 13.0742 18.1961C13.0245 18.3179 12.9992 18.4484 13 18.58V21C13 21.2652 13.1054 21.5196 13.2929 21.7071C13.4804 21.8946 13.7348 22 14 22H16.42C16.5516 22.0008 16.6821 21.9755 16.8039 21.9258C16.9257 21.876 17.0366 21.8027 17.13 21.71L20.71 18.13C20.8037 18.037 20.8781 17.9264 20.9289 17.8046C20.9797 17.6827 21.0058 17.552 21.0058 17.42C21.0058 17.288 20.9797 17.1573 20.9289 17.0354C20.8781 16.9136 20.8037 16.803 20.71 16.71ZM16 20H15V19L17.58 16.42L18.58 17.42L16 20ZM10 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4H11V7C11 7.79565 11.3161 8.55871 11.8787 9.12132C12.4413 9.68393 13.2044 10 14 10H17V11C17 11.2652 17.1054 11.5196 17.2929 11.7071C17.4804 11.8946 17.7348 12 18 12C18.2652 12 18.5196 11.8946 18.7071 11.7071C18.8946 11.5196 19 11.2652 19 11V8.94C18.9896 8.84813 18.9695 8.75763 18.94 8.67V8.58C18.8919 8.47718 18.8278 8.38267 18.75 8.3L12.75 2.3C12.6673 2.22222 12.5728 2.15808 12.47 2.11C12.4402 2.10576 12.4099 2.10576 12.38 2.11L12.06 2H6C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H10C10.2652 22 10.5196 21.8946 10.7071 21.7071C10.8946 21.5196 11 21.2652 11 21C11 20.7348 10.8946 20.4804 10.7071 20.2929C10.5196 20.1054 10.2652 20 10 20ZM13 5.41L15.59 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7V5.41ZM8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14ZM8 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10ZM10 16H8C7.73478 16 7.48043 16.1054 7.29289 16.2929C7.10536 16.4804 7 16.7348 7 17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H10C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17C11 16.7348 10.8946 16.4804 10.7071 16.2929C10.5196 16.1054 10.2652 16 10 16Z" fill="#398378"/>
</svg>
</div>
<div>
PEN & PAPER
</div>
</div>
</div>
</div>


<div className="flex items-center">
<div>
<div>
<input className="form-checkbox mr-[26px]" type="checkbox" checked="checked"/>
</div>
</div>
<div>
<div className="flex items-center">
<div className="mr-[15px]">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1182_848)">
<path d="M4 9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H9C9.26522 8 9.51957 8.10536 9.70711 8.29289C9.89464 8.48043 10 8.73478 10 9C10 9.26522 9.89464 9.51957 9.70711 9.70711C9.51957 9.89464 9.26522 10 9 10H5C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9Z" fill="#398378"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 3C2.93913 3 1.92172 3.42143 1.17157 4.17157C0.421427 4.92172 0 5.93913 0 7L0 17C0 18.0609 0.421427 19.0783 1.17157 19.8284C1.92172 20.5786 2.93913 21 4 21H20C21.0609 21 22.0783 20.5786 22.8284 19.8284C23.5786 19.0783 24 18.0609 24 17V7C24 5.93913 23.5786 4.92172 22.8284 4.17157C22.0783 3.42143 21.0609 3 20 3H4ZM20 5H4C3.46957 5 2.96086 5.21071 2.58579 5.58579C2.21071 5.96086 2 6.46957 2 7V14H22V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5ZM22 16H2V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V16Z" fill="#398378"/>
</g>
<defs>
<clipPath id="clip0_1182_848">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

</div>
<div>
CREDIT CARD PROCESSORS
</div>
</div>
</div>
</div>


<div className="flex items-center">
<div>
<div>
<input className="form-checkbox mr-[26px]" type="checkbox" checked="checked"/>
</div>
</div>
<div>
<div className="flex items-center">
<div className="mr-[15px]">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.85902 2.877L15.429 1.082C15.5 1.07182 15.5723 1.07702 15.641 1.09723C15.7098 1.11744 15.7734 1.15219 15.8275 1.19913C15.8817 1.24608 15.9251 1.30411 15.9549 1.36931C15.9846 1.4345 16 1.50534 16 1.577V22.423C16 22.4946 15.9846 22.5653 15.9549 22.6304C15.9252 22.6955 15.8819 22.7535 15.8279 22.8004C15.7738 22.8474 15.7103 22.8821 15.6417 22.9024C15.5731 22.9227 15.5009 22.928 15.43 22.918L2.85802 21.123C2.61964 21.0891 2.40152 20.9702 2.24371 20.7884C2.08591 20.6065 1.99903 20.3738 1.99902 20.133V3.867C1.99903 3.62621 2.08591 3.39351 2.24371 3.21164C2.40152 3.02978 2.62064 2.91095 2.85902 2.877ZM4.00002 4.735V19.265L14 20.694V3.306L4.00002 4.735ZM17 19H20V5H17V3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8947 3.48043 22 3.73478 22 4V20C22 20.2652 21.8947 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H17V19ZM10.2 12L13 16H10.6L9.00002 13.714L7.40002 16H5.00002L7.80002 12L5.00002 8H7.40002L9.00002 10.286L10.6 8H13L10.2 12Z" fill="#398378"/>
</svg>

</div>
<div>
SPREADSHEETS & EXCEL
</div>
</div>
</div>
</div>



<div className="flex items-center">
<div>
<div>
<input className="form-checkbox mr-[26px]" type="checkbox" checked="checked"/>
</div>
</div>
<div>
<div className="flex items-center">
<div className="mr-[15px]">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1125_1021)">
<path d="M12 0C8.8174 0 5.76515 1.26428 3.51472 3.51472C1.26428 5.76515 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76515 22.7357 8.8174 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0ZM12.642 4.133C13.597 4.133 14.372 4.909 14.372 5.867V14.933H15.972C16.7366 14.913 17.4632 14.5953 17.997 14.0474C18.5307 13.4995 18.8294 12.7649 18.8294 12C18.8294 11.2351 18.5307 10.5005 17.997 9.95261C17.4632 9.40474 16.7366 9.08697 15.972 9.067H15.306V7.333H15.971C16.5834 7.33353 17.1896 7.45466 17.7551 7.68948C18.3207 7.9243 18.8344 8.26822 19.2671 8.70159C19.6997 9.13496 20.0427 9.6493 20.2766 10.2152C20.5104 10.7812 20.6305 11.3876 20.63 12C20.6307 12.6123 20.5107 13.2187 20.2769 13.7847C20.0432 14.3506 19.7003 14.865 19.2677 15.2984C18.8352 15.7317 18.3215 16.0757 17.756 16.3105C17.1905 16.5453 16.5843 16.6665 15.972 16.667H12.643L12.642 4.133ZM7.984 7.333H11.313V19.866C10.357 19.866 9.583 19.09 9.583 18.133V9.066H7.983C7.21437 9.08019 6.48201 9.39549 5.94345 9.94409C5.40489 10.4927 5.10316 11.2307 5.10316 11.9995C5.10316 12.7683 5.40489 13.5063 5.94345 14.0549C6.48201 14.6035 7.21437 14.9188 7.983 14.933H8.649V16.666H7.984C7.37178 16.6655 6.76565 16.5444 6.20023 16.3096C5.63482 16.0748 5.12117 15.731 4.68864 15.2977C4.2561 14.8644 3.91314 14.3502 3.67934 13.7844C3.44554 13.2186 3.32547 12.6122 3.326 12C3.32534 11.3877 3.44531 10.7813 3.67906 10.2153C3.9128 9.64938 4.25574 9.13503 4.68829 8.70165C5.12083 8.26827 5.63452 7.92433 6.2 7.6895C6.76549 7.45466 7.37169 7.33353 7.984 7.333Z" fill="#7DB00E"/>
</g>
<defs>
<clipPath id="clip0_1125_1021">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

</div>
<div>
QUICKBOOKS
</div>
</div>
</div>
</div>


<div className="flex items-center">
<div>
<div>
<input className="form-checkbox mr-[26px]" type="checkbox" checked="checked"/>
</div>
</div>
<div>
<div className="flex items-center">
<div className="mr-[15px]">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 15.75C17.625 15.75 17.25 15.6 16.95 15.3L14.7 13.05C14.4 12.75 14.25 12.375 14.25 12C14.25 11.625 14.4 11.25 14.7 10.95L16.95 8.7C17.25 8.4 17.625 8.25 18 8.25C18.375 8.25 18.75 8.4 19.05 8.7L21.3 10.95C21.6 11.25 21.75 11.625 21.75 12C21.75 12.375 21.6 12.75 21.3 13.05L19.05 15.3C18.75 15.6 18.375 15.75 18 15.75ZM18 9.75L15.75 12L18 14.25L20.25 12L18 9.75ZM12 9.75C11.625 9.75 11.25 9.6 10.95 9.3L8.7 7.05C8.4 6.75 8.25 6.375 8.25 6C8.25 5.625 8.4 5.25 8.7 4.95L10.95 2.7C11.25 2.4 11.625 2.25 12 2.25C12.375 2.25 12.75 2.4 13.05 2.7L15.3 4.95C15.6 5.25 15.75 5.625 15.75 6C15.75 6.375 15.6 6.75 15.3 7.05L13.05 9.3C12.75 9.6 12.375 9.75 12 9.75ZM12 3.75L9.75 6L12 8.25L14.25 6L12 3.75ZM12 21.75C11.625 21.75 11.25 21.6 10.95 21.3L8.7 19.05C8.4 18.75 8.25 18.375 8.25 18C8.25 17.625 8.4 17.25 8.7 16.95L10.95 14.7C11.25 14.4 11.625 14.25 12 14.25C12.375 14.25 12.75 14.4 13.05 14.7L15.3 16.95C15.6 17.25 15.75 17.625 15.75 18C15.75 18.375 15.6 18.75 15.3 19.05L13.05 21.3C12.75 21.6 12.375 21.75 12 21.75ZM12 15.75L9.75 18L12 20.25L14.25 18L12 15.75ZM6 15.75C5.625 15.75 5.25 15.6 4.95 15.3L2.7 13.05C2.4 12.75 2.25 12.375 2.25 12C2.25 11.625 2.4 11.25 2.7 10.95L4.95 8.7C5.25 8.4 5.625 8.25 6 8.25C6.375 8.25 6.75 8.4 7.05 8.7L9.3 10.95C9.6 11.25 9.75 11.625 9.75 12C9.75 12.375 9.6 12.75 9.3 13.05L7.05 15.3C6.75 15.6 6.375 15.75 6 15.75ZM6 9.75L3.75 12L6 14.25L8.25 12L6 9.75Z" fill="#398378"/>
</svg>

</div>
<div>
OTHER SERVICE SOFTWARE
</div>
</div>
</div>
</div>
</div>

                      <div className="mt-[70px] md:mt-[32px] text-center">
                        <button className="py-2 px-4 bg-blue-500 text-white btn-green">
                          Next
                        </button>
                      </div> */}

                      {/*************************** Limited time offer ***************************/}

                      {/* <div className="text-center">
                        <div className="bottom-underline">
                          <h1>LIMITED TIME OFFER</h1>
                        </div>

                        <p className="main-title-text mb-[14px]">
                          Save Big! Our Annual Plan is $124/ month
                        </p>

                        <p>Annual Plans are paid upront</p>
                      </div>

                      <div className="mt-[80px]">
                        <div className="six-box free-trial-box">
                          <div className="free-trial text-center active">
                            <div className="flex flex-col">
                              <div>
                                <p>Free Trial</p>
                              </div>
                              <div>
                                <div>
                                  <span>1</span>
                                </div>
                                <p className="days mt-[16px]">Days</p>
                              </div>
                            </div>
                          </div>
                          <div className="free-trial text-center">
                            <div className="flex flex-col">
                              <div>
                                <p>ANNUAL PLAN</p>
                              </div>
                              <div>
                                <div>
                                  <span className="price-text">$124</span>
                                </div>
                                <p className="month mt-[10px]">/month</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-[32px] md:mt-[42px] text-center">
                        <button className="py-2 px-4 bg-blue-500 text-white btn-green small-btn m-[8px] md:m-[15px]">
                          Buy Now And Save
                        </button>

                        <button className="py-2 px-4 bg-blue-500 text-white btn-green small-btn white-bg m-[8px] md:m-[15px]">
                          Decide Later
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </>

      <div className="space-y-2">
        {/* Task */}
        <div className="bg-white shadow-lg rounded-sm border border-slate-200 p-4">
          <div className="sm:flex sm:justify-between sm:items-start">
            {/* Left side */}
            <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
              <div className="flex items-center">
                {/* Checkbox button */}
                <label className="flex items-center">
                  <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                    {heading} ✌️
                  </span>
                </label>
              </div>
            </div>
            {/* Right side */}
            <div className="flex items-center justify-end space-x-3">
              {/* To-do info */}
              <div className="flex items-center text-slate-400 ml-3">
                <svg
                  className="w-4 h-4 shrink-0 fill-current mr-1.5"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.974 14c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6z" />
                </svg>
                <div className="text-sm text-slate-500">
                  {todo_list.filter((elem) => elem.completed).length}/
                  {todo_list.length}
                </div>
              </div>
              {/* Attach button */}
              <button
                className="text-slate-400 hover:text-indigo-500"
                onClick={(e) => {
                  openLiveChat();
                  e.preventDefault();
                }}
              >
                <FontAwesomeIcon icon={faComment} />
              </button>
            </div>
          </div>
          <div>
            <span className="font-medium tracking-wide text-gray-500 text-xs mt-1 ml-1">
              {sub_heading}
            </span>
          </div>
          <div>
            {/* Nested checkboxes */}
            <ul className="pl-2 space-y-3 mt-2">
              {todo_list &&
                todo_list.length > 0 &&
                todo_list.map((elem) => {
                  return (
                    <li key={`${elem.name}-${elem.cta_text}`}>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={elem.completed}
                          readOnly
                          className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                        />
                        <span className="text-sm text-slate-800 peer-checked:line-through ml-3 grow">
                          {elem.name}
                        </span>
                        {!elem.completed && (
                          <button
                            className="font-medium text-indigo-500 hover:text-indigo-600"
                            onClick={() => {
                              if (elem.cta_link) {
                                navigate(elem.cta_link);
                              }
                            }}
                          >
                            {elem.cta_text}
                          </button>
                        )}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardinTodoList;
