import { axios_instance } from "../../config"
import { useMutation } from "react-query"

const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<string> => {
  const { data } = await axios_instance.post(`/user/signin`, {
    email,
    password,
  })
  return data
}

const loginWithGoogle = async ({
  token,
}: {
  token: string
}): Promise<string> => {
  const { data } = await axios_instance.post(`/user/signin/google`, {
    token,
  })
  return data
}

export function useLoginWithGoogle() {
  const { isLoading, mutateAsync } = useMutation(loginWithGoogle)

  return { isLoggingInWithGoogle: isLoading, loginWithGoogle: mutateAsync }
}

export function useLogin() {
  const { isLoading, mutateAsync } = useMutation(login)

  return { isLoggingIn: isLoading, login: mutateAsync }
}
