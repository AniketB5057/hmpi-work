import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";
import { useLocalStorage } from "./hooks/useLocalStorage";
function SuperAdmin() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");

  const verify = async () => {
    if (searchParams.get("token") && searchParams.get("email")) {
      const getResults = await axios.get(
        `${
          process.env.VITE_SERVER_URL
        }/user/signin/super-admin?token=${searchParams.get(
          "token"
        )}&email=${searchParams.get("email")}`
      );
      setAuthKey(getResults.data);
      window.location.href = "/";
    }
  };
  useEffect(() => {
    verify();
  }, []);
  return <LoadingSpinner />;
}

export default SuperAdmin;
