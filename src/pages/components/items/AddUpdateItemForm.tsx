import { useFormik } from "formik"
import React, { useState, useEffect, useCallback } from "react"
import * as Yup from "yup"
import ModalBasic from "../../../components/ModalBasic"
import { FieldTypes } from "../../../types/fieldTypes"
import { ICustomFields, Item } from "../../../types/item"
import {
  allowOnlyNumberWithZero,
  checkIfDecimalNumber,
} from "../../../utils/commonFunctions"
import CustomFields from "./CustomFields"

export type ItemDialogProps = {
  onAdd: (item: Partial<Item>) => void
  onClose: () => void
  onUpdate: (item: Item) => void
  open: boolean
  processing: boolean
  item?: Item
  setModalOpen: (val: boolean) => void
}
function AddUpdateItemForm(props: ItemDialogProps) {
  const { onAdd, onClose, onUpdate, open, processing, item, setModalOpen } =
    props

  const [customFields, setCustomFields] = useState<ICustomFields[]>(
    item && item.fields ? item.fields : []
  )
  const editMode = Boolean(item && item.id)
  const handleAddCustomField = () => {
    setCustomFields([
      ...customFields,
      {
        type: FieldTypes.TEXT,
        prefillValue: "",
        required: false,
        label: `Custom Field ${customFields.length}`,
      },
    ])
  }
  const handleSubmit = (values: Partial<Item>) => {
    let seperateValues = values && values.cost && `${values.cost}`.split(".")
    let tempCost = 0
    let tempDecimal = 0
    if (seperateValues && seperateValues[0]) {
      tempCost = parseInt(seperateValues[0])
    }
    if (seperateValues && seperateValues[1]) {
      tempDecimal = parseInt(seperateValues[1])
    }
    const tempValues: Partial<Item> = {
      ...values,
      cost: tempCost,
      cost_decimals: tempDecimal,
      fields: [...customFields],
    }
    if (item && item.id) {
      onUpdate({ ...tempValues, id: item.id } as Item)
    } else {
      onAdd(tempValues)
    }
  }
  useEffect(() => {
    if (item && item.id) {
      formik.setValues({
        ...item,
      })
    } else {
      formik.setValues({ ...formik.initialValues })
    }
  }, [item])

  const handleCustomFieldsChange = useCallback(
    (val: ICustomFields, index__: number) => {
      setCustomFields((prevItems) =>
        prevItems.map((item__, index_child) => {
          return index_child !== index__ ? item__ : { ...val }
        })
      )
    },
    []
  )

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      desc: item ? item.desc : "",
      cost: item ? item.cost : 0,
      type: item ? item.type : "SERVICE",
      fields: item ? item.fields : [],
      name: item ? item.name : ``,
    },
    validationSchema: Yup.object({
      desc: Yup.string()
        .max(100, "max 100 char")
        .required("description required"),
      name: Yup.string().max(100, "max 100 char").required("name required"),
      cost: Yup.number().required("required to add cost"),
      type: Yup.string().required("please select type"),
    }),
    onSubmit: handleSubmit,
  })
  return (
    <>
      <ModalBasic
        id="add-update-Item-modal"
        modalOpen={open}
        setModalOpen={setModalOpen}
        title={editMode ? `Update Item` : `Add Item`}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="px-5 py-4">
            <div className="text-sm">
              <div className="font-medium text-slate-800 mb-3">
                {editMode ? `Update` : `Add`} Item for your company
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="name"
                  className="form-input w-full px-2 py-1"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  required
                />
                {formik.touched.name && Boolean(formik.errors.name) && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {formik.touched.name && formik.errors.name}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="desc"
                  className="form-input w-full px-2 py-1"
                  rows={4}
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  required
                />
                {formik.touched.desc && Boolean(formik.errors.desc) && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {formik.touched.desc && formik.errors.desc}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Cost <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="cost"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={formik.values.cost}
                    onChange={(e) => {
                      let newVal = checkIfDecimalNumber(e.target.value)
                      if (newVal) {
                        e.target.value = newVal
                        formik.handleChange(e)
                      }
                    }}
                    required
                  />
                  {formik.touched.cost && Boolean(formik.errors.cost) && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {formik.touched.cost && formik.errors.cost}
                    </span>
                  )}
                </div>
              </div>
              {/* <div>
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={handleAddCustomField}
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="ml-2">Add Customfields</span>
                </button>
              </div>
              {customFields.map((elem, index) => {
                return (
                  <div key={`-${index}-random-card-custom-field`}>
                    <CustomFields
                      fullWidth={true}
                      type={elem.type}
                      prefillValue={elem.prefillValue}
                      required={elem.required}
                      label={elem.label}
                      disabled={processing}
                      onChange={(newVal: ICustomFields) => {
                        handleCustomFieldsChange(newVal, index)
                      }}
                      //  onChange={(val: ICustomFields)=>{
                      //    let tempCustomFields = customFields
                      //    tempCustomFields[index] = val
                      //    setCustomFields([...tempCustomFields])
                      //  }}
                      handleOnClose={(index__: number) => {
                        setCustomFields(
                          customFields.filter(
                            (item, child_index) => child_index !== index__
                          )
                        )
                      }}
                      index={index}
                    />
                  </div>
                )
              })} */}
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  //   setFeedbackModalOpen(false)
                  onClose()
                }}
              >
                Cancel
              </button>
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
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  type="submit"
                >
                  {editMode ? `Update Item` : `Create New Item`}
                </button>
              )}
            </div>
          </div>
        </form>
      </ModalBasic>
    </>
  )
}

export default AddUpdateItemForm
