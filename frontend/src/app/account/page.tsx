"use client";
import { useEffect, useState } from "react";
import { IoBarChart, IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Profile from "@/components/profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const AccountItems = [
  { key: "Profile", icon: CgProfile },
  { key: "Analytics", icon: IoBarChart },
  { key: "Settings", icon: IoSettings },
];

const Account = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (auth.loading) {
      return;
    }
    if (auth.error) {
      router.push("/auth/login");
    }
  }, [auth.loading, auth.error, router]);

  const [activeTab, setActiveTab] = useState("Profile");

  if (auth.error) {
    return null;
  }
  return (
    <div className="min-h-screen bg-[#fffcf4] flex">
      {/* Sidebar */}
      <div className="hidden sm:flex w-72 bg-white shadow-lg border-r border-orange-100">
        <div className="p-6 mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Account</h2>

          <nav className="space-y-2">
            {AccountItems.map(({ icon: Icon, key }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === key
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[1.02]"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <Icon className="text-xl" />
                <span className="font-medium">{key}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* for mobile */}
      <div className=" sm:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white rounded-t-3xl shadow-lg border-t border-gray-200">
          <div className="flex items-center justify-center gap-x-2 p-2">
            {AccountItems.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px] ${
                  activeTab === key ? "transform scale-110" : "hover:bg-gray-50"
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
                  {key}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <div className="p-8 ">
            {activeTab === "Profile" && <Profile />}

            {activeTab === "Analytics" && <div>work under progress</div>}

            {activeTab === "Settings" && <div>work under progress</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
