import axios from "axios";
import { setItem } from "./utils/localStorage";
export const cancelTokenSource = axios.CancelToken.source();
export const axios_instance = axios.create({
  baseURL: `${process.env.VITE_SERVER_URL}`,
});

const UNAUTHORIZED = 401;
axios_instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    console.log(status);
    console.log("axios error");
    if (status === UNAUTHORIZED) {
      if (window.location.pathname !== "/signin") {
        setItem("authkey", "");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);
