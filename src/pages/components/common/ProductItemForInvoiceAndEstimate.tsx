import React, { useState } from "react"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { getPresignURLToUpload } from "../../../hooks/useFileUploadToS3"
import { ImCross } from "react-icons/im"
import Del from "../../../images/delete.png"
import Gallery from "../../../images/gallery.png"
import { OrderProductItem } from "../../../types/item"
export interface ProductItemForInvoiceAndEstimateProps {
  item: OrderProductItem
  currency: string
  id: string
  handleChange: (key: any, val: any) => void
  handleDelete: () => void
  index: number
}
function ProductItemForInvoiceAndEstimate(
  props: ProductItemForInvoiceAndEstimateProps
) {
  const [open, setOpen] = useState(false)
  const { handleChange, handleDelete, item, id, index } = props

  return (
    <div className="w-full lg:w-[75%]  border-b-1  gap-2 flex flex-col">
      <div className="flex bg-white rounded-t-lg shadow-sm flex-col">
        <div className="p-5 border-b border-gray-300  gap-2 flex flex-col">
          <div className="lg:flex text-[15px] font-[500] hidden text-textGray">
            Item #{index + 1}
          </div>
          <div className="flex w-full items-center">
            <div className="lg:hidden w-full flex items-center justify-between">
              <div className="lg:hidden text-[13px] font-[500]  text-textGray">
                Item #{index + 1}
              </div>
              <img
                className="lg:hidden cursor-pointer flex"
                src={Del}
                alt={`delete_table_item_${item.name}_${index}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleDelete()
                }}
              />
            </div>
            <div className="hidden lg:flex lg:flex-1 text-[24px] font-[600] text-textPrimary">
              <input
                className=" border border-gray-300 rounded-md outline-none p-2  text-textGray"
                type={"text"}
                id={`name_input${id}_for_desktop`}
                placeholder="Name"
                value={item.name}
                onChange={(e) => {
                  handleChange("name", e.target.value)
                }}
              />
            </div>

            <div className="lg:flex space-x-6 hidden items-center">
              <div className="flex space-x-3  ">
                <input
                  id={`quantity_input${id}_for_desktop`}
                  className=" w-16   rounded  text-[13px] font-[500] outline-none border border-gray-300 p-2"
                  value={item.quantity}
                  onChange={(e) => {
                    handleChange("quantity", e.target.value)
                  }}
                  type="text"
                />
                <input
                  className=" w-24 rounded text-[13px] font-[500]    outline-none border border-gray-300 p-2"
                  value={`${item.sub_total_cost}`}
                  id={`sub_total_input${id}_for_desktop`}
                  onChange={(e) => {
                    handleChange("sub_total_cost", e.target.value)
                  }}
                  type="text"
                />
              </div>
              <input
                className=" w-16   rounded text-[13px] font-[500]   border-none  outline-none  p-2 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                id={`total_cost_input${id}_for_desktop`}
                value={`${item.total_cost}`}
                disabled
                onChange={(e) => {
                  handleChange("total_cost", e.target.value)
                }}
              />

              <div className="flex items-center  justify-center rounded-full bg-red-300 ">
                <img
                  className="cursor-pointer"
                  src={Del}
                  alt={`delete_table_item_${item.name}_${index}_${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete()
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex text-[20px] font-[600] lg:hidden  text-textPrimary">
            <input
              className=" border border-gray-300 rounded-md outline-none p-2  text-textGray"
              type={"text"}
              id={`name_input${id}_for_desktop`}
              placeholder="Name"
              value={item.name}
              onChange={(e) => {
                handleChange("name", e.target.value)
              }}
            />
          </div>

          <div className="w-full lg:w-1/2 items-center flex">
            <textarea
              className="w-full text-[14px] font-[400] border border-gray-300 rounded-md outline-none p-2  text-textGray"
              rows={2}
              id={`notes_input${id}_for_desktop`}
              placeholder="Notes Or Item Description"
              value={item.notes}
              onChange={(e) => {
                handleChange("notes", e.target.value)
              }}
            />
          </div>
          <div className="lg:hidden items-center flex pt-2 gap-10">
            <div className="flex flex-col gap-4 ">
              <div className=" text-[14px] font-[400] text-textGray">Qty</div>

              <input
                className=" w-full text-[13px] font-[500] rounded outline-none border border-gray-300 p-2"
                value={item.quantity}
                id={`quantity_input${id}_for_mobile`}
                onChange={(e) => {
                  handleChange("quantity", e.target.value)
                }}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <div className=" text-[14px] font-[400] text-textGray">GBP</div>
              <input
                className=" w-full text-[13px] font-[500] rounded outline-none border border-gray-300 p-2"
                value={`${item.sub_total_cost}`}
                id={`sub_total_input${id}_for_mobile`}
                onChange={(e) => {
                  handleChange("sub_total_cost", e.target.value)
                }}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <div className=" text-[14px] font-[400] text-textGray">Total</div>
              <input
                className=" w-full text-[13px] font-[500] rounded  outline-none border bg-[#DEE2E6] border-gray-300 p-2"
                value={`${item.total_cost}`}
                id={`total_cost_input${id}_for_mobile`}
                disabled
                onChange={(e) => {
                  handleChange("total_cost", e.target.value)
                }}
              />
            </div>
          </div>

          <div className="flex mt-3  items-center  gap-4  overflow-auto w-full ">
            {item &&
              item.before_images &&
              item.before_images.length > 0 &&
              item.before_images.map((item_, index) => (
                <div
                  key={`${index}-unique-before_images`}
                  className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden relative"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={item_}
                    alt={`Showing_preview_image${index}`}
                  />
                  <div
                    className="cursor-pointer absolute top-1 rounded-full  right-2 w-4 h-4 p-1  bg-gray-300 flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault()
                      // handleDelete()
                    }}
                  >
                    <ImCross className="  text-4" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItemForInvoiceAndEstimate
