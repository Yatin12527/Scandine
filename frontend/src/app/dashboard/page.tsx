"use client";
import Menus from "@/components/yourMenus";
import React, { useState } from "react";
import { IoRestaurant, IoBarChart, IoSettings } from "react-icons/io5";

const navItems = [
  { key: "menus", label: "Your Menus", icon: IoRestaurant },
  { key: "analytics", label: "Analytics", icon: IoBarChart },
  { key: "settings", label: "Settings", icon: IoSettings },
];
function Dashboard() {
  const [activeTab, setActiveTab] = useState("menus");

  return (
    <div className="min-h-screen bg-[#fffcf4] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* desktop Navigation */}
        <div className="hidden mb-12 items-center sm:flex justify-center mt-10">
          <div className="bg-white rounded-2xl shadow-lg p-2 border border-slate-200/50 flex w-fit">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer
      ${
        activeTab === key
          ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
      }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>
        {/* mobile navigation*/}
        <div className=" sm:hidden fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-white rounded-t-3xl shadow-lg border-t border-gray-200">
            <div className="flex items-center justify-center gap-x-2 p-2">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px] ${
                    activeTab === key
                      ? "transform scale-110"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full transition-all duration-300 ${
                      activeTab === key
                        ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg"
                        : "text-gray-500"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      activeTab === key ? "text-orange-500" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "menus" && <Menus />}

        {activeTab === "analytics" && <div>work under progress</div>}

        {activeTab === "templates" && <div>work under progress</div>}

        {activeTab === "settings" && <div>work under progress</div>}
      </div>
    </div>
  );
}

export default Dashboard;
