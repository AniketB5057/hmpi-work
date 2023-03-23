import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Order } from "../../../types/order";
import Orders from "./OrdersTableItem";
export interface OrderTableProps {
  selectedItems: string[];
  orders: Order[] | undefined;
  total_count: number | undefined;
  setSelectedItems: (val: string[]) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  isDataLoading: boolean;
}
function OrdersTable({
  setSelectedItems,
  selectedItems,
  orders,
  handleDelete,
  handleEdit,
  isDataLoading,
  total_count,
}: OrderTableProps) {
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (orders) {
      setList(orders);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: any) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    setSelectedItems([...isCheck]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  if (list.length === 0 && !isDataLoading) {
    return (
      <>
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
            </div>

            <div className="border-t border-slate-200">
              <div className="max-w-2xl m-auto mt-16">
                <div className="text-center px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-slate-200 to-slate-100 mb-4">
                    <svg className="w-5 h-6 fill-current" viewBox="0 0 20 24">
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
                    No bookings found
                  </h2>
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={() => {
                      navigate("/job/add");
                    }}
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="ml-2">Add Booking</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200">
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-slate-200 jobs-data-table">
            {/* Table header */}
            <thead className="text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
              <tr>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    {!isDataLoading && (
                      <label className="inline-flex">
                        <span className="sr-only">Select all</span>
                        <input
                          className="form-checkbox"
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </label>
                    )}
                  </div>
                </th> */}
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Booking Id</div>
                </th> */}

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">Client</div>
                </th>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Customer Email</div>
                </th> */}

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">Title / Property</div>
                </th>

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Next Visit / Calendar</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">Invoicing</div>
                </th>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Job Start Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Payment Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Created At</div>
                </th> */}
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-right">Total</div>
                </th>
              </tr>
            </thead>
            <>
              {!isDataLoading && (
                <>
                  {/* Table body */}
                  {list.map((order: Order) => {
                    return (
                      <Orders
                        key={order.id}
                        id={order.id}
                        totalItems={order.order_items.length}
                        complete_order={order}
                        order_id={`${order.order_sequence_id}`}
                        createdAt={order.order_created_at_timestamp}
                        customer_name={`${order.customerObject.first_name} ${order.customerObject.last_name}`}
                        customer_email={`${order.customerObject.email}`}
                        order_job_start_timestamp={
                          order.order_job_start_timestamp
                        }
                        customer_address={{
                          address_line_1: order.customerObject.address_line_1,
                          city: order.customerObject.city,
                          address_line_2: order.customerObject.address_line_2,
                          country: order.customerObject.country,
                          post_code: order.customerObject.post_code,
                        }}
                        order_job_end_timestamp={order.order_job_end_timestamp}
                        handleChecked={handleClick}
                        isChecked={isCheck.includes(order.id)}
                        payment_status={order.order_payment_completed}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    );
                  })}
                </>
              )}
            </>
          </table>
          {isDataLoading && (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersTable;
