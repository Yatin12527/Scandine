import { User, BarChart3, Settings, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfileModal = ({ userData, onClose }) => {
  const router = useRouter();

  const menuItems = [
    { name: "Account", icon: User, route: "/account" },
    { name: "Dashboard", icon: BarChart3, route: "/dashboard" },
    { name: "Settings", icon: Settings, route: "/settings" },
    { name: "Logout", icon: LogOut, route: null },
  ];

  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/users/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Clear any local storage if needed
        localStorage.clear();
        // Force a hard reload to clear any cached state
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails on server, clear local state
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.name === "Logout") {
      logout();
    } else if (item.route) {
      router.push(item.route);
    }
    onClose();
  };

  return (
    <div className="absolute right-0 top-11 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-64 py-2">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="font-medium text-gray-900">{userData.name}</div>
          <div className="text-sm text-gray-500">{userData.username}</div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                onClick={() => handleMenuItemClick(item)}
              >
                <IconComponent className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
