import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MenuSkeleton from "./ui/menuLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface menusInterface {
  _id: string;
  title: string;
  logo?: string;
  createdAt: Date;
  style: string;
}

const Menus = () => {
  dayjs.extend(relativeTime);
  const router = useRouter();
  const [userMenus, setUserMenus] = useState<menusInterface[]>([]);
  const [isMenusLoading, setIsMenusLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  // By adding [auth.loading, auth.error], this effect re-runs when auth finishes, letting us check the auth result (error or success) *after* it's done loading.
  useEffect(() => {
    if (auth.loading) {
      setIsMenusLoading(true);
      return;
    }
    if (auth.error) {
      setIsMenusLoading(false);
      router.push("/auth/login");
    } else {
      const getMenus = async () => {
        setIsMenusLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}/items/menus`,
            {
              withCredentials: true,
            }
          );
          setUserMenus(response.data);
          console.log(auth);
        } catch (error) {
          console.log(error);
        } finally {
          setIsMenusLoading(false);
        }
      };
      getMenus();
    }
  }, [auth.loading, auth.error, router]);

  if (isMenusLoading) {
    return <MenuSkeleton />;
  }

  if (auth.error) {
    return null;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">
          Your Menu Collection
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Manage and view all your created menus in one place
        </p>
      </div>

      {/* Menus Grid */}
      {userMenus.length < 1 ? (
        <div className="flex">
          <p className="text-md text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nothing to show here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {userMenus.map((menu) => (
            <div
              key={menu._id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-slate-300/50 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-100 to-slate-200 h-64">
                <img
                  src={`/${menu.style}.png`}
                  alt={menu.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-5">
                  <div className="flex items-center gap-x-4 mb-2">
                    <img
                      src={menu.logo || "/fallbacklogo.jpg"}
                      className="w-8 rounded-sm"
                    />
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                      {menu.title}
                    </h3>
                  </div>
                  <p className="text-xs  text-slate-600 mb-2 group-hover:text-slate-700 transition-colors">
                    Posted {dayjs(menu.createdAt).fromNow()}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="bg-slate-100 px-2 py-1 rounded-lg">
                      {menu.style.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 items-center">
                  <button
                    className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:scale-[1.02] text-sm cursor-pointer"
                    onClick={() =>
                      router.push(`/menu/${menu.style}/${menu._id}`)
                    }
                  >
                    View Menu
                  </button>
                  <button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer"
                    onClick={() =>
                      router.push(`/menu/${menu.style}/${menu._id}/edit`)
                    }
                  >
                    Edit Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create New Menu CTA */}
      <div className="text-center mt-20 mb-20 sm:mb-0">
        <button
          className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
          onClick={() => router.push("/menu")}
        >
          Browse Templates
        </button>
      </div>
    </div>
  );
};

export default Menus;
