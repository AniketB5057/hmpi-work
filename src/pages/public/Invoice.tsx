import React, { useEffect, useRef, useState } from "react"

import { useLocation, useParams } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import { useSnackbar } from "../../contexts/SnackbarProvider"
import { fetchSpecificInvoiceForPublic } from "../../hooks/invoices/useInvoice"
import { getInvoiceResponseForPublic } from "../../types/invoice"
import moment from "moment"
import { useReactToPrint } from "react-to-print"
import { makeid } from "../../utils/commonFunctions"

function PublicInvoicePage() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const invoiceComponent = useRef<any>()
  const [isPreview, setIsPreview] = useState(false)
  const snackbar = useSnackbar()
  const [invoice, setInvoice] = useState<getInvoiceResponseForPublic | null>(
    null
  )
  let { id } = useParams()

  const handlePrint = useReactToPrint({
    content: () => invoiceComponent.current,
  })
  const fetchData = async () => {
    setIsLoading(true)
    try {
      if (id) {
        const result = await fetchSpecificInvoiceForPublic(id)

        setInvoice(result)
      }
      setIsLoading(false)
      snackbar.success("Invoice Ready")
    } catch (err) {
      console.log(err)
      window.location.href = `/error`
      snackbar.error("Could not find invoice")
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
                window.location.href = `/invoice/edit/${id}`
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

        <section className="py-2" ref={invoiceComponent}>
          <div className="max-w-5xl mx-auto pb-4 bg-white">
            <article className="overflow-hidden">
              <div className="bg-[white] rounded-b-md">
                <div className="p-9">
                  <div className="space-y-6 text-slate-700">
                    {invoice && invoice.userInfo.companyLogo && (
                      <img
                        className="max-w-full h-auto"
                        src={invoice.userInfo.companyLogo}
                      />
                    )}
                  </div>
                </div>
                <div className="p-9">
                  <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Invoice Detail:
                        </p>
                        <p>{invoice && invoice.userInfo.companyName}</p>
                        <p>
                          {invoice &&
                            invoice.userInfo.addressInfo.street_address}
                        </p>
                        <p>
                          {invoice && invoice.userInfo.addressInfo.city},{" "}
                          {invoice && invoice.userInfo.addressInfo.post_code}
                        </p>
                        <p>{invoice && invoice.userInfo.addressInfo.country}</p>
                        <p>{invoice && invoice.userInfo.companyPhone}</p>
                        <p>{invoice && invoice.userInfo.companyEmail}</p>
                        {invoice && invoice.show_vat_info && (
                          <p>VAT/GST Info: {invoice && invoice.vat_info}</p>
                        )}
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Billed To
                        </p>
                        <p>{`${invoice && invoice.customerObject.first_name} ${
                          invoice && invoice.customerObject.last_name
                        }`}</p>
                        <p>{`${
                          invoice && invoice.customerObject.address_line_1
                        }`}</p>
                        {invoice &&
                          invoice.customerObject.address_line_2 &&
                          invoice &&
                          invoice.customerObject.address_line_2.length > 0 && (
                            <p>{`${
                              invoice && invoice.customerObject.address_line_2
                            }`}</p>
                          )}
                        <p>{`${invoice && invoice.customerObject.city}, ${
                          invoice && invoice.customerObject.post_code
                        }`}</p>
                        <p>{`${invoice && invoice.customerObject.country}`}</p>
                        <p>{`${invoice && invoice.customerObject.email}`}</p>
                        <p>{`${
                          invoice && invoice.customerObject.phone_number
                        }`}</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Reference
                        </p>
                        <p>
                          <span>
                            {invoice &&
                            invoice.invoice_prefix &&
                            invoice.invoice_prefix.length > 0
                              ? `${invoice.invoice_prefix}-`
                              : ``}
                            {invoice && invoice.invoice_sequence_id}
                          </span>
                        </p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Date of Issue
                        </p>
                        <p>
                          {invoice && invoice.invoice_created_at_timestamp
                            ? `${moment
                                .unix(invoice.invoice_created_at_timestamp)
                                .format("MMMM D, YYYY")}`
                            : `${moment().format("MMMM D, YYYY")}`}
                        </p>
                        {invoice && invoice.showDueDate && (
                          <>
                            <p className="mt-2 text-sm font-normal text-slate-700">
                              Due
                            </p>
                            <p>
                              {invoice && invoice.invoice_due_date
                                ? `${moment
                                    .unix(invoice.invoice_due_date)
                                    .format("MMMM D, YYYY")}`
                                : `${moment().format("MMMM D, YYYY")}`}
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
                        {invoice &&
                          invoice.invoice_items &&
                          invoice.invoice_items.map(
                            (elem, invoice_index_item) => {
                              return (
                                <tr
                                  className="border-b border-slate-200"
                                  key={`${invoice_index_item}-invoice-item${makeid(
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
                                    {invoice && invoice.userInfo.currency}{" "}
                                    {elem.sub_total_cost}
                                  </td>
                                  <td className=" py-4 text-sm text-right text-slate-500 sm:table-cell">
                                    {invoice && invoice.userInfo.currency}{" "}
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
                            className=" pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Subtotal
                          </th>

                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {invoice && invoice.userInfo.currency}{" "}
                            {invoice &&
                              invoice.invoice_billing_details?.items_total}
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
                            {invoice && invoice.userInfo.currency}{" "}
                            {invoice &&
                              invoice.invoice_billing_details?.discount_total}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className=" pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            {`${
                              invoice &&
                              invoice.invoice_billing_details &&
                              invoice.invoice_billing_details.tax_rate
                                ? `Tax (${invoice.invoice_billing_details.tax_rate}%)`
                                : `No Tax Rate`
                            }`}
                          </th>

                          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {invoice && invoice.userInfo.currency}{" "}
                            {invoice &&
                              invoice.invoice_billing_details?.tax_amount}
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
                            {invoice && invoice.userInfo.currency}{" "}
                            {invoice &&
                              invoice.invoice_billing_details?.total_amount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="text-center">
                  {!isPreview && (
                    <>
                      {invoice &&
                        !invoice.invoice_payment_completed &&
                        invoice.invoice_payment_link &&
                        invoice.invoice_payment_link.length > 0 && (
                          <button
                            className="btn-lg bg-indigo-500 hover:bg-indigo-600 text-white"
                            onClick={(e) => {
                              e.preventDefault()
                              window.location.href = `${invoice.invoice_payment_link}`
                            }}
                          >
                            Click to Pay Now
                          </button>
                        )}
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <div className="border-t pt-9 border-slate-200">
                    <div className="text-sm font-light text-slate-700">
                      <p>{invoice && invoice.invoice_notes_external}</p>
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

export default PublicInvoicePage
