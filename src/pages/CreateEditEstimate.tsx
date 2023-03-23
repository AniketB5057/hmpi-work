import { useFormik } from "formik"
import moment from "moment"
import "moment-timezone"
import { useContext, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import * as Yup from "yup"
import LoadingSpinner from "../components/LoadingSpinner"
import { useAuth } from "../contexts/AuthProvider"
import { useSnackbar } from "../contexts/SnackbarProvider"
import { useAddCustomer } from "../hooks/customers/useAddCustomer"
import { useSearchCustomer } from "../hooks/customers/useCustomer"
import { useUpdateCustomer } from "../hooks/customers/useUpdateCustomer"
import { useAddEstimate } from "../hooks/estimates/useAddEstimate"
import { fetchSpecificEstimate } from "../hooks/estimates/useEstimate"
import { useUpdateEstimate } from "../hooks/estimates/useUpdateEstimate"
import { useAddItem } from "../hooks/items/useAddItem"
import { useItems } from "../hooks/items/useItems"
import { useUpdateItem } from "../hooks/items/useUpdateItem"
import { fetchSpecificOrder } from "../hooks/orders/useOrder"
import { LayoutContext } from "../layouts/DashboardLayout"
import { Customer } from "../types/customer"
import { BillingDetails, Estimate } from "../types/estimate"
import { Item, OrderProductItem } from "../types/item"
import {
  allowOnlyNumberWithZero,
  checkIfDecimalNumber,
  makeid,
} from "../utils/commonFunctions"
import ProductItemForInvoiceAndEstimate from "./components/common/ProductItemForInvoiceAndEstimate"
import SearchBar, { iItemType } from "./components/common/SearchBar"
import AddUpdateCustomerForm from "./components/customers/AddUpdateCustomerForm"
import AddUpdateItemForm from "./components/items/AddUpdateItemForm"
import ConfirmationModalForBookingForm from "./components/orders/ConfirmationModal"
import SelectedCustomerCard from "./components/orders/SelectedCustomerCard"
function CreateEstimate() {
  const { userInfo } = useAuth()
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams()

  const [isFetchingBookingData, setIsFetchingBookingData] = useState(false)
  const snackbar = useSnackbar()
  const queryClient = useQueryClient()
  const [isLoadingEstimate, setIsLoadingEstimate] = useState(true)
  const editMode = location.pathname.startsWith("/estimate/edit")
  const breadcrumbsArr = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Estimates",
      link: "/estimates",
    },
    {
      label: `${editMode ? `Edit Estimate` : `New Estimate`}`,
      link: `${editMode ? `/estimate/edit/${id}` : `/estimate/add`}`,
    },
  ]

  const { getBreadcrumbs, setBreadcrumbs } = useContext(LayoutContext)

  const fetchSpecificEstimateData = async () => {
    if (id) {
      const getData = await fetchSpecificEstimate(id)
      if (getData) {
        setIsLoadingEstimate(false)
        setEstimate(getData)
        setSelectedCustomer(getData.customerObject)

        snackbar.success("Estimate loaded")
      } else {
        snackbar.error("Something went wrong!!")
        setIsLoadingEstimate(false)
      }
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      setBreadcrumbs(breadcrumbsArr)
    }

    return () => {
      setBreadcrumbs([])
      mounted = false
    }
  }, [])
  useEffect(() => {
    if (location.pathname.startsWith("/estimate/add")) {
      setEstimate(undefined)
      setIsLoadingEstimate(false)
    }
  }, [location, id])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (location.pathname.startsWith("/estimate/edit")) {
        fetchSpecificEstimateData()
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  const [selectedCustomer, setSelectedCustomer] =
    useState<Partial<Customer> | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const [estimateDueDate, setEstimateDueDate] = useState(
    moment().add(7, "days").unix()
  )
  const [itemUpdated, setItemUpdated] = useState<Item | undefined>(undefined)
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false)
  const [customerUpdated, setCustomerUpdated] = useState<
    Partial<Customer> | undefined
  >(undefined)
  const { addEstimate, isAddingEstimate } = useAddEstimate()
  const { updateEstimate, isUpdatingEstimate } = useUpdateEstimate()
  const [notesForEstimate, setNotesForEstimate] = useState<{
    external: string
    internal: string
  }>({
    external: `All Estimates must be paid before due date.`,
    internal: "",
  })

  const [estimate, setEstimate] = useState<Estimate | undefined>(undefined)

  const [
    notificationSettingForBookingEstimateOrder,
    setNotificationSettingForBookingEstimateOrder,
  ] = useState<{
    custom_email: string
    send_text: boolean
    send_email: boolean
    send_custom_email: boolean
  }>({
    custom_email: "",
    send_text: false,
    send_email: false,
    send_custom_email: false,
  })
  const [OrderProductItemsForEstimate, setOrderProductItemsForEstimate] =
    useState<OrderProductItem[]>([])
  const [estimateBillingDetail, setEstimateBillingDetails] =
    useState<BillingDetails>({
      total_amount: `0`,
      tax_amount: `0`,
      items_total: `0`,
      discount_total: `0`,
      tax_rate: `${userInfo && userInfo.taxRate ? userInfo.taxRate : `18`}`,
    })
  const addCustomerHook = useAddCustomer()
  const updateCustomerHook = useUpdateCustomer()
  const addItemHook = useAddItem()
  const updateItemHook = useUpdateItem()
  const useItemHook = useItems()
  const processingCustomer =
    addCustomerHook.isAdding || updateCustomerHook.isUpdating

  const processingItem = addItemHook.isAdding || updateItemHook.isUpdating

  const handleAddItem = async (item: Partial<Item>) => {
    let newItem: OrderProductItem = {
      id: item && item.id ? item.id : ``,
      cost: item && item.cost ? item.cost : 0,
      cost_decimals: item && item.cost_decimals ? item.cost_decimals : 0,
      desc: item && item.desc ? item.desc : ``,
      name: item && item.name ? item.name : ``,
      quantity: 1,
      sub_total_cost: `${item.cost}.${item.cost_decimals}`,
      total_cost: `${(
        parseFloat(`1`) * parseFloat(`${item.cost}.${item.cost_decimals}`)
      ).toFixed(2)}`,
      fields: [],
      type: "SERVICE",
      notes: item && item.desc ? item.desc : ``,
    }

    setOrderProductItemsForEstimate([...OrderProductItemsForEstimate, newItem])
    setOpenItemDialog(false)
    setItemUpdated({
      id: ``,
      cost: 0,
      cost_decimals: 0,
      desc: ``,
      name: ``,
      fields: [],
      type: "SERVICE",
    })
    snackbar.success(`Item added succesfully: ${item.name}`)
  }

  const handleUpdateItem = async (item: Item) => {
    setOpenItemDialog(false)
  }

  const fetchSpecificBookingData = async () => {
    let booking_id = searchParams.get("booking_id")
    if (booking_id) {
      setIsFetchingBookingData(true)
      const getOrderData = await fetchSpecificOrder(booking_id)
      if (getOrderData) {
        setEstimateBillingDetails(getOrderData.order_billing_details)
        setOrderProductItemsForEstimate(getOrderData.order_items)
        setSelectedCustomer(getOrderData.customerObject)
        setIsFetchingBookingData(false)

        snackbar.success("Booking info auto-filled")
      } else {
        snackbar.error("Something went wrong!!")
        setIsFetchingBookingData(false)
      }
    }
  }
  useEffect(() => {
    if (!editMode && !isLoadingEstimate) {
      fetchSpecificBookingData()
    }
  }, [searchParams, isLoadingEstimate, editMode])

  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (estimate) {
        setEstimateBillingDetails(estimate.estimate_billing_details)
        setOrderProductItemsForEstimate(estimate.estimate_items)
      }
    }
    return () => {
      mounted = false
    }
  }, [estimate])

  useEffect(() => {
    let active = true

    if (active) {
      let newEstimateBillingDetail: BillingDetails = {
        total_amount: `0`,
        tax_amount: `0`,
        tax_rate: `${userInfo && userInfo.taxRate ? userInfo.taxRate : `18`}`,
        items_total: `0`,
        discount_total: `0`,
      }
      OrderProductItemsForEstimate.forEach((elem) => {
        let totalCost = elem && elem.total_cost ? `${elem.total_cost}` : `0`
        newEstimateBillingDetail.items_total = `${(
          parseFloat(totalCost) +
          parseFloat(newEstimateBillingDetail.items_total)
        ).toFixed(2)}`
        newEstimateBillingDetail.tax_amount = `${(
          (parseFloat(newEstimateBillingDetail.items_total) *
            parseFloat(newEstimateBillingDetail.tax_rate)) /
          100
        ).toFixed(2)}`
        newEstimateBillingDetail.total_amount = `${(
          parseFloat(newEstimateBillingDetail.items_total) +
          parseFloat(newEstimateBillingDetail.tax_amount)
        ).toFixed(2)}`
      })
      setEstimateBillingDetails({ ...newEstimateBillingDetail })
    }

    return () => {
      active = false
    }
  }, [OrderProductItemsForEstimate])
  /**
   * Debounce & search customer logic
   */
  const [formattedDataForCustomerSearch, setFormattedDataForCustomerSearch] =
    useState<iItemType[]>([])
  const [formattedDataForItemSearch, setFormattedDataForItemSearch] = useState<
    iItemType[]
  >([])
  const [searchValForCustomer, setSearchValForCustomer] = useState("")
  const [searchBoxCustomer, setSearchBoxCustomer] = useState("")
  const [searchBoxProduct, setSearchBoxProduct] = useState("")

  const searchCustomerHook = useSearchCustomer(0, 10, searchValForCustomer)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      setSearchValForCustomer(searchBoxCustomer)
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchBoxCustomer])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (searchCustomerHook.data && searchCustomerHook.data.data) {
        setFormattedDataForCustomerSearch(
          searchCustomerHook.data.data.map((elem: Customer) => {
            return {
              key: elem.id,
              sub_title: `${elem.email}`,
              title: `${elem.first_name} ${elem.last_name}`,
            }
          })
        )
      }
    }
    return () => {
      mounted = false
    }
  }, [searchCustomerHook.data])
  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (useItemHook.data && useItemHook.data.length > 0) {
        setFormattedDataForItemSearch(
          useItemHook.data.map((elem: Item) => {
            return {
              key: elem.id,
              sub_title: `${elem.cost}.${elem.cost_decimals}`,
              title: `${elem.name}`,
            }
          })
        )
      }
    }
    return () => {
      mounted = false
    }
  }, [useItemHook.data])

  const handleSubmitEstimate = async (openPreview = false) => {
    if (selectedCustomer) {
      let EstimateData: Partial<Estimate> = {
        ...notificationSettingForBookingEstimateOrder,
        customer_ref_id: selectedCustomer.id,
        estimate_notes_external: notesForEstimate.external,
        tags: [],
        estimate_items: OrderProductItemsForEstimate,
        estimate_billing_details: { ...estimateBillingDetail },
        estimate_items_additional: [],
      }

      if (editMode) {
        EstimateData = {
          ...EstimateData,
          id: estimate?.id,
          order_id: estimate?.order_id,
        }
        updateEstimate(EstimateData as Estimate)
          .then((data) => {
            snackbar.success(`Updated Estimate`)
            if (openPreview) {
              window.location.href = `/preview/estimate/${data.id}`
            } else {
              window.location.href = `/estimate/edit/${data.id}`
            }
          })
          .catch((err) => {
            console.log(err)
            if (
              err &&
              err.response &&
              err.response.data &&
              err.response.data.message
            ) {
              snackbar.error(err.response.data.message)
            } else {
              snackbar.error(`Something went wrong.`)
            }
          })
      } else {
        addEstimate(EstimateData as Estimate)
          .then((data) => {
            snackbar.success(`Created Estimate`)
            if (openPreview) {
              window.location.href = `/preview/estimate/${data.id}`
            } else {
              window.location.href = `/estimate/edit/${data.id}`
            }
          })
          .catch((err) => {
            console.log(err)
            if (
              err &&
              err.response &&
              err.response.data &&
              err.response.data.message
            ) {
              snackbar.error(err.response.data.message)
            } else {
              snackbar.error(`Something went wrong.`)
            }
          })
      }
    }
  }
  const handleAddCustomer = async (customer: Partial<Customer>) => {
    addCustomerHook
      .addCustomer(customer as Customer)
      .then((result) => {
        snackbar.success(`Added customer`)
        setSelectedCustomer(result)
        setOpenCustomerDialog(false)

        queryClient.invalidateQueries("customers")
      })
      .catch((err) => {
        console.log(err)
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          setOpenCustomerDialog(false)
          snackbar.error(err.response.data.message)
        } else {
          setOpenCustomerDialog(false)
          snackbar.error(`Error while adding`)
        }
      })
  }
  const handleUpdateCustomer = async (customer: Customer) => {
    updateCustomerHook
      .updateCustomer(customer)
      .then((data) => {
        snackbar.success(`Updated customer`)
        setCustomerUpdated(data)
        setSelectedCustomer(data)
        setOpenCustomerDialog(false)

        queryClient.invalidateQueries("customers")
      })
      .catch((err) => {
        console.log(err)
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message)
        } else {
          snackbar.error(`Something went wrong.`)
        }
      })
  }
  const handleSubmitForPreview = () => {
    handleSubmitEstimate(true)
  }
  const handleModalConfirmation = () => {
    handleSubmitEstimate()
  }
  const handleSubmit = (values: Partial<Estimate>) => {
    if (!editMode) {
      setShowConfirmationModal(true)
    } else {
      handleSubmitEstimate()
    }
  }
  const formik = useFormik({
    initialValues: {
      customer_ref_id: estimate ? estimate.customer_ref_id : "",
    },
    validationSchema: Yup.object({}),
    onSubmit: handleSubmit,
  })

  return (
    <>
      {isLoadingEstimate || isFetchingBookingData ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="z-50">
            <ConfirmationModalForBookingForm
              onConfirm={() => {
                handleModalConfirmation()
                setShowConfirmationModal(false)
              }}
              processing={false}
              id={`confirmation-modal-for-booking-form`}
              open={showConfirmationModal}
              setOpenModal={(val: boolean) => {
                setShowConfirmationModal(val)
              }}
              customer_phone_number={selectedCustomer?.phone_number}
              customer_email={selectedCustomer?.email}
              customer_country_code={selectedCustomer?.mobile_country_code}
              custom_email={
                notificationSettingForBookingEstimateOrder.custom_email
              }
              send_text={notificationSettingForBookingEstimateOrder.send_text}
              send_email={notificationSettingForBookingEstimateOrder.send_email}
              send_custom_email={
                notificationSettingForBookingEstimateOrder.send_custom_email
              }
              onChangeNotificationValues={(key: string, val: any) => {
                setNotificationSettingForBookingEstimateOrder({
                  ...notificationSettingForBookingEstimateOrder,
                  [`${key}`]: val,
                })
              }}
            />
          </div>
          <div className="z-50">
            <AddUpdateCustomerForm
              customer={customerUpdated}
              setModalOpen={(val: boolean) => {
                setOpenCustomerDialog(val)
              }}
              onAdd={handleAddCustomer}
              onUpdate={handleUpdateCustomer}
              onClose={() => {
                setCustomerUpdated(undefined)
                setOpenCustomerDialog(false)
              }}
              open={openCustomerDialog}
              processing={processingCustomer}
            />
          </div>
          <div className="z-50">
            <AddUpdateItemForm
              item={itemUpdated}
              setModalOpen={(val: boolean) => {
                setItemUpdated(undefined)
                setOpenItemDialog(val)
              }}
              onAdd={handleAddItem}
              onUpdate={handleUpdateItem}
              onClose={() => {
                setCustomerUpdated(undefined)
                setOpenCustomerDialog(false)
              }}
              open={openItemDialog}
              processing={processingItem}
            />
          </div>

          <div className="z-40">
            <form
              onSubmit={formik.handleSubmit}
              onKeyDown={(keyEvent) => {
                if (keyEvent.code === "Enter") {
                  keyEvent.preventDefault()
                }
              }}
            >
              <div className="px-5 py-4">
                <div className="text-sm"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-4 ">
                    {!selectedCustomer && (
                      <div>
                        <SearchBar
                          label={"Find/Add Customer"}
                          id="Search-box-find-customer"
                          data={formattedDataForCustomerSearch}
                          value={searchBoxCustomer}
                          isLoading={searchCustomerHook.isFetching}
                          showError={false}
                          addNewButtonText="customer"
                          showAddNewButton={true}
                          onChange={(e: any) => {
                            setSearchBoxCustomer(e.target.value)
                          }}
                          onHandleSelect={(selectedCustomer: any) => {
                            // setCustomerUpdated()
                            if (
                              searchCustomerHook.data &&
                              searchCustomerHook.data.data &&
                              searchCustomerHook.data.data.length > 0
                            ) {
                              const findItem =
                                searchCustomerHook.data.data.find(
                                  (elem) => elem.id === selectedCustomer.key
                                )
                              if (findItem) {
                                setSelectedCustomer(findItem)
                              }
                            }
                          }}
                          onHandleAddNew={() => {
                            setOpenCustomerDialog(true)
                          }}
                        />
                      </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-4 ">
                      <div>
                        {selectedCustomer && selectedCustomer.id ? (
                          <SelectedCustomerCard
                            customer={selectedCustomer}
                            cardType="ESTIMATE"
                            created_at={
                              estimate && estimate.estimate_created_at_timestamp
                                ? `${moment
                                    .unix(
                                      estimate.estimate_created_at_timestamp
                                    )
                                    .tz(
                                      userInfo && userInfo.timezone
                                        ? userInfo.timezone
                                        : moment.tz.guess()
                                    )
                                    .format("dddd, MMMM Do YYYY, HH:mm:ss")}`
                                : `Estimate Not created yet`
                            }
                            paymentStatus={false}
                            changePaymentStatus={() => {}}
                            openNotification={() => {
                              setShowConfirmationModal(true)
                            }}
                            showExtraDetails={editMode}
                            handleRemove={() => {
                              setSelectedCustomer(null)
                            }}
                            handleEdit={() => {
                              setCustomerUpdated(selectedCustomer)
                              setOpenCustomerDialog(true)
                            }}
                          />
                        ) : (
                          <>
                            <div className="text-center px-4">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-slate-200 to-slate-100 mb-4">
                                <svg
                                  className="w-5 h-6 fill-current"
                                  viewBox="0 0 20 24"
                                >
                                  <path
                                    className="text-slate-500"
                                    d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z"
                                  />
                                  <path
                                    className="text-slate-300"
                                    d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z"
                                  />
                                  <path
                                    className="text-slate-400"
                                    d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z"
                                  />
                                </svg>
                              </div>
                              <h2 className="text-2xl text-slate-800 font-bold mb-2">
                                Find or Add Customer
                              </h2>
                              <span className="text-sm text-rose-400">{`(Use searchbox above to find or Add)`}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div></div>
                    </div>
                  </div>
                  {selectedCustomer && (
                    <div>
                      <SearchBar
                        label={"Add Products/Services"}
                        id="Search-box-find-item-estimate-tab"
                        data={formattedDataForItemSearch}
                        addNewButtonText="item"
                        showAddNewButton={true}
                        value={searchBoxProduct}
                        isLoading={useItemHook.isFetching}
                        showError={false}
                        onChange={(e: any) => {
                          setSearchBoxProduct(e.target.value)
                        }}
                        onHandleSelect={(selectedItem: any) => {
                          // setCustomerUpdated()
                          if (useItemHook.data && useItemHook.data.length > 0) {
                            const findItem = useItemHook.data.find(
                              (elem) => elem.id === selectedItem.key
                            )
                            if (findItem) {
                              let newItem: OrderProductItem = {
                                ...findItem,
                                quantity: 1,
                                sub_total_cost: `${findItem.cost}.${findItem.cost_decimals}`,
                                total_cost: `${(
                                  parseFloat(`1`) *
                                  parseFloat(
                                    `${findItem.cost}.${findItem.cost_decimals}`
                                  )
                                ).toFixed(2)}`,
                              }

                              setOrderProductItemsForEstimate([
                                ...OrderProductItemsForEstimate,
                                newItem,
                              ])
                            }
                          }
                        }}
                        onHandleAddNew={() => {
                          // setOpenCustomerDialog(true)
                          setOpenItemDialog(true)
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {OrderProductItemsForEstimate &&
                    OrderProductItemsForEstimate.length > 0 &&
                    selectedCustomer && (
                      <>
                        <div className="font-semibold text-slate-800">
                          Items
                          <span className="font-medium tracking-wide text-gray-500 text-xs mt-1 ml-1">{`(click down arrow to expand items.)`}</span>
                        </div>
                      </>
                    )}
                  {selectedCustomer &&
                    OrderProductItemsForEstimate.length === 0 && (
                      <div className="lg:w-[75%] border-t border-slate-200">
                        <div className="max-w-2xl m-auto mt-16">
                          <div className="text-center px-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-slate-200 to-slate-100 mb-4">
                              <svg
                                className="w-5 h-6 fill-current"
                                viewBox="0 0 20 24"
                              >
                                <path
                                  className="text-slate-500"
                                  d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z"
                                />
                                <path
                                  className="text-slate-300"
                                  d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z"
                                />
                                <path
                                  className="text-slate-400"
                                  d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z"
                                />
                              </svg>
                            </div>
                            <h2 className="text-2xl text-slate-800 font-bold mb-2">
                              Add Product or Service
                            </h2>
                            <span className="text-sm text-rose-400">{`(Use searchbox above to find or Add Item)`}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  <div>
                    {OrderProductItemsForEstimate &&
                      OrderProductItemsForEstimate.length > 0 &&
                      selectedCustomer && (
                        <>
                          <div className="lg:w-[75%] p-2 bg-white">
                            <div className=" hidden lg:flex bg-[#FCFCFD] ">
                              <div className="flex w-full items-center">
                                <div className="text-textGray flex flex-1">
                                  Items/services
                                </div>
                                <div className=" hidden space-x-24  lg:flex pt-2  ">
                                  <div className="flex space-x-12 ">
                                    <div className="text-center text-textGray">
                                      Qty
                                    </div>

                                    <div className="text-center text-textGray">
                                      {userInfo && userInfo.currency
                                        ? userInfo.currency
                                        : "GBP"}
                                    </div>
                                  </div>

                                  <div className="text-center text-textGray">
                                    Total
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Start */}

                          {OrderProductItemsForEstimate.map((item, index) => {
                            return (
                              <ProductItemForInvoiceAndEstimate
                                id={`${makeid(4)}-${item.id}`}
                                index={index}
                                handleChange={(key, val) => {
                                  if (key === "quantity") {
                                    let newVal = allowOnlyNumberWithZero(val)
                                    if (newVal) {
                                      let tempArr = [
                                        ...OrderProductItemsForEstimate,
                                      ]
                                      let tempObj = tempArr[index] as any
                                      tempObj[`${key}`] = newVal
                                      let subTotal =
                                        tempObj && tempObj.sub_total_cost
                                          ? tempObj.sub_total_cost
                                          : `0`
                                      let finalQuantity =
                                        tempObj && tempObj.quantity
                                          ? `${tempObj.quantity}`
                                          : `0`
                                      tempObj.total_cost = `${(
                                        parseFloat(subTotal) *
                                        parseInt(finalQuantity)
                                      ).toFixed(2)}`
                                      tempArr[index] = {
                                        ...tempObj,
                                      }

                                      setOrderProductItemsForEstimate([
                                        ...tempArr,
                                      ])
                                    }
                                  } else if (key === "sub_total_cost") {
                                    let newVal = checkIfDecimalNumber(val)
                                    if (newVal) {
                                      let tempArr = [
                                        ...OrderProductItemsForEstimate,
                                      ]
                                      let tempObj = tempArr[index] as any
                                      tempObj[`${key}`] = newVal
                                      let subTotal =
                                        tempObj && tempObj.sub_total_cost
                                          ? tempObj.sub_total_cost
                                          : `0`
                                      let finalQuantity =
                                        tempObj && tempObj.quantity
                                          ? `${tempObj.quantity}`
                                          : `0`
                                      tempObj.total_cost = `${(
                                        parseFloat(subTotal) *
                                        parseInt(finalQuantity)
                                      ).toFixed(2)}`
                                      tempArr[index] = {
                                        ...tempObj,
                                      }

                                      setOrderProductItemsForEstimate([
                                        ...tempArr,
                                      ])
                                    }
                                  } else {
                                    let tempArr = [
                                      ...OrderProductItemsForEstimate,
                                    ]
                                    let tempObj = tempArr[index] as any
                                    tempObj[`${key}`] = val
                                    let subTotal =
                                      tempObj && tempObj.sub_total_cost
                                        ? tempObj.sub_total_cost
                                        : `0`
                                    let finalQuantity =
                                      tempObj && tempObj.quantity
                                        ? `${tempObj.quantity}`
                                        : `0`
                                    tempObj.total_cost = `${(
                                      parseFloat(subTotal) *
                                      parseInt(finalQuantity)
                                    ).toFixed(2)}`
                                    tempArr[index] = { ...tempObj }
                                    setOrderProductItemsForEstimate([
                                      ...tempArr,
                                    ])
                                  }
                                }}
                                handleDelete={() => {
                                  const tempArr = [
                                    ...OrderProductItemsForEstimate,
                                  ]

                                  tempArr.splice(index, 1)
                                  setOrderProductItemsForEstimate([...tempArr])
                                }}
                                item={item}
                                currency={"GBP"}
                              />
                            )
                          })}
                          <div className=" lg:flex lg:flex-row-reverse lg:w-[75%] ">
                            <div className="w-full border-b pb-4 px-3 lg:px-0    lg:w-[30%] bg-white lg:border-b-0 border-b border-gray-300   gap-4 flex flex-col">
                              <div className="flex text-[18px]   border-b-2 p-6 items-center justify-between">
                                <div className="text-textGray font-[500]">
                                  Sub Total
                                </div>
                                <div className="text-textPrimary font-[600]">
                                  {estimateBillingDetail.items_total}
                                </div>
                              </div>
                              <div className="flex text-[18px] items-center px-6 py-1 justify-between">
                                <div className="text-textGray font-[500]">
                                  {`Tax(${estimateBillingDetail.tax_rate}%)`}
                                </div>
                                <div className="text-textPrimary font-[600]">
                                  {estimateBillingDetail.tax_amount}`
                                </div>
                              </div>
                              <div className=" flex text-[24px] font-[600] bg-[#DEE2E6] border border-gray-300 px-6 py-4 items-center justify-between">
                                <div className="text-textPrimary text-lg font-semibold">
                                  Total
                                </div>
                                <div className="text-textPrimary font-semibold text-lg">
                                  {estimateBillingDetail.total_amount}
                                </div>
                              </div>
                            </div>
                            <div className="w-full lg:w-[75%] bg-white p-4 rounded-b-lg gap-4 flex flex-col">
                              <div className="lg:w-[90%] w-full flex flex-col gap-2">
                                <div className="flex mt-3 flex-col lg:flex-row gap-2">
                                  <div className="w-full border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                                    <div className="text-textPrimary  text-[14px] font-[500]">
                                      Estimate Notes for Internal Use
                                    </div>
                                    <textarea
                                      className="outline-none rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                                      rows={4}
                                      onKeyDown={(keyEvent) => {
                                        if (keyEvent.code === "Enter") {
                                          setNotesForEstimate({
                                            ...notesForEstimate,
                                            external: `${notesForEstimate.external}\n`,
                                          })
                                        }
                                      }}
                                      onChange={(e) => {
                                        setNotesForEstimate({
                                          ...notesForEstimate,
                                          external: e.target.value,
                                        })
                                      }}
                                      value={notesForEstimate.external}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div></div>

                          {/* End */}
                        </>
                      )}
                  </div>
                </div>
                <div className="w-full lg:w-[75%]  text-[15px] font-[500] flex my-2 py-3 bg-transparent flex-col lg:flex-row lg:justify-end gap-2 px-2 py-4 border-t border-slate-200">
                  <>
                    <button
                      className="btn border-slate-200 hover:border-slate-300 text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmitForPreview()
                      }}
                      disabled={
                        isAddingEstimate ||
                        isUpdatingEstimate ||
                        (selectedCustomer && selectedCustomer.id ? false : true)
                      }
                    >
                      <span className="ml-2">Preview</span>
                    </button>
                    {isAddingEstimate || isUpdatingEstimate ? (
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
                        <span className="ml-2">Loading</span>
                      </button>
                    ) : (
                      <button
                        className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={
                          selectedCustomer && selectedCustomer.id ? false : true
                        }
                      >
                        {editMode ? `Update Estimate` : `Create New Estimate`}
                      </button>
                    )}
                  </>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateEstimate
