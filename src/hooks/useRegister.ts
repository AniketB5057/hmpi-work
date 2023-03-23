import { axios_instance } from "../config"
import { useMutation } from "react-query"
import {
  UserInfoForRegister,
  UserInfoForRegisterWithGoogle,
} from "../types/userInfo"

const register = async (
  userInfo: UserInfoForRegister
): Promise<UserInfoForRegister> => {
  const { data } = await axios_instance.post(`/user/signup`, userInfo)
  return data
}

const registerWithGoogle = async (
  formData: UserInfoForRegisterWithGoogle
): Promise<UserInfoForRegisterWithGoogle> => {
  const { data } = await axios_instance.post(`/user/signup/google`, formData)
  return data
}

export function useRegisterWithGoogle() {
  const { isLoading, mutateAsync } = useMutation(registerWithGoogle)
  return {
    isRegisteringWithGoogle: isLoading,
    registerWithGoogle: mutateAsync,
  }
}

export function useRegister() {
  const { isLoading, mutateAsync } = useMutation(register)
  return { isRegistering: isLoading, register: mutateAsync }
}
