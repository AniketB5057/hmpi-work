import { UserRoleTypes } from "./types/allTypes";

export const availableMenu = (role: UserRoleTypes): string[] => {
  let allowedMenu: string[] = [];
  Object.keys(allowedPaths).forEach((elem) => {
    if ((allowedPaths as any)[`${elem}`].allowed.includes(role)) {
      allowedMenu.push((allowedPaths as any)[`${elem}`].path);
    }
  });

  return allowedMenu;
};
export const getAllRestrictedRoutesLinks = () => {
  return Object.keys(allowedPaths).map((elem) => {
    return {
      path: (allowedPaths as any)[`${elem}`].path,
      name: elem,
      allowed: (allowedPaths as any)[`${elem}`].allowed,
      dashboardLayoutEnabled: (allowedPaths as any)[`${elem}`]
        .dashboardLayoutEnabled,
    };
  });
};
export const allowedPaths = {
  onboarding: {
    path: "/onboarding",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: false,
  },
  onboardingCompleted: {
    path: "/onboarding/complete",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: false,
  },
  signUpThanks: {
    path: "/signup/thanks",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: false,
  },
  dashboard: {
    path: "/dashboard",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  reviews: {
    path: "/reviews",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  customers: {
    path: "/customers",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  jobs: {
    path: "/jobs",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  addJob: {
    path: "/job/add",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  editJob: {
    path: "/job/edit",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  invoices: {
    path: "/invoices",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  addInvoice: {
    path: "/invoice/add",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  editInvoice: {
    path: "/invoice/edit",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  estimates: {
    path: "/estimates",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  addEstimate: {
    path: "/estimate/add",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  editEstimate: {
    path: "/estimate/edit",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  calendar: {
    path: "/calendar",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageBusiness: {
    path: "/business",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageBusinessEmployees: {
    path: "/business/employees",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageBusinessLocations: {
    path: "/business/locations",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageBusinessItems: {
    path: "/business/items",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageSettings: {
    path: "/settings",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageUserAccountSettings: {
    path: "/settings/account/user",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageBusinessAccountSettings: {
    path: "/settings/account/business",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  managePreferrencesSettings: {
    path: "/settings/preferrences",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageAppSettings: {
    path: "/settings/apps",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageBillingSettings: {
    path: "/settings/billing",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  manageBillingPlanSettings: {
    path: "/settings/plans",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  settings: {
    path: "/settings",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  reports: {
    path: "/reports",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
  clients: {
    path: "/clients",
    allowed: [
      UserRoleTypes.ADMIN,
      UserRoleTypes.ADMIN_STAFF,
      UserRoleTypes.OFFICE_STAFF,
      UserRoleTypes.ACCOUNTING_STAFF,
      UserRoleTypes.FIELD_WORKER_STAFF,
      UserRoleTypes.SALES_STAFF,
      UserRoleTypes.MARKETTING_STAFF,
    ],
    dashboardLayoutEnabled: true,
  },
};
