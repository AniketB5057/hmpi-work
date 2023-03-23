import { useContext, useEffect, useState } from "react";

import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSnackbar } from "../contexts/SnackbarProvider";
import { useAddOrder } from "../hooks/orders/useAddOrder";
import { fetchSpecificOrder } from "../hooks/orders/useOrder";
import { useUpdateOrder } from "../hooks/orders/useUpdateOrder";
import { LayoutContext } from "../layouts/DashboardLayout";
import { Order } from "../types/order";
import AddUpdateOrderForm from "./components/orders/AddUpdateOrderForm";

function AddOrUpdateBooking() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const editMode = location.pathname.startsWith("/job/edit");
  const breadcrumbsArr = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Bookings",
      link: "/jobs",
    },
    {
      label: `${editMode ? `Edit Booking` : `New Booking`}`,
      link: `${editMode ? `/job/edit/${id}` : `/job/add`}`,
    },
  ];

  const { addOrder, isAdding } = useAddOrder();
  const { getBreadcrumbs, setBreadcrumbs } = useContext(LayoutContext);

  const { isUpdating, updateOrder } = useUpdateOrder();
  const processing = isAdding || isUpdating;

  const [orderUpdated, setOrderUpdated] = useState<Order | undefined>(
    undefined
  );

  const fetchSpecificOrderData = async () => {
    if (id) {
      const getData = await fetchSpecificOrder(id);
      if (getData) {
        setIsLoadingOrder(false);
        setOrderUpdated(getData);

        snackbar.success("Booking information loaded");
      } else {
        snackbar.error("Something went wrong!!");
        setIsLoadingOrder(false);
      }
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setBreadcrumbs(breadcrumbsArr);
    }

    return () => {
      setBreadcrumbs([]);
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (location.pathname.startsWith("/job/add")) {
      setOrderUpdated(undefined);
      setIsLoadingOrder(false);
    }
  }, [location, id]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (location.pathname.startsWith("/job/edit")) {
        fetchSpecificOrderData();
      }
    }
    return () => {
      mounted = false;
    };
  }, []);
  const handleAddOrder = async (order: Partial<Order>) => {
    addOrder(order as Order)
      .then((data) => {
        snackbar.success(`Added booking`);
        queryClient.invalidateQueries("orders");

        window.location.href = `/job/edit/${data.id}`;
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

  const handleUpdateOrder = async (order: Order) => {
    updateOrder(order)
      .then((data) => {
        snackbar.success(`Booking updated`);
        queryClient.invalidateQueries("orders");
        window.location.href = `/job/edit/${data.id}`;
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
  return (
    <>
      {isLoadingOrder ? (
        <LoadingSpinner />
      ) : (
        <div className="p-4">
          <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center">
              {/* Left: Title */}
              <div className="mb-2 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  {editMode ? `Edit Booking` : `New Booking`}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <AddUpdateOrderForm
              order={orderUpdated}
              onAdd={handleAddOrder}
              onUpdate={handleUpdateOrder}
              onClose={() => {
                setOrderUpdated(undefined);
              }}
              processing={isAdding || isUpdating}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AddOrUpdateBooking;
