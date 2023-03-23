import React, { useEffect, useState } from "react";
import ModalBasic from "../../../components/ModalBasic";
import { useAuth } from "../../../contexts/AuthProvider";
import { useSnackbar } from "../../../contexts/SnackbarProvider";
import validator from "validator";
import { updateUser } from "../../../hooks/auth/useUpdateUserInfo";
import { CalendarColorOptions } from "../../../types/userInfo";
import {
  availableCountriesList,
  CurrencySymbolArr,
  makeid,
} from "../../../utils/commonFunctions";
import { getItem } from "../../../utils/localStorage";
import DropdownColorSelection, {
  getColorDiv,
} from "../common/DropdownColorSelection";
import moment from "moment";
import momentTimzeone from "moment-timezone";
import { EstimateSettings } from "../../../types/estimate";
import useContextMenu from "../../../hooks/useContextMenu";

export interface EstimateSettingsProps {
  show: boolean;
  setShow: (val: boolean) => void;
}
function EstimateSettingsModal(props: EstimateSettingsProps) {
  const { show, setShow } = props;
  const { userInfo, handleRefetch } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("COMPANY");
  const [formData, setFormData] = useState<EstimateSettings>({
    companyName: "",
    companyPhone: "",
    companyEmail: "",
    addressInfo: {
      city: "",
      street_address: "",
      country: "United States",
      post_code: "",
    },
    showCompanyLogo: true,
    showVatInfo: false,
    showValidityDate: true,
    textTemplate: "",
    emailTemplate: "",
    vatInfo: "",
    footer: "",
    prefix: "",
  });
  const snackbar = useSnackbar();
  useEffect(() => {
    if (userInfo && userInfo.estimateSettings) {
      setFormData(userInfo.estimateSettings);
    }
  }, [userInfo]);

  const handleSave = async () => {
    try {
      setIsUpdating(true);

      const data = await updateUser(getItem("authkey"), {
        estimateSettings: formData,
      });
      snackbar.success("Updated");
      handleRefetch();
      setIsUpdating(false);
      setShow(false);
    } catch (err: any) {
      console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        snackbar.error(err.response.data.message);
      } else {
        snackbar.error("Failed to save.");
      }
      setIsUpdating(false);
      setShow(false);
    }
  };
  const handleAddToTemplate = (templateType: string, option: string) => {
    let textToAdd = ``;
    if (option === "first_name") {
      textToAdd = `{{customer_first_name}}`;
    }
    if (option === "last_name") {
      textToAdd = `{{customer_last_name}}`;
    }
    if (option === "email") {
      textToAdd = `{{customer_email}}`;
    }
    if (option === "link") {
      textToAdd = `{{estimate_link}}`;
    }
    if (option === "ref") {
      textToAdd = `{{estimate_ref_id}}`;
    }
    if (templateType === "SMS") {
      setFormData({
        ...formData,
        textTemplate: `${formData.textTemplate}${textToAdd}`,
      });
    }
    if (templateType === "EMAIL") {
      setFormData({
        ...formData,
        emailTemplate: `${formData.emailTemplate}${textToAdd}`,
      });
    }
  };
  return (
    <ModalBasic
      id="show-estimate-settings-modal"
      modalOpen={show}
      setModalOpen={setShow}
      title={`Estimate Settings`}
      size={"lg"}
      fullScreen
    >
      {/* Modal content */}
      <div className="p-4">
        <section>
          <div>
            {/* Start */}
            <div className="relative mb-8">
              <div
                className="absolute bottom-0 w-full h-px bg-slate-200"
                aria-hidden="true"
              ></div>
              <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <span
                    className={`block pb-3 whitespace-nowrap cursor-pointer ${
                      selectedTab === "COMPANY"
                        ? `text-indigo-500 border-b-2 border-indigo-500`
                        : `text-slate-500 hover:text-slate-600`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTab("COMPANY");
                    }}
                  >
                    Company Info
                  </span>
                </li>
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <span
                    className={`block pb-3 text-indigo-500 whitespace-nowrap cursor-pointer ${
                      selectedTab === "SETTINGS"
                        ? `text-indigo-500 border-b-2 border-indigo-500`
                        : `text-slate-500 hover:text-slate-600`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTab("SETTINGS");
                    }}
                  >
                    General Settings
                  </span>
                </li>
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <span
                    className={`block pb-3 text-indigo-500 whitespace-nowrap cursor-pointer ${
                      selectedTab === "FOOTER"
                        ? `text-indigo-500 border-b-2 border-indigo-500`
                        : `text-slate-500 hover:text-slate-600`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTab("FOOTER");
                    }}
                  >
                    Footer/Notes
                  </span>
                </li>

                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <span
                    className={`block pb-3 text-indigo-500 whitespace-nowrap cursor-pointer ${
                      selectedTab === "TEXT_TEMPLATE"
                        ? `text-indigo-500 border-b-2 border-indigo-500`
                        : `text-slate-500 hover:text-slate-600`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTab("TEXT_TEMPLATE");
                    }}
                  >
                    SMS Template
                  </span>
                </li>
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <span
                    className={`block pb-3 text-indigo-500 whitespace-nowrap cursor-pointer ${
                      selectedTab === "EMAIL_TEMPLATE"
                        ? `text-indigo-500 border-b-2 border-indigo-500`
                        : `text-slate-500 hover:text-slate-600`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTab("EMAIL_TEMPLATE");
                    }}
                  >
                    Email Template
                  </span>
                </li>
              </ul>
            </div>
            {/* End */}
          </div>
          {selectedTab === "COMPANY" && (
            <>
              <div className="text-sm">
                Your company's info that will be shown on estimate.
              </div>

              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="business_name"
                  >
                    Company Name
                  </label>
                  <input
                    className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        companyName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="business_email"
                  >
                    Company Email
                  </label>
                  <input
                    className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    type="text"
                    value={formData.companyEmail}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        companyEmail: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="business_phone"
                  >
                    Company Phone
                  </label>
                  <input
                    className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    type="text"
                    value={formData.companyPhone}
                    onChange={(e) => {
                      let check = validator.isNumeric(e.target.value);
                      if (check) {
                        setFormData({
                          ...formData,
                          companyPhone: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                {/* Street Address */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="street"
                  >
                    Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={formData.addressInfo.street_address}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        addressInfo: {
                          ...formData.addressInfo,
                          street_address: e.target.value,
                        },
                      });
                    }}
                  />
                </div>

                {/* City and Postal Code */}
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="city"
                    >
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      className="form-input w-full"
                      type="text"
                      value={formData.addressInfo.city}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          addressInfo: {
                            ...formData.addressInfo,
                            city: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="postal-code"
                    >
                      Postal Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      className="form-input w-full"
                      type="text"
                      value={formData.addressInfo.post_code}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          addressInfo: {
                            ...formData.addressInfo,
                            post_code: e.target.value,
                          },
                        });
                      }}
                    />{" "}
                  </div>
                </div>

                {/* Country */}
                <div className="sm:w-1/2">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="country"
                  >
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <select
                    className="form-select w-full"
                    value={formData.addressInfo.country}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        addressInfo: {
                          ...formData.addressInfo,
                          country: e.target.value,
                        },
                      });
                    }}
                  >
                    {availableCountriesList.map((elem: string) => {
                      return (
                        <option key={elem} value={elem}>
                          {elem}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* General Settings  */}
          {selectedTab === "SETTINGS" && (
            <>
              <div className="flex space-x-4 mt-2">
                <div className="w-36">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="estimate_prefix"
                  >
                    Estimate Prefix <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={formData.prefix}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        prefix: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                <div className="flex-auto">
                  <div className="ml-2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="reminder_checkbox"
                    >
                      Show VAT/GST Info
                      <input
                        className="form-checkbox ml-2"
                        type="checkbox"
                        checked={formData.showVatInfo}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            showVatInfo: e.target.checked,
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex-auto w-1/2">
                {formData.showVatInfo && (
                  <div className="ml-2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="taxRate"
                    >
                      VAT/GST Info
                    </label>
                    <input
                      className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                      type="text"
                      value={formData.vatInfo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          vatInfo: e.target.value,
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                <div className="flex-auto">
                  <div className="ml-2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="reminder_checkbox"
                    >
                      Show Validity Date
                      <input
                        className="form-checkbox ml-2"
                        type="checkbox"
                        checked={formData.showValidityDate}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            showValidityDate: e.target.checked,
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex-auto"></div>
              </div>
            </>
          )}

          {/* Footer/Notes */}
          {selectedTab === "FOOTER" && (
            <div className="w-full border border-gray-300 rounded-md p-2 flex flex-col gap-2">
              <div className="text-textPrimary  text-[14px] font-[500]">
                Estimate Footer/Notes Text
              </div>
              <textarea
                className="outline-none rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                rows={4}
                value={formData.footer}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    footer: e.target.value,
                  });
                }}
              />
            </div>
          )}
          {/* Notification Settings */}
          {selectedTab === "TEXT_TEMPLATE" && (
            <>
              <div className="mt-2">
                <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
                  SMS template
                </h2>
                <div className="text-sm">
                  Use dynamic values by clicking on them. For example, "Add
                  customer name"
                </div>
              </div>
              <div>
                <div className="w-full mt-2 border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                  <div className="text-textPrimary  text-[14px] font-[500]">
                    SMS Template
                    <span className="ml-2 text-xs text-rose-500">
                      {`(Template from below will be used to send SMS.)`}
                    </span>
                    <div className="flex">
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("SMS", "first_name");
                          }}
                        >
                          Add Customer First Name
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("SMS", "last_name");
                          }}
                        >
                          Add Customer Last Name
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("SMS", "email");
                          }}
                        >
                          Add Customer Email
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("SMS", "link");
                          }}
                        >
                          Add Estimate Link
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("SMS", "ref");
                          }}
                        >
                          Add Estimate Reference
                        </div>
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="outline-none rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                    rows={4}
                    value={formData.textTemplate}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        textTemplate: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </>
          )}
          {selectedTab === "EMAIL_TEMPLATE" && (
            <>
              <div className="mt-2">
                <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
                  Email template
                </h2>
                <div className="text-sm">
                  Use dynamic values by clicking on them. For example, "Add
                  customer name"
                </div>
              </div>
              <div>
                <div className="w-full mt-2 border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                  <div className="text-textPrimary  text-[14px] font-[500]">
                    Email Template
                    <span className="ml-2 text-xs text-rose-500">
                      {`(Template from below will be used to send EMAIL.)`}
                    </span>
                    <div className="flex">
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("EMAIL", "first_name");
                          }}
                        >
                          Add Customer First Name
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("EMAIL", "last_name");
                          }}
                        >
                          Add Customer Last Name
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("EMAIL", "email");
                          }}
                        >
                          Add Customer Email
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("EMAIL", "link");
                          }}
                        >
                          Add Estimate Link
                        </div>
                      </div>
                      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div
                          className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial"
                          onClick={() => {
                            handleAddToTemplate("EMAIL", "ref");
                          }}
                        >
                          Add Estimate Reference
                        </div>
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="outline-none rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                    rows={4}
                    value={formData.emailTemplate}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        emailTemplate: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </section>
      </div>
      {/* Modal footer */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap justify-end space-x-2">
          <button
            className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
          >
            Close
          </button>
          {isUpdating ? (
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
              disabled
            >
              <svg
                className="animate-spin w-4 h-4 fill-current shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg>
              <span className="ml-2">Saving</span>
            </button>
          ) : (
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </ModalBasic>
  );
}

export default EstimateSettingsModal;
