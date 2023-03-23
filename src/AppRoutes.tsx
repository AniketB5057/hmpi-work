// @ts-nocheck
import { lazy } from "react";
import { Navigate } from "react-router";
import { Route, Routes } from "react-router-dom";
// Import pages
import { allowedPaths } from "./AllRestrictedPaths";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentSuccess from "./pages/PaymentSuccess";
import PublicEstimatePage from "./pages/public/Estimate";
import PublicInvoicePage from "./pages/public/Invoice";
import ResetAndCreateNewPassword from "./pages/ResetAndCreateNewPassword";
import ResetPassword from "./pages/ResetPassword";
import Reviews from "./pages/Reviews";
import Apps from "./pages/settings/Apps";
import Billing from "./pages/settings/Billing";
import BusinessAccount from "./pages/settings/BusinessAccount";
import Notifications from "./pages/settings/Notifications";
import Plans from "./pages/settings/Plans";
import UserAccount from "./pages/settings/UserAccount";
import SuperAdmin from "./SuperAdmin";
import Settings from "./pages/Settings";
// import CompanySettings from "./pages/CompanySettings";

const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const Signup = lazy(() => import("./pages/Signup"));
const SignUpThanks = lazy(() => import("./pages/SignUpThanks"));
const Signin = lazy(() => import("./pages/Signin"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const OnBoardingFinal = lazy(() => import("./pages/OnBoardingFinal"));
const Items = lazy(() => import("./pages/Items"));
const AddOrUpdateBooking = lazy(() => import("./pages/AddOrUpdateBooking"));
const Locations = lazy(() => import("./pages/Locations"));
const Customers = lazy(() => import("./pages/Customers"));
const Estimates = lazy(() => import("./pages/Estimates"));
const Invoices = lazy(() => import("./pages/Invoices"));

const CreateEditInvoice = lazy(() => import("./pages/CreateEditInvoice"));
const CreateEditEstimate = lazy(() => import("./pages/CreateEditEstimate"));
const Employees = lazy(() => import("./pages/Employees"));
const Jobs = lazy(() => import("./pages/Jobs"));

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <PrivateRoute>
              <Navigate to={`/dashboard`} />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={allowedPaths.dashboard.allowed}>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings/*"
          element={
            <PrivateRoute roles={allowedPaths.settings.allowed}>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/settings/company-settings"
          element={
            <PrivateRoute roles={allowedPaths.settings.allowed}>
              <DashboardLayout>
              <Settings >
                <CompanySettings />
               </Settings>
              </DashboardLayout>
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/business/items"
          element={
            <PrivateRoute roles={allowedPaths.manageBusinessItems.allowed}>
              <DashboardLayout>
                <Items />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/business/locations"
          element={
            <PrivateRoute roles={allowedPaths.manageBusinessLocations.allowed}>
              <DashboardLayout>
                <Locations />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/estimates"
          element={
            <PrivateRoute roles={allowedPaths.estimates.allowed}>
              <DashboardLayout>
                <Estimates />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/estimate/add"
          element={
            <PrivateRoute roles={allowedPaths.addEstimate.allowed}>
              <DashboardLayout>
                <CreateEditEstimate />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/estimate/edit/:id"
          element={
            <PrivateRoute roles={allowedPaths.editEstimate.allowed}>
              <DashboardLayout>
                <CreateEditEstimate />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <PrivateRoute roles={allowedPaths.invoices.allowed}>
              <DashboardLayout>
                <Invoices />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/invoice/add"
          element={
            <PrivateRoute roles={allowedPaths.addInvoice.allowed}>
              <DashboardLayout>
                <CreateEditInvoice />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/invoice/edit/:id"
          element={
            <PrivateRoute roles={allowedPaths.editInvoice.allowed}>
              <DashboardLayout>
                <CreateEditInvoice />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute roles={allowedPaths.reviews.allowed}>
              <DashboardLayout>
                <Reviews />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute roles={allowedPaths.customers.allowed}>
              <DashboardLayout>
                <Customers />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/business/employees"
          element={
            <PrivateRoute roles={allowedPaths.manageBusinessEmployees.allowed}>
              <DashboardLayout>
                <Employees />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute roles={allowedPaths.jobs.allowed}>
              <DashboardLayout>
                <Jobs />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/job/add"
          element={
            <PrivateRoute roles={allowedPaths.addJob.allowed}>
              <DashboardLayout>
                <AddOrUpdateBooking />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/job/edit/:id"
          element={
            <PrivateRoute roles={allowedPaths.editJob.allowed}>
              <DashboardLayout>
                <AddOrUpdateBooking />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <PrivateRoute roles={allowedPaths.calendar.allowed}>
              <DashboardLayout>
                <Calendar />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings/account/business"
          element={
            <PrivateRoute
              roles={allowedPaths.manageBusinessAccountSettings.allowed}
            >
              <DashboardLayout>
                <BusinessAccount />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings/account/user"
          element={
            <PrivateRoute roles={allowedPaths.m}>
              <DashboardLayout>
                <UserAccount />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings/preferrences"
          element={
            <PrivateRoute
              roles={allowedPaths.managePreferrencesSettings.allowed}
            >
              <DashboardLayout>
                <Notifications />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings/apps"
          element={
            <PrivateRoute roles={allowedPaths.manageAppSettings.allowed}>
              <DashboardLayout>
                <Apps />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings/plans"
          element={
            <PrivateRoute
              roles={allowedPaths.manageBillingPlanSettings.allowed}
            >
              <DashboardLayout>
                <Plans />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings/billing"
          element={
            <PrivateRoute roles={allowedPaths.manageBillingSettings.allowed}>
              <DashboardLayout>
                <Billing />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/settings/feedback"
          element={
            <PrivateRoute
              roles={[UserRoleTypes.ADMIN, UserRoleTypes.ADMIN_STAFF]}
            >
              <DashboardLayout>
                <Feedback />
              </DashboardLayout>
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/onboarding"
          element={
            <PrivateRoute roles={allowedPaths.onboarding.allowed}>
              <Onboarding />
            </PrivateRoute>
          }
        />

        <Route
          path="/onboarding/complete"
          element={
            <PrivateRoute roles={allowedPaths.onboardingCompleted}>
              <OnBoardingFinal />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup/thanks"
          element={
            <PrivateRoute roles={allowedPaths.signUpThanks}>
              <SignUpThanks />
            </PrivateRoute>
          }
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/preview/invoice/:id" element={<PublicInvoicePage />} />
        <Route path="/preview/estimate/:id" element={<PublicEstimatePage />} />

        <Route path="/view/invoice/:id" element={<PublicInvoicePage />} />
        <Route path="/view/estimate/:id" element={<PublicEstimatePage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route path="/email-verify" element={<VerifyEmailPage />} />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-with-link"
          element={<ResetAndCreateNewPassword />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
