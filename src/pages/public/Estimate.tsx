import React, { useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import { useSnackbar } from "../../contexts/SnackbarProvider"
import { fetchSpecificEstimateForPublic } from "../../hooks/estimates/useEstimate"
import moment from "moment"
import { makeid } from "../../utils/commonFunctions"
import { getEstimateResponseForPublic } from "../../types/estimate"
import { useReactToPrint } from "react-to-print"

function PublicEstimatePage() {
  const [isLoading, setIsLoading] = useState(true)
  const snackbar = useSnackbar()
  const location = useLocation()
  const estimateComponent = useRef<any>()
  const [isPreview, setIsPreview] = useState(false)
  const [estimate, setEstimate] = useState<getEstimateResponseForPublic | null>(
    null
  )
  let { id } = useParams()

  const handlePrint = useReactToPrint({
    content: () => estimateComponent.current,
  })
  const fetchData = async () => {
    setIsLoading(true)
    try {
      if (id) {
        const result = await fetchSpecificEstimateForPublic(id)

        setEstimate(result)
      }
      setIsLoading(false)
      snackbar.success("Estimate Ready")
    } catch (err) {
      console.log(err)
      window.location.href = `/error`
      snackbar.error("Could not find estimate")
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (location.pathname.startsWith("/preview")) {
        setIsPreview(true)
      } else {
        setIsPreview(false)
      }
    }

    return () => {
      mounted = false
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  } else {
    return (
      <div>
        {isPreview && (
          <div className="absolute p-14 top-0 left-0">
            <button
              className=" btn-sm bg-indigo-500 hover:bg-indigo-600 text-white "
              onClick={() => {
                window.location.href = `/estimate/edit/${id}`
              }}
            >
              Go Back
            </button>
          </div>
        )}
        <div className="absolute p-14 top-0 right-0">
          <button
            className=" btn-sm bg-indigo-500 hover:bg-indigo-600 text-white "
            onClick={() => {
              handlePrint()
            }}
          >
            Print
          </button>
        </div>
        <section className="py-2" ref={estimateComponent}>
          <div className="max-w-5xl mx-auto pt-16 pb-4 bg-white">
            <article className="overflow-hidden">
              <div className="bg-[white] rounded-b-md">
                <div className="p-9">
                  <div className="space-y-6 text-slate-700">
                    {estimate && estimate.userInfo.companyLogo && (
                      <img
                        className="max-w-full h-auto"
                        src={estimate.userInfo.companyLogo}
                      />
                    )}
                  </div>
                </div>
                <div className="p-9">
                  <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Estimate Detail:
                        </p>
                        <p>{estimate && estimate.userInfo.companyName}</p>
                        <p>
                          {estimate &&
                            estimate.userInfo.addressInfo.street_address}
                        </p>
                        <p>
                          {estimate && estimate.userInfo.addressInfo.city},{" "}
                          {estimate && estimate.userInfo.addressInfo.post_code}
                        </p>
                        <p>
                          {estimate && estimate.userInfo.addressInfo.country}
                        </p>
                        <p>{estimate && estimate.userInfo.companyPhone}</p>
                        <p>{estimate && estimate.userInfo.companyEmail}</p>
                        {estimate && estimate.showVatInfo && (
                          <p>VAT/GST Info: {estimate && estimate.vatInfo}</p>
                        )}
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Billed To
                        </p>
                        <p>{`${
                          estimate && estimate.customerObject.first_name
                        } ${estimate && estimate.customerObject.last_name}`}</p>
                        <p>{`${
                          estimate && estimate.customerObject.address_line_1
                        }`}</p>
                        {estimate &&
                          estimate.customerObject.address_line_2 &&
                          estimate &&
                          estimate.customerObject.address_line_2.length > 0 && (
                            <p>{`${
                              estimate && estimate.customerObject.address_line_2
                            }`}</p>
                          )}
                        <p>{`${estimate && estimate.customerObject.city}, ${
                          estimate && estimate.customerObject.post_code
                        }`}</p>
                        <p>{`${
                          estimate && estimate.customerObject.country
                        }`}</p>
                        <p>{`${estimate && estimate.customerObject.email}`}</p>
                        <p>{`${
                          estimate && estimate.customerObject.phone_number
                        }`}</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Reference
                        </p>
                        <p>
                          <span>
                            {estimate &&
                            estimate.prefix &&
                            estimate.prefix.length > 0
                              ? `${estimate.prefix}-`
                              : ``}
                            {estimate && estimate.estimate_sequence_id}
                          </span>
                        </p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Date of Issue
                        </p>
                        <p>
                          {" "}
                          {estimate && estimate.estimate_created_at_timestamp
                            ? `${moment
                                .unix(estimate.estimate_created_at_timestamp)
                                .format("MMMM D, YYYY")}`
                            : `${moment().format("MMMM D, YYYY")}`}
                        </p>
                        {estimate && estimate.showValidityDate && (
                          <>
                            <p className="mt-2 text-sm font-normal text-slate-700">
                              Due
                            </p>
                            <p>
                              {estimate &&
                                estimate.showValidityDate &&
                                `${moment()
                                  .add(1, "week")
                                  .format("MMMM D, YYYY")}`}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-9">
                  <div className="flex flex-col mx-0 mt-8">
                    <table className="min-w-full divide-y divide-slate-500">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                          >
                            Item Details
                          </th>
                          <th
                            scope="col"
                            className=" py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className=" py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                          >
                            Rate
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {estimate &&
                          estimate.estimate_items &&
                          estimate.estimate_items.map(
                            (elem, estimate_index_item) => {
                              return (
                                <tr
                                  className="border-b border-slate-200"
                                  key={`${estimate_index_item}-estimate-item${makeid(
                                    4
                                  )}`}
                                >
                                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                    <div className="font-medium text-slate-700">
                                      <span>{elem.name}</span>
                                    </div>
                                    <div className="font-semi text-slate-500">
                                      {/* <span>{elem.notes}</span> */}
                                    </div>
                                  </td>
                                  <td className=" px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                    {elem.quantity}
                                  </td>
                                  <td className=" px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                    {estimate && estimate.userInfo.currency}{" "}
                                    {elem.sub_total_cost}
                                  </td>
                                  <td className=" py-4 text-sm text-right text-slate-500 sm:table-cell">
                                    {estimate && estimate.userInfo.currency}{" "}
                                    {elem.total_cost}
                                  </td>
                                </tr>
                              )
                            }
                          )}

                        {/* Here you can write more products/tasks that you want to charge for*/}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Subtotal
                          </th>

                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {estimate && estimate.userInfo.currency}{" "}
                            {estimate &&
                              estimate.estimate_billing_details?.items_total}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className=" pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Discount
                          </th>

                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {estimate && estimate.userInfo.currency}{" "}
                            {estimate &&
                              estimate.estimate_billing_details?.discount_total}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className=" pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            {`${
                              estimate &&
                              estimate.estimate_billing_details &&
                              estimate.estimate_billing_details.tax_rate
                                ? `Tax (${estimate.estimate_billing_details.tax_rate}%)`
                                : `No Tax Rate`
                            }`}
                          </th>

                          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {estimate && estimate.userInfo.currency}{" "}
                            {estimate &&
                              estimate.estimate_billing_details?.tax_amount}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className=" pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                          >
                            Total
                          </th>

                          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                            {estimate && estimate.userInfo.currency}{" "}
                            {estimate &&
                              estimate.estimate_billing_details?.total_amount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="border-t pt-9 border-slate-200">
                    <div className="text-sm font-light text-slate-700">
                      <p>{estimate && estimate.estimate_notes_external}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center front-medium text-sm">
                  Powered By{" "}
                  <span
                    className="cursor-pointer text-center text-sm font-medium text-red-500 hover:text-red-400"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open("https://servicebuddy.io", "_blank")
                    }}
                  >
                    ServiceBuddy.io
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    )
  }
}

export default PublicEstimatePage
