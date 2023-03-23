import React from "react"
import { makeid } from "../../../utils/commonFunctions"
import { FieldTypes } from "../../../types/fieldTypes"
export interface CustomFieldsProps {
  type: FieldTypes
  onChange: any
  fullWidth: boolean
  handleOnClose: any
  index: number
  prefillValue: string | string[]
  required: boolean
  label: string
  disabled: boolean
}

function CustomFields(props: CustomFieldsProps) {
  return (
    <div
      style={{ marginTop: "10px", marginBottom: "10px", position: "relative" }}
      className="rounded-lg bg-white shadow-lg"
    >
      <div className="px-5 py-4">
        <div className="text-sm">
          <div className="font-medium text-slate-800 mb-3">
            {props.index + 1}. Custom Field : {props.type}
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Input name <span className="text-rose-500">*</span>
            </label>
            <input
              className="form-input w-full px-2 py-1"
              type="text"
              value={props.label}
              onChange={(e) => {
                props.onChange({
                  prefillValue: props.prefillValue,
                  required: props.required,
                  type: props.type,
                  label: e.target.value,
                })
              }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="country">
              Input Type <span className="text-rose-500">*</span>
            </label>
            <select
              id={`${makeid(6)}-select-input-type`}
              className="form-select w-full"
              value={props.type}
              onChange={(e) => {
                props.onChange({
                  prefillValue: props.prefillValue,
                  required: props.required,
                  type: e.target.value as FieldTypes,
                  label: props.label,
                })
              }}
            >
              {[
                FieldTypes.TEXT,
                FieldTypes.NUMBER,
                FieldTypes.CHECKBOX,
                FieldTypes.RADIO_OPTIONS,
                FieldTypes.IMAGES,
                FieldTypes.DROPDOWN,
                FieldTypes.DATE,
                FieldTypes.LARGE_TEXT,
              ].map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              })}
            </select>
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Please select your input type
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Prefill value <span className="text-rose-500">*</span>
            </label>
            <input
              className="form-input w-full px-2 py-1"
              type="text"
              value={props.prefillValue}
              onChange={(e) => {
                props.onChange({
                  prefillValue: e.target.value,
                  required: props.required,
                  type: props.type,
                  label: props.label,
                })
              }}
              required
            />
          </div>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm font-medium ml-2">Is this required ?</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default CustomFields
