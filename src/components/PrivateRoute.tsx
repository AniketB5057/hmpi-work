import { useEffect, useState } from "react"
import { Navigate, Route, RouteProps } from "react-router"
import { useAuth } from "../contexts/AuthProvider"
import { useNavigate, useLocation } from "react-router"
import LoadingSpinner from "./LoadingSpinner"
import { UserRoleTypes } from "../types/allTypes"

type PrivateRouteProps = {
  roles: UserRoleTypes[]
} & RouteProps

const PrivateRoute = ({
  children,
  roles,
  ...routeProps
}: PrivateRouteProps) => {
  const { hasRole, userInfo, isFetchingUserInfo } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (!isFetchingUserInfo) {
        if (userInfo) {
          if (!userInfo.email_verified) {
            setIsLoading(isFetchingUserInfo)
            navigate("/signup/thanks")
            return
          }
          if (!userInfo.onboardingCompleted) {
            if (location.pathname.startsWith("/onboarding")) {
              setIsLoading(isFetchingUserInfo)
            } else {
              setIsLoading(isFetchingUserInfo)
              navigate("/onboarding")
              return
            }
          } else {
            setIsLoading(isFetchingUserInfo)
            return
          }
        } else {
          setIsLoading(isFetchingUserInfo)
          navigate("/signin")
          return
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [isFetchingUserInfo])

  useEffect(() => {
    if (userInfo && userInfo.roles) {
      if (!hasRole(userInfo.roles)) {
        console.log("invalid access level")
        navigate("/403")
        return
      }
    }
  }, [location, userInfo])
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  } else {
    return children
  }
}

export default PrivateRoute
