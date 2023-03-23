import { useFormik } from "formik";
import moment from "moment";
import "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthProvider";
import { useSnackbar } from "../../../contexts/SnackbarProvider";
import { useAddCustomer } from "../../../hooks/customers/useAddCustomer";
import { useSearchCustomer } from "../../../hooks/customers/useCustomer";
import { useUpdateCustomer } from "../../../hooks/customers/useUpdateCustomer";
import { useAddItem } from "../../../hooks/items/useAddItem";
import { useItems } from "../../../hooks/items/useItems";
import { useUpdateItem } from "../../../hooks/items/useUpdateItem";
import { fetchAllOrderStatuses } from "../../../hooks/orders/useOrder";
import DeleteDialogs from "../../components/common/DeleteDialogs";
import {
  getPresignURLToUpload,
  singleImageUpload,
} from "../../../hooks/useFileUploadToS3";
import { Customer } from "../../../types/customer";
import { Item, OrderProductItem } from "../../../types/item";
import { BillingDetails, Order } from "../../../types/order";
import { CalendarColorOptions } from "../../../types/userInfo";
import {
  allowOnlyNumberWithZero,
  checkIfDecimalNumber,
  makeid,
} from "../../../utils/commonFunctions";
import DropdownClassicColorSelection from "../common/DropdownColorSelection";
import SearchBar, { iItemType } from "../common/SearchBar";
import AddUpdateCustomerForm from "../customers/AddUpdateCustomerForm";
import AddUpdateItemForm from "../items/AddUpdateItemForm";
import ConfirmationModalForBookingForm from "./ConfirmationModal";
import TableForProductItemBookingPage from "./TableForProductItemBookingPage";

import SelectedCustomerCard from "./SelectedCustomerCard";
import MultipleSelectWithChips from "../../../components/MultipleSelectWithChips";
import { useDeleteOrders } from "../../../hooks/orders/useDeleteOrders";
export type AddOrUpdateOrderProps = {
  onAdd: (order: Partial<Order>) => void;
  onClose: () => void;
  onUpdate: (order: Order) => void;
  processing: boolean;
  order?: Order;
};

