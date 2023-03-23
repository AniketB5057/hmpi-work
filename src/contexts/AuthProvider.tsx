import React, { createContext, useContext, useEffect } from "react"
import LoadingSpinner from "../components/LoadingSpinner"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useLogin, useLoginWithGoogle } from "../hooks/auth/useLogin"
import { useLogout } from "../hooks/auth/useLogout"
import { useUserInfo } from "../hooks/useUserInfo"
import { UserInfo } from "../types/userInfo"
import { UserRoleTypes } from "../types/allTypes"
import { RefetchOptions } from "react-query"
import LogRocket from "logrocket"
import { GoogleOAuthProvider } from "@react-oauth/google"

interface AuthContextInterface {
  hasRole: (roles: UserRoleTypes[]) => {}
  isLoggingIn: boolean
  isLoggingOut: boolean
  login: (email: string, password: string) => Promise<any>
  loginWithGoogle: (token: string) => Promise<any>
  logout: () => Promise<any>
  userInfo?: UserInfo
  isFetchingUserInfo: boolean
  handleRefetch: () => void
}

export const AuthContext = createContext({} as AuthContextInterface)

type AuthProviderProps = {
  children?: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "")

  const { isLoggingIn, login } = useLogin()
  const { isLoggingInWithGoogle, loginWithGoogle } = useLoginWithGoogle()
  const { isLoggingOut, logout } = useLogout()
  const { data: userInfo, error, isFetching, refetch } = useUserInfo(authKey)
  if (error) {
    if (window.location.pathname !== "/signin") {
      window.location.href = "/signin"
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (userInfo) {
        LogRocket.identify(`${userInfo.email}`, {
          email: `${userInfo.email}`,
          first_name: `${userInfo.firstName}`,
          last_name: `${userInfo.lastName}`,
          domain: `${userInfo.domain}`,
          access_level: userInfo.roles.toString(),
        })
      }
    }
    return () => {
      mounted = false
    }
  }, [userInfo])

  const hasRole = (roles: UserRoleTypes[]) => {
    if (!roles || roles.length === 0) {
      return true
    }
    if (!userInfo) {
      return false
    }
    return roles.some((item) => userInfo.roles.includes(item))
  }

  const handleRefetch = async () => {
    refetch()
  }
  const handleLogin = async (email: string, password: string) => {
    return login({ email, password })
      .then((data: any) => {
        let key = data.accessToken
        setAuthKey(key)
        return key
      })
      .catch((err: any) => {
        throw err
      })
  }

  const handleLoginWithGoogle = async (token: string) => {
    return loginWithGoogle({ token })
      .then((data: any) => {
        let key = data.accessToken
        setAuthKey(key)
        return key
      })
      .catch((err: any) => {
        throw err
      })
  }
  const handleLogout = async () => {
    return logout()
      .then((data: any) => {
        setAuthKey("")
        return data
      })
      .catch((err: any) => {
        throw err
      })
  }

  return (
    <AuthContext.Provider
      value={{
        hasRole,
        isLoggingIn: isLoggingIn || isLoggingInWithGoogle,
        isLoggingOut,
        login: handleLogin,
        loginWithGoogle: handleLoginWithGoogle,
        logout: handleLogout,
        userInfo,
        handleRefetch,
        isFetchingUserInfo: isFetching,
      }}
    >
      <GoogleOAuthProvider
        clientId={`${process.env.VITE__APP_GOOGLE_AUTH_CLIENT_ID}`}
      >
        {children}
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthProvider
