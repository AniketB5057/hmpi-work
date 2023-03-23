import { faDollarSign } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormik } from "formik"
import moment from "moment"
import "moment-timezone"
import { useContext, useEffect, useRef, useState } from "react"
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
import { useAddInvoice } from "../hooks/invoices/useAddInvoice"
import { fetchSpecificInvoice } from "../hooks/invoices/useInvoice"
import { useUpdateInvoice } from "../hooks/invoices/useUpdateInvoice"
import { useAddItem } from "../hooks/items/useAddItem"
import { useItems } from "../hooks/items/useItems"
import { useUpdateItem } from "../hooks/items/useUpdateItem"
import { fetchSpecificOrder } from "../hooks/orders/useOrder"
import { LayoutContext } from "../layouts/DashboardLayout"
import { Customer } from "../types/customer"
import { BillingDetails, Invoice } from "../types/invoice"
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
function CreateInvoice() {
  const { userInfo } = useAuth()
  const { id } = useParams()
  let [searchParams, setSearchParams] = useSearchParams()
  const [isFetchingBookingData, setIsFetchingBookingData] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const queryClient = useQueryClient()
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(true)
  const [invoicePaymentStatus, setInvoicePaymentStatus] = useState(false)
  const editMode = location.pathname.startsWith("/invoice/edit")
  const [bookingId, setBookingId] = useState<string | null>(null)
  const breadcrumbsArr = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Invoices",
      link: "/invoices",
    },
    {
      label: `${editMode ? `Edit Invoice` : `New Invoice`}`,
      link: `${editMode ? `/invoice/edit/${id}` : `/invoice/add`}`,
    },
  ]

  const { getBreadcrumbs, setBreadcrumbs } = useContext(LayoutContext)

  const fetchSpecificBookingData = async () => {
    let booking_id = searchParams.get("booking_id")
    if (booking_id) {
      setIsFetchingBookingData(true)
      const getOrderData = await fetchSpecificOrder(booking_id)
      if (getOrderData) {
        setInvoiceBillingDetails(getOrderData.order_billing_details)
        setOrderProductItemsForInvoice(getOrderData.order_items)
        setSelectedCustomer(getOrderData.customerObject)
        setBookingId(booking_id)
        setIsFetchingBookingData(false)
        snackbar.success("Booking info auto-filled")
      } else {
        snackbar.error("Something went wrong!!")
        setIsFetchingBookingData(false)
      }
    }
  }
  const fetchSpecificInvoiceData = async () => {
    if (id) {
      const getData = await fetchSpecificInvoice(id)
      if (getData) {
        setIsLoadingInvoice(false)
        setInvoice(getData)
        setSelectedCustomer(getData.customerObject)

        snackbar.success("Invoice loaded")
      } else {
        snackbar.error("Something went wrong!!")
        setIsLoadingInvoice(false)
      }
    }
  }
  useEffect(() => {
    if (!editMode && !isLoadingInvoice) {
      fetchSpecificBookingData()
    }
  }, [searchParams, isLoadingInvoice, editMode])
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
    if (location.pathname.startsWith("/invoice/add")) {
      setInvoice(undefined)
      setIsLoadingInvoice(false)
    }
  }, [location, id])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (location.pathname.startsWith("/invoice/edit")) {
        fetchSpecificInvoiceData()
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  const invoice_due_date_ref = useRef<any>(null)
  const [selectedCustomer, setSelectedCustomer] =
    useState<Partial<Customer> | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const [invoiceDueDate, setInvoiceDueDate] = useState(
    moment().add(7, "days").unix()
  )
  const [itemUpdated, setItemUpdated] = useState<Item | undefined>(undefined)
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false)
  const [customerUpdated, setCustomerUpdated] = useState<
    Partial<Customer> | undefined
  >(undefined)
  const { addInvoice, isAddingInvoice } = useAddInvoice()
  const { updateInvoice, isUpdatingInvoice } = useUpdateInvoice()
  const [isFetchingInvoice, setIsFetchingInvoice] = useState(false)
  const [notesForInvoice, setNotesForInvoice] = useState<{
    external: string
    internal: string
  }>({
    external: `All Invoices must be paid before due date.`,
    internal: "",
  })

  const [invoice, setInvoice] = useState<Invoice | undefined>(undefined)

  const [
    notificationSettingForBookingInvoiceOrder,
    setNotificationSettingForBookingInvoiceOrder,
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
  const [OrderProductItemsForInvoice, setOrderProductItemsForInvoice] =
    useState<OrderProductItem[]>([])
  const [invoiceBillingDetail, setInvoiceBillingDetails] =
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

    setOrderProductItemsForInvoice([...OrderProductItemsForInvoice, newItem])
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

  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (invoice) {
        setInvoiceBillingDetails(invoice.invoice_billing_details)
        setOrderProductItemsForInvoice(invoice.invoice_items)
        setInvoicePaymentStatus(invoice.invoice_payment_completed)
      }
    }
    return () => {
      mounted = false
    }
  }, [invoice])

  useEffect(() => {
    let active = true

    if (active) {
      let newInvoiceBillingDetail: BillingDetails = {
        total_amount: `0`,
        tax_amount: `0`,
        tax_rate: `${userInfo && userInfo.taxRate ? userInfo.taxRate : `18`}`,
        items_total: `0`,
        discount_total: `0`,
      }
      OrderProductItemsForInvoice.forEach((elem) => {
        let totalCost = elem && elem.total_cost ? `${elem.total_cost}` : `0`
        newInvoiceBillingDetail.items_total = `${(
          parseFloat(totalCost) +
          parseFloat(newInvoiceBillingDetail.items_total)
        ).toFixed(2)}`
        newInvoiceBillingDetail.tax_amount = `${(
          (parseFloat(newInvoiceBillingDetail.items_total) *
            parseFloat(newInvoiceBillingDetail.tax_rate)) /
          100
        ).toFixed(2)}`
        newInvoiceBillingDetail.total_amount = `${(
          parseFloat(newInvoiceBillingDetail.items_total) +
          parseFloat(newInvoiceBillingDetail.tax_amount)
        ).toFixed(2)}`
      })
      setInvoiceBillingDetails({ ...newInvoiceBillingDetail })
    }

    return () => {
      active = false
    }
  }, [OrderProductItemsForInvoice])
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

  const handleSubmitInvoice = async (openPreview = false) => {
    if (selectedCustomer) {
      let InvoiceData: Partial<Invoice> = {
        ...notificationSettingForBookingInvoiceOrder,
        customer_ref_id: selectedCustomer.id,
        invoice_notes_external: notesForInvoice.external,
        tags: [],

        invoice_items: OrderProductItemsForInvoice,
        invoice_billing_details: { ...invoiceBillingDetail },
        invoice_due_date: invoiceDueDate,
        invoice_payment_completed: invoicePaymentStatus,
        invoice_items_additional: [],
      }
      if (bookingId) {
        InvoiceData = {
          ...InvoiceData,
          order_id: bookingId,
        }
      }

      if (editMode) {
        InvoiceData = {
          ...InvoiceData,
          id: invoice?.id,
        }
        updateInvoice(InvoiceData as Invoice)
          .then((data) => {
            snackbar.success(`Updated Invoice`)
            if (openPreview) {
              window.location.href = `/preview/invoice/${data.id}`
            } else {
              window.location.href = `/invoice/edit/${data.id}`
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
        addInvoice(InvoiceData as Invoice)
          .then((data) => {
            snackbar.success(`Created Invoice`)
            if (openPreview) {
              window.location.href = `/preview/invoice/${data.id}`
            } else {
              window.location.href = `/invoice/edit/${data.id}`
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
    handleSubmitInvoice(true)
  }
  const handleModalConfirmation = () => {
    handleSubmitInvoice()
  }
  const handleSubmit = (values: Partial<Invoice>) => {
    if (!editMode) {
      setShowConfirmationModal(true)
    } else {
      handleSubmitInvoice()
    }
  }
  const formik = useFormik({
    initialValues: {
      customer_ref_id: invoice ? invoice.customer_ref_id : "",
    },
    validationSchema: Yup.object({}),
    onSubmit: handleSubmit,
  })

  return (
    <>
      {isLoadingInvoice || isFetchingBookingData ? (
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
                notificationSettingForBookingInvoiceOrder.custom_email
              }
              send_text={notificationSettingForBookingInvoiceOrder.send_text}
              send_email={notificationSettingForBookingInvoiceOrder.send_email}
              send_custom_email={
                notificationSettingForBookingInvoiceOrder.send_custom_email
              }
              onChangeNotificationValues={(key: string, val: any) => {
                setNotificationSettingForBookingInvoiceOrder({
                  ...notificationSettingForBookingInvoiceOrder,
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
                            cardType="INVOICE"
                            customer={selectedCustomer}
                            showExtraDetails={editMode}
                            created_at={
                              invoice && invoice.invoice_created_at_timestamp
                                ? `${moment
                                    .unix(invoice.invoice_created_at_timestamp)
                                    .tz(
                                      userInfo && userInfo.timezone
                                        ? userInfo.timezone
                                        : moment.tz.guess()
                                    )
                                    .format("dddd, MMMM Do YYYY, HH:mm:ss")}`
                                : `Invoice Not created yet`
                            }
                            paymentStatus={invoicePaymentStatus}
                            changePaymentStatus={(val: boolean) => {
                              setInvoicePaymentStatus(val)
                            }}
                            openNotification={() => {
                              setShowConfirmationModal(true)
                            }}
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
                        id="Search-box-find-item-invoice-tab"
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

                              setOrderProductItemsForInvoice([
                                ...OrderProductItemsForInvoice,
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
                  {selectedCustomer &&
                    OrderProductItemsForInvoice.length === 0 && (
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
                            <span className="text-sm text-rose-400">{`(Use searchbox above to find or add item)`}</span>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                <div>
                  {OrderProductItemsForInvoice &&
                    OrderProductItemsForInvoice.length > 0 &&
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

                        {OrderProductItemsForInvoice.map((item, index) => {
                          return (
                            <ProductItemForInvoiceAndEstimate
                              id={`${makeid(4)}-${item.id}`}
                              index={index}
                              handleChange={(key, val) => {
                                if (key === "quantity") {
                                  let newVal = allowOnlyNumberWithZero(val)
                                  if (newVal) {
                                    let tempArr = [
                                      ...OrderProductItemsForInvoice,
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

                                    setOrderProductItemsForInvoice([...tempArr])
                                  }
                                } else if (key === "sub_total_cost") {
                                  let newVal = checkIfDecimalNumber(val)
                                  if (newVal) {
                                    let tempArr = [
                                      ...OrderProductItemsForInvoice,
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

                                    setOrderProductItemsForInvoice([...tempArr])
                                  }
                                } else {
                                  let tempArr = [...OrderProductItemsForInvoice]
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
                                  setOrderProductItemsForInvoice([...tempArr])
                                }
                              }}
                              handleDelete={() => {
                                const tempArr = [...OrderProductItemsForInvoice]

                                tempArr.splice(index, 1)
                                setOrderProductItemsForInvoice([...tempArr])
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
                                {invoiceBillingDetail.items_total}
                              </div>
                            </div>
                            <div className="flex text-[18px] items-center px-6 py-1 justify-between">
                              <div className="text-textGray font-[500]">
                                {`Tax(${invoiceBillingDetail.tax_rate}%)`}
                              </div>
                              <div className="text-textPrimary font-[600]">
                                {invoiceBillingDetail.tax_amount}`
                              </div>
                            </div>
                            <div className=" flex text-[24px] font-[600] bg-[#DEE2E6] border border-gray-300 px-6 py-4 items-center justify-between">
                              <div className="text-textPrimary text-lg font-semibold">
                                Total
                              </div>
                              <div className="text-textPrimary font-semibold text-lg">
                                {invoiceBillingDetail.total_amount}
                              </div>
                            </div>
                          </div>
                          <div className="w-full lg:w-[75%] bg-white p-4 rounded-b-lg gap-4 flex flex-col">
                            <div className="lg:w-[90%] w-full flex flex-col gap-2">
                              <div className="flex mt-3 flex-col lg:flex-row gap-2">
                                <div className="w-full   lg:w-[35%] border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                                  <div
                                    className=" text-[14px] font-[500] text-textPrimary"
                                    onClick={() => {
                                      invoice_due_date_ref.current.showPicker()
                                    }}
                                  >
                                    Invoice Due Date
                                  </div>
                                  <input
                                    className="outline-none  rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                                    type="date"
                                    id="invoice_due_date_"
                                    ref={invoice_due_date_ref}
                                    value={moment
                                      .unix(invoiceDueDate)
                                      .format("YYYY-MM-DD")}
                                    onChange={(e) => {
                                      let userTimeZone =
                                        userInfo && userInfo.timezone
                                          ? userInfo.timezone
                                          : moment.tz.guess()
                                      const tempDate = e.target.value
                                      const momentObj = moment(
                                        tempDate,
                                        "YYYY-MM-DD"
                                      ).tz(userTimeZone)

                                      setInvoiceDueDate(momentObj.unix())
                                    }}
                                    onClick={() => {
                                      invoice_due_date_ref.current.showPicker()
                                    }}
                                  />
                                </div>
                                <div className="w-full border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                                  <div className="text-textPrimary  text-[14px] font-[500]">
                                    Invoice Notes for Internal Use Only.
                                  </div>
                                  <textarea
                                    className="outline-none rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                                    rows={4}
                                    value={notesForInvoice.external}
                                    onChange={(e) => {
                                      setNotesForInvoice({
                                        ...notesForInvoice,
                                        external: e.target.value,
                                      })
                                    }}
                                    onKeyDown={(keyEvent) => {
                                      if (keyEvent.code === "Enter") {
                                        setNotesForInvoice({
                                          ...notesForInvoice,
                                          external: `${notesForInvoice.external}\n`,
                                        })
                                      }
                                    }}
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
                <div className="w-full lg:w-[75%]  text-[15px] font-[500] flex my-2 py-3 bg-transparent flex-col lg:flex-row lg:justify-end gap-2 px-2 py-4 border-t border-slate-200">
                  <>
                    <button
                      className="btn border-slate-200 hover:border-slate-300 text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmitForPreview()
                      }}
                      disabled={
                        isAddingInvoice ||
                        isUpdatingInvoice ||
                        (selectedCustomer && selectedCustomer.id ? false : true)
                      }
                    >
                      <span className="ml-2">Preview</span>
                    </button>

                    {editMode &&
                      invoice &&
                      invoice.invoice_payment_link &&
                      !invoice.invoice_payment_completed && (
                        <button
                          className="btn-sm bg-green-500 hover:bg-green-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                          onClick={(e) => {
                            e.preventDefault()
                            if (invoice && invoice.invoice_payment_link) {
                              window.open(
                                `${invoice.invoice_payment_link}`,
                                "_blank"
                              )
                            } else {
                              snackbar.error("Payment link not available.")
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faDollarSign} />
                          <span className="ml-2">Collect Payment</span>
                        </button>
                      )}
                    {isAddingInvoice || isUpdatingInvoice ? (
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
                        {editMode ? `Update Invoice` : `Create New Invoice`}
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

export default CreateInvoice