function AddUpdateOrderForm(props: AddOrUpdateOrderProps) {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<any>(null);
  const deliveryStartDateRef = useRef<any>(null);
  const appointmentStartDateRef = useRef<any>(null);

  const { userInfo } = useAuth();
  const queryClient = useQueryClient();
  const { onAdd, onClose, onUpdate, processing, order } = props;

  const { deleteOrders, isDeleting } = useDeleteOrders();
  const editMode = Boolean(order && order.id);
  const timeArr = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 4; j++) {
      timeArr.push(`${i}:${j === 0 ? `00` : 15 * j}`);
    }
  }
  const [fileOrimageUploading, setFileOrImageUploading] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  const [selectedCalendarColor, setSelectedCalendarColor] =
    useState<CalendarColorOptions>({
      color: "#4ade80",
      text: "Green",
    });

  const useItemHook = useItems();
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [orderPaymentStatus, setOrderPaymentStatus] = useState(false);
  const [orderTags, setOrderTags] = useState<string[]>([]);
  const [orderNotes, setOrderNotes] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

  const [formattedDataForCustomerSearch, setFormattedDataForCustomerSearch] =
    useState<iItemType[]>([]);
  const [formattedDataForItemSearch, setFormattedDataForItemSearch] = useState<
    iItemType[]
  >([]);
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false);
  const [customerUpdated, setCustomerUpdated] = useState<Customer | undefined>(
    undefined
  );
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [itemUpdated, setItemUpdated] = useState<Item | undefined>(undefined);
  const [pointerForImageUpload, setPointerForImageUpload] = useState(-1);
  const [OrderProductItems, setOrderProductItems] = useState<
    OrderProductItem[]
  >([]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [stateForOrderTime, setStateForOrderTime] = useState<{
    order_job_start_date: string;
    order_job_start_time: string;
    order_job_end_date: string;
    order_job_end_time: string;
  }>({
    order_job_start_date: `${moment().format("YYYY-MM-DD")}`,
    order_job_start_time: `${moment().format("HH:mm")}`,
    order_job_end_date: `${moment().format("YYYY-MM-DD")}`,
    order_job_end_time: `${moment().add(1, "hour").format("HH:mm")}`,
  });

  const [orderBillingDetail, setOrderBillingDetails] = useState<BillingDetails>(
    {
      total_amount: `0`,
      tax_amount: `0`,
      items_total: `0`,
      discount_total: `0`,
      tax_rate: `${userInfo && userInfo.taxRate ? userInfo.taxRate : `18`}`,
    }
  );

  const addCustomerHook = useAddCustomer();
  const updateCustomerHook = useUpdateCustomer();
  const addItemHook = useAddItem();
  const updateItemHook = useUpdateItem();

  const processingCustomer =
    addCustomerHook.isAdding || updateCustomerHook.isUpdating;
  const processingItem = addItemHook.isAdding || updateItemHook.isUpdating;
  /**
   * Debounce & search customer logic
   */
  const [searchValForCustomer, setSearchValForCustomer] = useState("");
  const [searchBoxCustomer, setSearchBoxCustomer] = useState("");
  const [searchBoxProduct, setSearchBoxProduct] = useState("");
  const searchCustomerHook = useSearchCustomer(0, 10, searchValForCustomer);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      setSearchValForCustomer(searchBoxCustomer);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchBoxCustomer]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (searchCustomerHook.data && searchCustomerHook.data.data) {
        setFormattedDataForCustomerSearch(
          searchCustomerHook.data.data.map((elem: Customer) => {
            return {
              key: elem.id,
              sub_title: `${elem.email}`,
              title: `${elem.first_name} ${elem.last_name}`,
            };
          })
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [searchCustomerHook.data]);
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (useItemHook.data && useItemHook.data.length > 0) {
        setFormattedDataForItemSearch(
          useItemHook.data.map((elem: Item) => {
            return {
              key: elem.id,
              sub_title: `${elem.cost}.${elem.cost_decimals}`,
              title: `${elem.name}`,
            };
          })
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [useItemHook.data]);
  // end debounce logic

  useEffect(() => {
    let active = true;

    if (active) {
      let newOrderBillingDetail: BillingDetails = {
        total_amount: `0`,
        tax_amount: `0`,
        tax_rate: `${userInfo && userInfo.taxRate ? userInfo.taxRate : `18`}`,
        items_total: `0`,
        discount_total: `0`,
      };
      OrderProductItems.forEach((elem) => {
        let totalCost = elem && elem.total_cost ? `${elem.total_cost}` : `0`;
        newOrderBillingDetail.items_total = `${(
          parseFloat(totalCost) + parseFloat(newOrderBillingDetail.items_total)
        ).toFixed(2)}`;
        newOrderBillingDetail.tax_amount = `${(
          (parseFloat(newOrderBillingDetail.items_total) *
            parseFloat(newOrderBillingDetail.tax_rate)) /
          100
        ).toFixed(2)}`;
        newOrderBillingDetail.total_amount = `${(
          parseFloat(newOrderBillingDetail.items_total) +
          parseFloat(newOrderBillingDetail.tax_amount)
        ).toFixed(2)}`;
      });
      setOrderBillingDetails({ ...newOrderBillingDetail });
    }

    return () => {
      active = false;
    };
  }, [OrderProductItems]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!open) {
        setOrderTags([]);
        setCustomerUpdated(undefined);
        setSelectedCustomer(null);
        setOrderProductItems([]);
      }
    }
    return () => {
      mounted = false;
    };
  }, [open]);
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (order && order.tags) {
        setOrderTags(order.tags);
      }
      if (order && order.show_job_time_checkbox) {
        setShowBookingDetails(order.show_job_time_checkbox);
      }
      if (order && order.customerObject) {
        setCustomerUpdated(order.customerObject);
        setSelectedCustomer(order.customerObject);
      }
      if (order && order.order_items) {
        setOrderProductItems(order.order_items);
      }

      if (order && order.notes) {
        setOrderNotes(order.notes);
      }
      if (order && order.order_payment_completed) {
        setOrderPaymentStatus(order.order_payment_completed);
      }

      if (order && order.calendar_color) {
        if (userInfo && userInfo.calendarOptions) {
          const findColor = userInfo.calendarOptions.find((elem) => {
            return elem.color === order.calendar_color;
          });

          if (findColor) {
            setSelectedCalendarColor(findColor);
          } else {
            if (userInfo.calendarOptions[0]) {
              setSelectedCalendarColor(userInfo.calendarOptions[0]);
            }
          }
        }
      } else {
        if (
          userInfo &&
          userInfo.calendarOptions &&
          userInfo.calendarOptions[0]
        ) {
          setSelectedCalendarColor(userInfo.calendarOptions[0]);
        }
      }
      let orderTimestampState = {
        ...stateForOrderTime,
      };
      let userTimeZone =
        userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess();
      if (order && order.order_job_start_timestamp) {
        let unixVal = order.order_job_start_timestamp;
        let momentObj = moment.unix(unixVal);

        let startDateForOrder = momentObj.tz(userTimeZone).format("YYYY-MM-DD");
        let startTimeForOrder = momentObj.tz(userTimeZone).format("HH:mm");

        orderTimestampState = {
          ...orderTimestampState,
          order_job_start_date: startDateForOrder,
          order_job_start_time: startTimeForOrder,
        };
      }
      if (order && order.order_job_end_timestamp) {
        let unixVal = order.order_job_end_timestamp;
        let momentObj = moment.unix(unixVal);
        let endDateForOrder = momentObj.tz(userTimeZone).format("YYYY-MM-DD");
        let endTimeForOrder = momentObj.tz(userTimeZone).format("HH:mm");
        orderTimestampState = {
          ...orderTimestampState,
          order_job_end_date: endDateForOrder,
          order_job_end_time: endTimeForOrder,
        };
      }
      setStateForOrderTime(orderTimestampState);
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    setLoadingStatuses(true);
    try {
      const data = await fetchAllOrderStatuses(
        moment().subtract("2", "months").unix(),
        moment().add("2", "months").unix()
      );
      if (data.length > 0) {
        setPopularTags(data.map((elem) => elem.status));
      } else {
        setPopularTags([
          "New Lead",
          "New Booking",
          "Important Client",
          "Quick Job",
        ]);
      }

      setLoadingStatuses(false);
    } catch (err) {
      console.log(err);
      snackbar.error("failed to load tags");

      setLoadingStatuses(false);
    }
  };
  const handleAddCustomer = async (customer: Partial<Customer>) => {
    addCustomerHook
      .addCustomer(customer as Customer)
      .then((result) => {
        snackbar.success(`Added customer`);
        setSelectedCustomer(result);
        setOpenCustomerDialog(false);

        queryClient.invalidateQueries("customers");
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          setOpenCustomerDialog(false);
          snackbar.error(err.response.data.message);
        } else {
          setOpenCustomerDialog(false);
          snackbar.error(`Error while adding`);
        }
      });
  };
  const [
    notificationSettingForBookingInvoiceOrder,
    setNotificationSettingForBookingInvoiceOrder,
  ] = useState<{
    custom_email: string;
    send_text: boolean;
    send_email: boolean;
    send_custom_email: boolean;
  }>({
    custom_email: "",
    send_text: false,
    send_email: false,
    send_custom_email: false,
  });
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
    };

    setOrderProductItems([...OrderProductItems, newItem]);
    setOpenItemDialog(false);
    setItemUpdated({
      id: ``,
      cost: 0,
      cost_decimals: 0,
      desc: ``,
      name: ``,
      fields: [],
      type: "SERVICE",
    });
    snackbar.success(`Item added succesfully: ${item.name}`);
  };

  const handleUpdateItem = async (item: Item) => {
    setOpenItemDialog(false);
  };

  const handleFileChange = async (event: any) => {
    setFileOrImageUploading(true);
    const fileObj: File = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    let tempArr = [...OrderProductItems];
    let tempObj = tempArr[pointerForImageUpload];
    const objectUrl = URL.createObjectURL(fileObj);
    const getImageURLtoUpload = await getPresignURLToUpload(
      fileObj.name,
      fileObj.type
    );
    let tempImagesArr =
      tempObj && tempObj.before_images ? tempObj.before_images : [];

    try {
      const uploadImage = await singleImageUpload(
        getImageURLtoUpload.uploadURL,
        fileObj
      );
      tempObj.before_images = [
        ...tempImagesArr,
        getImageURLtoUpload.downloadURL,
      ];
      tempArr[pointerForImageUpload] = { ...tempObj };
      setOrderProductItems([...tempArr]);
      snackbar.success("Uploaded File!");
    } catch (e) {
      console.log(e);
      snackbar.error("failed to upload!");
    }

    setFileOrImageUploading(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const showBookingTime = searchParams.get("show_booking_time");

      if (!editMode && showBookingTime == "1") {
        setShowBookingDetails(true);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const day = searchParams.get("day");
      const month = searchParams.get("month");
      const year = searchParams.get("year");
      if (!editMode && day && year && month) {
        let orderTimestampState = {
          ...stateForOrderTime,
        };
        let momentObj = moment()
          .date(parseInt(day))
          .year(parseInt(year))
          .month(parseInt(month));
        let userTimeZone =
          userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess();

        let startDateForOrder = momentObj.tz(userTimeZone).format("YYYY-MM-DD");
        let startTimeForOrder = momentObj.tz(userTimeZone).format("HH:mm");

        orderTimestampState = {
          ...orderTimestampState,
          order_job_start_date: startDateForOrder,
          order_job_start_time: startTimeForOrder,
        };
        setStateForOrderTime(orderTimestampState);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);
  const handleUpdateCustomer = async (customer: Customer) => {
    updateCustomerHook
      .updateCustomer(customer)
      .then((data) => {
        snackbar.success(`Updated customer`);
        setCustomerUpdated(data);
        setSelectedCustomer(data);
        setOpenCustomerDialog(false);
        queryClient.invalidateQueries("customers");
      })
      .catch((err) => {
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
      });
  };

  const handleDeleteOrders = async (ids: string[]) => {
    deleteOrders(ids)
      .then(() => {
        queryClient.invalidateQueries("orders");
        snackbar.success(`Deleted booking`);

        setOpenConfirmDeleteDialog(false);
        navigate("/jobs");
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message);
        } else {
          snackbar.error(`Something went wrong.`);
        }
      });
  };

  const handleDeleteConfirmation = async () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleSubmitBookingInfo = () => {
    let userTimeZone =
      userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess();

    let formattedOrderOrderStartTimestamp = moment
      .tz(
        `${stateForOrderTime.order_job_start_date} ${stateForOrderTime.order_job_start_time}`,
        "YYYY-MM-DD HH:mm",
        userTimeZone
      )
      .unix();

    let formattedOrderOrderEndTimestamp = moment
      .tz(
        `${stateForOrderTime.order_job_start_date} ${stateForOrderTime.order_job_start_time}`,
        "YYYY-MM-DD HH:mm",
        userTimeZone
      )
      .add(30, "minutes")
      .unix();

    if (selectedCustomer && selectedCustomer.id) {
      const OrderData: Partial<Order> = {
        ...notificationSettingForBookingInvoiceOrder,
        customer_ref_id: selectedCustomer.id,
        notes: orderNotes,
        tags: orderTags,
        order_job_start_timestamp: showBookingDetails
          ? formattedOrderOrderStartTimestamp
          : undefined,
        order_job_end_timestamp: showBookingDetails
          ? formattedOrderOrderEndTimestamp
          : undefined,
        order_items: OrderProductItems,

        order_billing_details: { ...orderBillingDetail },
        calendar_color: selectedCalendarColor.color,
        order_items_additional:
          order && order.order_items_additional
            ? order.order_items_additional
            : [],
        order_payment_completed: orderPaymentStatus,
        show_job_time_checkbox: showBookingDetails,
      };
      if (order && order.id) {
        onUpdate({ ...OrderData, id: order.id } as Order);
      } else {
        onAdd(OrderData);
      }
    } else {
      snackbar.error(`Missing customer`);
    }
  };

  const handleModalConfirmation = () => {
    handleSubmitBookingInfo();
  };

  const handleSubmit = (values: Partial<Order>) => {
    if (!editMode) {
      setShowConfirmationModal(true);
    } else {
      handleSubmitBookingInfo();
    }
  };
  useEffect(() => {
    if (order && order.id) {
      formik.setValues({
        ...order,
      });
    } else {
      formik.setValues({ ...formik.initialValues });
    }
  }, [order]);

  const formik = useFormik({
    initialValues: {
      customer_ref_id: order ? order.customer_ref_id : "",
      tags: order ? order.tags : [],
      order_items: order ? order.order_items : [],
      order_job_start_timestamp: order
        ? order.order_job_start_timestamp
        : moment().unix(),
      order_job_end_timestamp: order
        ? order.order_job_end_timestamp
        : moment().unix(),
    },
    validationSchema: Yup.object({}),
    onSubmit: handleSubmit,
  });
  return (
    <>
      <ConfirmationModalForBookingForm
        onConfirm={() => {
          handleModalConfirmation();
          setShowConfirmationModal(false);
        }}
        processing={false}
        id={`confirmation-modal-for-booking-form`}
        open={showConfirmationModal}
        setOpenModal={(val) => {
          setShowConfirmationModal(val);
        }}
        customer_phone_number={selectedCustomer?.phone_number}
        customer_country_code={selectedCustomer?.mobile_country_code}
        customer_email={selectedCustomer?.email}
        custom_email={notificationSettingForBookingInvoiceOrder.custom_email}
        send_text={notificationSettingForBookingInvoiceOrder.send_text}
        send_email={notificationSettingForBookingInvoiceOrder.send_email}
        send_custom_email={
          notificationSettingForBookingInvoiceOrder.send_custom_email
        }
        onChangeNotificationValues={(key: string, val: any) => {
          setNotificationSettingForBookingInvoiceOrder({
            ...notificationSettingForBookingInvoiceOrder,
            [`${key}`]: val,
          });
        }}
      />
      <DeleteDialogs
        open={openConfirmDeleteDialog}
        processing={isDeleting}
        onConfirm={() => {
          if (order && order.id) {
            handleDeleteOrders([order.id]);
          }
        }}
        id={`Delete-dialog-for-orders`}
        setOpenModal={(val: boolean) => {
          setOpenConfirmDeleteDialog(val);
        }}
      />

      <div className="z-50">
        <AddUpdateCustomerForm
          customer={customerUpdated}
          setModalOpen={(val: boolean) => {
            setOpenCustomerDialog(val);
          }}
          onAdd={handleAddCustomer}
          onUpdate={handleUpdateCustomer}
          onClose={() => {
            setCustomerUpdated(undefined);
            setOpenCustomerDialog(false);
          }}
          open={openCustomerDialog}
          processing={processingCustomer}
        />
      </div>
      <div className="z-50">
        <AddUpdateItemForm
          item={itemUpdated}
          setModalOpen={(val: boolean) => {
            setItemUpdated(undefined);
            setOpenItemDialog(val);
          }}
          onAdd={handleAddItem}
          onUpdate={handleUpdateItem}
          onClose={() => {
            setCustomerUpdated(undefined);
            setOpenCustomerDialog(false);
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
              keyEvent.preventDefault();
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
                        setSearchBoxCustomer(e.target.value);
                      }}
                      onHandleSelect={(selectedCustomer: any) => {
                        // setCustomerUpdated()
                        if (
                          searchCustomerHook.data &&
                          searchCustomerHook.data.data &&
                          searchCustomerHook.data.data.length > 0
                        ) {
                          const findItem = searchCustomerHook.data.data.find(
                            (elem) => elem.id === selectedCustomer.key
                          );
                          if (findItem) {
                            setSelectedCustomer(findItem);
                          }
                        }
                      }}
                      onHandleAddNew={() => {
                        setOpenCustomerDialog(true);
                      }}
                    />
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-4 ">
                  <div>
                    {selectedCustomer && selectedCustomer.id ? (
                      <SelectedCustomerCard
                        cardType="BOOKING"
                        customer={selectedCustomer}
                        created_at={
                          order && order.order_created_at_timestamp
                            ? `${moment
                                .unix(order.order_created_at_timestamp)
                                .tz(
                                  userInfo && userInfo.timezone
                                    ? userInfo.timezone
                                    : moment.tz.guess()
                                )
                                .format("dddd, MMMM Do YYYY, HH:mm:ss")}`
                            : `Booking Not created yet`
                        }
                        openNotification={() => {
                          setShowConfirmationModal(true);
                        }}
                        paymentStatus={orderPaymentStatus}
                        changePaymentStatus={(val) => {
                          setOrderPaymentStatus(val);
                        }}
                        showExtraDetails={editMode}
                        handleRemove={() => {
                          setSelectedCustomer(null);
                        }}
                        handleEdit={() => {
                          setCustomerUpdated(selectedCustomer);
                          setOpenCustomerDialog(true);
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

              <>
                <div>
                  {selectedCustomer && (
                    <div>
                      <SearchBar
                        label={"Add Products/Services"}
                        id="Search-box-find-item-booking-detail"
                        data={formattedDataForItemSearch}
                        value={searchBoxProduct}
                        isLoading={useItemHook.isFetching}
                        addNewButtonText="item"
                        showAddNewButton={true}
                        showError={false}
                        onChange={(e: any) => {
                          setSearchBoxProduct(e.target.value);
                        }}
                        onHandleSelect={(selectedItem: any) => {
                          // setCustomerUpdated()
                          if (useItemHook.data && useItemHook.data.length > 0) {
                            const findItem = useItemHook.data.find(
                              (elem) => elem.id === selectedItem.key
                            );
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
                              };

                              setOrderProductItems([
                                ...OrderProductItems,
                                newItem,
                              ]);
                            }
                          }
                        }}
                        onHandleAddNew={() => {
                          // setOpenCustomerDialog(true)
                          setOpenItemDialog(true);
                        }}
                      />
                    </div>
                  )}
                </div>
                {selectedCustomer && OrderProductItems.length === 0 && (
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
                <div>
                  {selectedCustomer && (
                    <>
                      {OrderProductItems && OrderProductItems.length > 0 && (
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
                      )}

                      {OrderProductItems &&
                        OrderProductItems.length > 0 &&
                        OrderProductItems.map((item, index) => {
                          return (
                            <TableForProductItemBookingPage
                              id={`${makeid(4)}-${item.id}`}
                              key={`main_table_item-${item.id}_${index}`}
                              index={index}
                              fileOrImageUploading={fileOrimageUploading}
                              handleAddFileOrImage={() => {
                                if (inputRef && inputRef.current) {
                                  setPointerForImageUpload(index);
                                  inputRef.current.click();
                                }
                              }}
                              handleChange={(key, val) => {
                                if (key === "quantity") {
                                  let newVal = allowOnlyNumberWithZero(val);
                                  if (newVal) {
                                    let tempArr = [...OrderProductItems];
                                    let tempObj = tempArr[index] as any;
                                    tempObj[`${key}`] = newVal;
                                    let subTotal =
                                      tempObj && tempObj.sub_total_cost
                                        ? tempObj.sub_total_cost
                                        : `0`;
                                    let finalQuantity =
                                      tempObj && tempObj.quantity
                                        ? `${tempObj.quantity}`
                                        : `0`;
                                    tempObj.total_cost = `${(
                                      parseFloat(subTotal) *
                                      parseInt(finalQuantity)
                                    ).toFixed(2)}`;
                                    tempArr[index] = { ...tempObj };

                                    setOrderProductItems([...tempArr]);
                                  }
                                } else if (key === "sub_total_cost") {
                                  let newVal = checkIfDecimalNumber(val);
                                  if (newVal) {
                                    let tempArr = [...OrderProductItems];
                                    let tempObj = tempArr[index] as any;
                                    tempObj[`${key}`] = newVal;
                                    let subTotal =
                                      tempObj && tempObj.sub_total_cost
                                        ? tempObj.sub_total_cost
                                        : `0`;
                                    let finalQuantity =
                                      tempObj && tempObj.quantity
                                        ? `${tempObj.quantity}`
                                        : `0`;
                                    tempObj.total_cost = `${(
                                      parseFloat(subTotal) *
                                      parseInt(finalQuantity)
                                    ).toFixed(2)}`;
                                    tempArr[index] = { ...tempObj };

                                    setOrderProductItems([...tempArr]);
                                  }
                                } else {
                                  let tempArr = [...OrderProductItems];
                                  let tempObj = tempArr[index] as any;
                                  tempObj[`${key}`] = val;
                                  let subTotal =
                                    tempObj && tempObj.sub_total_cost
                                      ? tempObj.sub_total_cost
                                      : `0`;
                                  let finalQuantity =
                                    tempObj && tempObj.quantity
                                      ? `${tempObj.quantity}`
                                      : `0`;
                                  tempObj.total_cost = `${(
                                    parseFloat(subTotal) *
                                    parseInt(finalQuantity)
                                  ).toFixed(2)}`;
                                  tempArr[index] = { ...tempObj };
                                  setOrderProductItems([...tempArr]);
                                }
                              }}
                              handleDeleteImage={(imageIndex: number) => {
                                const tempArr = [...OrderProductItems];
                                let tempArrImages: string[] = [];
                                if (
                                  tempArr &&
                                  tempArr[index] &&
                                  tempArr[index].before_images
                                ) {
                                  tempArrImages = tempArr[index]
                                    .before_images as string[];
                                }
                                tempArrImages.splice(imageIndex, 1);
                                tempArr[index] = {
                                  ...tempArr[index],
                                  before_images: tempArrImages,
                                };
                                setOrderProductItems([...tempArr]);
                              }}
                              handleDelete={() => {
                                const tempArr = [...OrderProductItems];

                                tempArr.splice(index, 1);
                                setOrderProductItems([...tempArr]);
                              }}
                              item={item}
                              currency={
                                userInfo && userInfo.currency
                                  ? userInfo.currency
                                  : "GBP"
                              }
                            />
                          );
                        })}
                      {/* Start */}
                      <div className=" lg:flex lg:flex-row-reverse lg:w-[75%] ">
                        <div className="w-full border-b pb-4 px-3 lg:px-0    lg:w-[30%] bg-white lg:border-b-0 border-b border-gray-300   gap-4 flex flex-col">
                          {OrderProductItems &&
                            OrderProductItems.length > 0 && (
                              <>
                                <div className="flex text-[18px]   border-b-2 p-6 items-center justify-between">
                                  <div className="text-textGray font-[500]">
                                    Sub Total
                                  </div>
                                  <div className="text-textPrimary font-[600]">
                                    {orderBillingDetail.items_total}
                                  </div>
                                </div>
                                <div className="flex text-[18px] items-center px-6 py-1 justify-between">
                                  <div className="text-textGray font-[500]">
                                    {`Tax(${orderBillingDetail.tax_rate}%)`}
                                  </div>
                                  <div className="text-textPrimary font-[600]">
                                    {orderBillingDetail.tax_amount}`
                                  </div>
                                </div>
                                <div className=" flex text-[24px] font-[600] bg-[#DEE2E6] border border-gray-300 px-6 py-4 items-center justify-between">
                                  <div className="text-textPrimary text-lg font-semibold">
                                    Total
                                  </div>
                                  <div className="text-textPrimary font-semibold text-lg">
                                    {orderBillingDetail.total_amount}
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                        <div className="w-full lg:w-[75%] bg-white p-4 rounded-b-lg gap-4 flex flex-col">
                          <div className="flex items-center text-[16px] font-[400] gap-2">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded "
                              checked={showBookingDetails}
                              onChange={(e) => {
                                setShowBookingDetails(e.target.checked);
                              }}
                            />
                            <div className="text-textPrimary">
                              Add booking time
                            </div>
                          </div>
                          {showBookingDetails && selectedCustomer && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="order_calendar_color"
                                >
                                  Calendar Color{" "}
                                  <span className="text-rose-500">*</span>
                                </label>
                                <DropdownClassicColorSelection
                                  position={"top"}
                                  selectedValue={selectedCalendarColor}
                                  handleChange={(val: CalendarColorOptions) => {
                                    setSelectedCalendarColor(val);
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {showBookingDetails && selectedCustomer && (
                            <>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                  <label
                                    className="text-gray-700"
                                    htmlFor="order_job_start_date"
                                    onClick={() => {
                                      appointmentStartDateRef.current.showPicker();
                                    }}
                                  >
                                    Order Start Date{" "}
                                    <input
                                      type="date"
                                      id="order_job_start_date"
                                      ref={appointmentStartDateRef}
                                      value={
                                        stateForOrderTime.order_job_start_date
                                      }
                                      onChange={(e) => {
                                        setStateForOrderTime({
                                          ...stateForOrderTime,
                                          order_job_start_date: e.target.value,
                                        });
                                      }}
                                      onClick={() => {
                                        appointmentStartDateRef.current.showPicker();
                                      }}
                                      className="appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent flex-1"
                                    />
                                  </label>
                                </div>{" "}
                                <div>
                                  <label
                                    className="text-gray-700"
                                    htmlFor="appointment_start_time"
                                  >
                                    Order Start Time{" "}
                                    <div className="container ">
                                      <div className="flex items-center w-full gap-2 ">
                                        <select
                                          name=""
                                          className="py-2 px-2 outline-none appearance-none  rounded-lg w-full"
                                          value={`${stateForOrderTime.order_job_start_time}`}
                                          onChange={(e) => {
                                            setStateForOrderTime({
                                              ...stateForOrderTime,
                                              order_job_start_time: `${e.target.value}`,
                                            });
                                          }}
                                        >
                                          {timeArr.map((elem) => {
                                            return (
                                              <option
                                                value={elem}
                                                key={`${makeid(4)}`}
                                              >
                                                {elem}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </>
                          )}
                          <div className="lg:w-[90%] w-full flex flex-col gap-2">
                            <div className="text-[15px] mt-3 font-[500] text-textPrimary ">
                              <MultipleSelectWithChips
                                allOptions={popularTags}
                                addNewVal={() => {
                                  if (tagsInput && tagsInput.length > 0) {
                                    let hasDuplicate = orderTags.find(
                                      (findElem) => findElem === tagsInput
                                    );
                                    if (!hasDuplicate) {
                                      setOrderTags([...orderTags, tagsInput]);
                                      setTagsInput("");
                                    }
                                  }
                                }}
                                inputVal={tagsInput}
                                setInputVal={(val: string) => {
                                  setTagsInput(val);
                                }}
                                onRemove={(elem_val) => {
                                  const tempArr = [...orderTags];
                                  const index = tempArr.indexOf(elem_val);
                                  if (index > -1) {
                                    // only splice array when item is found
                                    tempArr.splice(index, 1); // 2nd parameter means remove one item only
                                  }
                                  setOrderTags([...tempArr]);
                                }}
                                onSelect={(selected_val) => {
                                  let hasDuplicate = orderTags.find(
                                    (findElem) => findElem === selected_val
                                  );
                                  if (!hasDuplicate) {
                                    setOrderTags([...orderTags, selected_val]);
                                    setTagsInput("");
                                  }
                                }}
                                selectedOptions={orderTags}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        style={{ display: "none" }}
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                      />
                      {/* End */}
                      <div className="w-full lg:w-[75%] bg-white p-4 rounded-b-lg gap-4 flex flex-col">
                        <div className="lg:w-[90%] w-full flex flex-col gap-2">
                          <div className="flex mt-3 flex-col lg:flex-row gap-2">
                            <div className="w-full border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                              <div className="text-textPrimary  text-[14px] font-[500]">
                                Booking Notes for Internal Use
                              </div>
                              <textarea
                                className="outline-none rounded whitespace-pre  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                                rows={4}
                                value={orderNotes}
                                onKeyDown={(keyEvent) => {
                                  if (keyEvent.code === "Enter") {
                                    setOrderNotes(`${orderNotes}\n`);
                                  }
                                }}
                                onChange={(e) => {
                                  setOrderNotes(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="w-full lg:w-[75%]  text-[15px] font-[500] flex my-2 py-3 bg-transparent flex-col lg:flex-row lg:justify-end gap-2 px-2 py-4 border-t border-slate-200">
                  <>
                    {editMode && (
                      <button
                        className="btn border-slate-200 hover:border-slate-300 text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                        onClick={(e) => {
                          e.preventDefault();
                          let redirectUrl = `/invoice/add`;

                          redirectUrl = editMode
                            ? `${redirectUrl}?booking_id=${order?.id}`
                            : `${redirectUrl}`;
                          navigate(`${redirectUrl}`);
                        }}
                        disabled={
                          selectedCustomer && selectedCustomer.id ? false : true
                        }
                      >
                        <svg
                          className="w-4 h-4 fill-current opacity-50 shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                        </svg>
                        <span className="ml-2">Create Invoice</span>
                      </button>
                    )}

                    {processing ? (
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
                        {editMode ? `Update Booking` : `Create New Booking`}
                      </button>
                    )}
                    {editMode && (
                      <button
                        className="btn bg-rose-500 hover:bg-rose-600 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteConfirmation();
                        }}
                      >
                        Delete Booking
                      </button>
                    )}
                  </>
                </div>
              </>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUpdateOrderForm;
