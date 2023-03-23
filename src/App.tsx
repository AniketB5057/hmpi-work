import React, { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./AppRoutes";
import QueryWrapper from "./components/QueryWrapper";
import "./css/style.scss";
import AuthProvider from "./contexts/AuthProvider";
import SnackbarProvider from "./contexts/SnackbarProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorOccurred from "./pages/ErrorOccurred";
import { ReactQueryDevtools } from "react-query/devtools";
import BannerProvider from "./contexts/BannerProvider";
import LiveChatProvider from "./contexts/LiveChatProvider";
import ProductTourProvider from "./contexts/ProductTourProvider";
import LogRocket from "logrocket";
import ReactGA from "react-ga4";
const TRACKING_ID = "G-QSP0HPK7MZ"; // OUR_TRACKING_ID

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize(TRACKING_ID);
  LogRocket.init("otfxnp/servicebuddy-dashboard");
  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
  });
}
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export const trackSignUpForGoogleAnalyticsAndAds = () => {
  ReactGA.gtag("event", "conversion", {
    send_to: "AW-11003800937/lO2bCNyMwoAYEOnagv8o",
  });
};
export const useAnalyticsEventTracker = (category = "Test category") => {
  const eventTracker = (action = "test action", label = "test label") => {
    console.log("event logged");
    ReactGA.event(action, { category, action, label });
  };
  return eventTracker;
};

export function randomStringGen(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function App() {
  return (
    <React.Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <Sentry.ErrorBoundary
        fallback={
          <>
            <ErrorOccurred />
          </>
        }
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} position={"top-right"} />
          <QueryWrapper>
            <SnackbarProvider>
              <AuthProvider>
                <ProductTourProvider>
                  <LiveChatProvider>
                    <BannerProvider>
                      <AppRoutes />
                    </BannerProvider>
                  </LiveChatProvider>
                </ProductTourProvider>
              </AuthProvider>
            </SnackbarProvider>
          </QueryWrapper>
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
