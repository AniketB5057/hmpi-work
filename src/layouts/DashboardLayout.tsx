import React, { createContext, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

export interface iBreadcrumbsType {
  label: string;
  link: string;
}
interface LayoutContextInterface {
  setBreadcrumbs: (breadcrumbs: iBreadcrumbsType[]) => void;
  getBreadcrumbs: () => iBreadcrumbsType[];
}

export const LayoutContext = createContext({} as LayoutContextInterface);

type LayoutProviderProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: LayoutProviderProps) {
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarOpen, setSidebarOpen] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [breadcrumbsArrMain, setBreadcrumbsArrMain] = useState<
    iBreadcrumbsType[]
  >([]);

  const setBreadcrumbs = (breadcrumbsArr: iBreadcrumbsType[]) => {
    setBreadcrumbsArrMain([...breadcrumbsArr]);
  };

  const getBreadcrumbs = () => {
    return breadcrumbsArrMain;
  };
  return (
    <LayoutContext.Provider value={{ setBreadcrumbs, getBreadcrumbs }}>
      <div className="bg-[#F5F6FA] flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={(val: boolean) => {
              setSidebarOpen(val);
            }}
            breadcrumbs={breadcrumbsArrMain}
          />

          <main className="h-full">{children}</main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export default DashboardLayout;
