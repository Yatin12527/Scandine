import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuSkeleton from "./ui/menuLoader";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  AiOutlineEye,
  AiOutlineRise,
  AiOutlineFileText,
  AiOutlineBarChart,
} from "react-icons/ai";

interface Menu {
  _id: string;
  title: string;
  logo?: string;
  createdAt: Date;
  style: string;
  views: number;
}

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState<Menu[]>([]);
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.loading) return;

    if (auth.error) {
      router.push("/auth/login");
      return;
    }

    const fetchMenus = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/items/menus`,
          { withCredentials: true }
        );
        setMenus(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [auth.loading, auth.error, router]);

  if (loading) return <MenuSkeleton />;
  if (auth.error) return null;

  const totalViews = menus.reduce((sum, menu) => sum + menu.views, 0);
  const totalMenus = menus.length;
  const avgViews = totalMenus > 0 ? (totalViews / totalMenus).toFixed(1) : "0";
  const topMenu = menus.reduce((max, menu) => {
    if (menu.views > max.views) {
      return menu;
    } else {
      return max;
    }
  }, menus[0] || { views: 0, title: "N/A" });

  const chartData = [...menus]
    .sort((a, b) => b.views - a.views)
    .map((menu) => ({
      name:
        menu.title.length > 15
          ? menu.title.substring(0, 15) + "..."
          : menu.title,
      views: menu.views,
    }));

  const colors = [
    "#FF0000",
    "#f7931e",
    "#fdc500",
    "#4ecdc4",
    "#45b7d1",
    "#000000",
  ];

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl text-center font-bold text-gray-900 mb-4">
            Analytics
          </h1>
          <p className="text-xl text-center text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Track your menu matrices
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 text-sm font-medium">Total Views</h3>
              <AiOutlineEye className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalViews}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 text-sm font-medium">Total Menus</h3>
              <AiOutlineFileText className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalMenus}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 text-sm font-medium">Avg Views</h3>
              <AiOutlineRise className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{avgViews}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 text-sm font-medium">Most Viewed</h3>
              <AiOutlineBarChart className="w-5 h-5 text-pink-600" />
            </div>
            <p className="text-xl font-bold text-gray-900 truncate">
              {topMenu.title}
            </p>
            <p className="text-sm text-gray-500 mt-1">{topMenu.views} views</p>
          </div>
        </div>
        {/* Chart */}
        <div className="bg-white hidden md:block rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Views by Menu
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="views" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-24 sm:mb-0">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Menu Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Menu Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Style
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {[...menus]
                  .sort((a, b) => b.views - a.views)
                  .map((menu) => (
                    <tr key={menu._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {menu.logo ? (
                            <img
                              src={menu.logo}
                              alt={menu.title}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                          ) : (
                            <img
                              src="/fallbacklogo.jpg"
                              alt={menu.title}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">
                            {menu.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {menu.style.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(menu.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <AiOutlineEye className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {menu.views}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
