import React from "react"
import ModalBlank from "../../../components/ModalBlank"

export interface DeleteDialogProps {
  id: string
  open: boolean
  setOpenModal: (val: boolean) => void
  onConfirm: any
  processing: boolean
}
function DeleteDialogs(props: DeleteDialogProps) {
  const { id, open, setOpenModal, onConfirm, processing } = props
  return (
    <>
      {/* Start */}
      <ModalBlank
        id={id}
        modalOpen={open}
        setModalOpen={(val: boolean) => {
          setOpenModal(val)
        }}
      >
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-rose-500"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">
                Are you sure you want to delete ?
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  setOpenModal(false)
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
                  onClick={onConfirm}
                  className="btn-sm bg-rose-500 hover:bg-rose-600 text-white"
                >
                  Yes, Delete it
                </button>
              )}
            </div>
          </div>
        </div>
      </ModalBlank>
      {/* End */}
    </>
  )
}

export default DeleteDialogs
