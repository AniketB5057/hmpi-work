import React, { createContext, useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import { useAuth } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

interface BannerContextInterface {
  showBanner: boolean;
  setShowBanner: (val: boolean) => void;
}

export const BannerContext = createContext({} as BannerContextInterface);

type BannerProviderProps = {
  children?: React.ReactNode;
};

const BannerProvider = ({ children }: BannerProviderProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const location = useLocation();

  const { userInfo } = useAuth();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (userInfo && userInfo.availableCredits <= 100) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    }
    return () => {
      mounted = false;
    };
  }, [userInfo]);
  return (
    <BannerContext.Provider
      value={{
        showBanner,
        setShowBanner,
      }}
    >
      {(location.pathname.startsWith("/dashboard") ||
        location.pathname.startsWith("/jobs") ||
        location.pathname.startsWith("/invoices") ||
        location.pathname.startsWith("/estimates") ||
        location.pathname.startsWith("/customers") ||
        location.pathname.startsWith("/reviews") ||
        location.pathname.startsWith("/business") ||
        location.pathname.startsWith("/settings") ||
        location.pathname.startsWith("/calendar")) && (
        <div className="text-center">
          <Banner
            type={"error"}
            open={showBanner}
            setOpen={(val: boolean) => {
              setShowBanner(val);
            }}
            align="center"
          >
            <span>You are running out of credits.</span>
            <span
              className="text-indigo-500 hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/settings/plans";
              }}
            >
              {" "}
              Click here to
            </span>
            <span> add more.</span>
          </Banner>
        </div>
      )}
      {children}
    </BannerContext.Provider>
  );
};

export function useBanner() {
  return useContext(BannerContext);
}

export default BannerProvider;
