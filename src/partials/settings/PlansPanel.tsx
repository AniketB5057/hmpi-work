import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import { axios_instance } from "../../config"
import { useAuth } from "../../contexts/AuthProvider"
import { LiveChatContext } from "../../contexts/LiveChatProvider"
import { useSnackbar } from "../../contexts/SnackbarProvider"
import { buyCredits } from "../../hooks/useStripeBilling"
import { allowOnlyNumberWithZero } from "../../utils/commonFunctions"
import { getItem } from "../../utils/localStorage"
import PricingCalculator from "../PricingCalculator"

function PlansPanel() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const { userInfo, handleRefetch } = useAuth()
  const [totalCost, setTotalCost] = useState<string>(`0`)
  const { openLiveChat } = useContext(LiveChatContext)
  const [totalCredits, setTotalCredits] = useState<number>(0)
  const [isLoading, setLoading] = useState(false)

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Current Plans */}

        <section>
          <div className="text-xs inline-flex font-medium bg-sky-100 text-sky-600 rounded-full text-center px-2.5 py-1">
            Current Credits: {userInfo?.availableCredits}
          </div>
        </section>
        {/* Contact Sales */}
        <section>
          <div className="px-5 py-3 bg-indigo-50 border border-indigo-100 rounded-sm text-center xl:text-left xl:flex xl:flex-wrap xl:justify-between xl:items-center">
            <div className="text-slate-800 font-semibold mb-2 xl:mb-0">
              Looking for customized pricing?
            </div>
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={() => {
                openLiveChat()
              }}
            >
              Contact Support
            </button>
          </div>
        </section>
        <section>
          {/* Pricing */}
          <h2 className="text-2xl text-slate-800 font-bold mb-4">
            Calculate & Buy
          </h2>
          {isLoading ? (
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
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
              disabled={!(parseFloat(totalCost) > 0)}
              onClick={async () => {
                try {
                  setLoading(true)
                  const getUrl = await buyCredits(
                    getItem("authkey"),
                    `${(parseFloat(totalCost) * 100).toFixed(2)}`,
                    totalCredits
                  )

                  snackbar.success("Taking you to payment.")
                  window.location.href = `${getUrl}`
                  setLoading(false)
                } catch (err) {
                  setLoading(false)
                  snackbar.error("Oops! Try again later.")
                }
              }}
            >
              Buy {totalCredits} credits for $ {(0.1 * totalCredits).toFixed(2)}
            </button>
          )}

          <PricingCalculator
            totalCost={totalCost}
            totalCredits={totalCredits}
            setTotalCost={setTotalCost}
            setTotalCredits={setTotalCredits}
          />
        </section>
      </div>
    </div>
  )
}

export default PlansPanel
