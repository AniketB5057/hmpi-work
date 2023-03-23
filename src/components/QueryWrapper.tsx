import React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useQueryErrorResetBoundary } from "react-query"
import ErrorOccurred from "../pages/ErrorOccurred"
import LoadingSpinner from "./LoadingSpinner"

type QueryWrapperProps = {
  children: React.ReactNode
}

const QueryWrapper = ({ children }: QueryWrapperProps) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <>
          <ErrorOccurred />
        </>
      )}
    >
      <React.Suspense
        fallback={
          <>
            <LoadingSpinner />
          </>
        }
      >
        {children}
      </React.Suspense>
    </ErrorBoundary>
  )
}

export default QueryWrapper
