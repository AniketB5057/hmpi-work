import React, { useState } from "react"

import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import SettingsSidebar from "../../partials/settings/SettingsSidebar"
import BusinessAccountPanel from "../../partials/settings/BusinessAccountPanel"

function BusinessAccount() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
          Account Settings
        </h1>
      </div>

      {/* Content */}
      <div className="bg-white shadow-lg rounded-sm mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SettingsSidebar />
          <BusinessAccountPanel />
        </div>
      </div>
    </div>
  )
}

export default BusinessAccount
