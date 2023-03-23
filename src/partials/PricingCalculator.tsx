import React, { useEffect, useState } from "react"
import validator from "validator"
import { allowOnlyNumberWithZero } from "../utils/commonFunctions"

const fixedPerCredit = 0.1
export interface PricingCalculatorProps {
  totalCost: string
  setTotalCost: (val: string) => void
  totalCredits: number
  setTotalCredits: (val: number) => void
}
function PricingCalculator(props: PricingCalculatorProps) {
  const { totalCost, setTotalCost, totalCredits, setTotalCredits } = props
  const [smsEstimated, setSMSEstimated] = useState(0)
  const [employeeEstimated, setEmployeeEstimated] = useState(0)

  useEffect(() => {
    let mounted = true

    if (mounted) {
      let calculateTotalCost = (
        fixedPerCredit * (employeeEstimated * 100) +
        fixedPerCredit * smsEstimated
      ).toFixed(2)
      setTotalCost(calculateTotalCost)
      setTotalCredits(employeeEstimated * 100 + smsEstimated)
    }
    return () => {
      mounted = false
    }
  }, [employeeEstimated, smsEstimated])
  return (
    <section id="pricing-table-for">
      <div className="text-center">
        <div>
          <span className="text-xs text-slate-800">
            50 free credits every month.
          </span>
        </div>
        <div>
          <span className="text-xs text-slate-800">1 credit = $0.10</span>
        </div>
      </div>
      <div className="mb-8 text-center">
        <h3 className="mb-4 text-lg font-bold text-slate-800">
          Estimated Cost:{" "}
          {parseFloat(totalCost) > 0 ? (
            <span className="text-blue-500">$ {totalCost} / month</span>
          ) : (
            <span className="text-blue-500">Free Forever</span>
          )}
        </h3>

        <div className="mb-8 mt-4 text-center">
          <div>
            <label htmlFor="price" className="font-bold text-gray-700">
              I have:
              <input
                placeholder="buy credits"
                className="ml-2 w-12 rounded border border-solid border-gray-300"
                value={employeeEstimated}
                onChange={(e) => {
                  let newVal = allowOnlyNumberWithZero(e.target.value)

                  if (newVal) {
                    setEmployeeEstimated(parseInt(newVal))
                  }
                }}
              />
              <span> employee{`(s)`}.</span>
            </label>
            <div>
              <input
                type="range"
                min={0}
                name="price"
                value={employeeEstimated}
                onChange={(e) => {
                  setEmployeeEstimated(parseInt(e.target.value))
                }}
                max={20}
                step={1}
                className="w-22 h-2  appearance-none bg-blue-100"
              />
            </div>
            <div>
              <span className="text-xs text-slate-800">
                100 credits = 1 employee{`(s)`}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-8 mt-4 text-center">
          <div>
            <label htmlFor="price" className="font-bold text-gray-700">
              I will send:
              <input
                placeholder="buy credits"
                className="w-12 rounded border border-solid border-gray-300"
                value={smsEstimated}
                onChange={(e) => {
                  let newVal = allowOnlyNumberWithZero(e.target.value)

                  if (newVal) {
                    setSMSEstimated(parseInt(newVal))
                  }
                }}
              />
              <span> SMS per month.</span>
            </label>
            <div>
              <input
                type="range"
                min={0}
                name="price"
                value={smsEstimated}
                onChange={(e) => {
                  setSMSEstimated(parseInt(e.target.value))
                }}
                max={1000}
                step={10}
                className="w-22 h-2  appearance-none bg-blue-100"
              />
            </div>
            <div>
              <span className="text-xs text-slate-800">1 credit = 2 SMS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingCalculator
