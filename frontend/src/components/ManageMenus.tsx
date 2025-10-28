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
  views: number;
}

const ManageMenus = () => {
  dayjs.extend(relativeTime);
  const router = useRouter();
  const [userMenus, setUserMenus] = useState<menusInterface[]>([]);
  const [isMenusLoading, setIsMenusLoading] = useState<boolean>(true);
  const [deleteMenuId, setDeleteMenuId] = useState<string | null>(null);
  const auth = useSelector((state: RootState) => state.auth);

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
          console.log(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsMenusLoading(false);
        }
      };
      getMenus();
    }
  }, [auth.loading, auth.error, router]);

  useEffect(() => {
    if (deleteMenuId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [deleteMenuId]);
  
  const handleDelete = async (menuId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/items/menus/${menuId}`,
        { withCredentials: true }
      );
      setUserMenus(userMenus.filter((menu) => menu._id !== menuId));
      setDeleteMenuId(null);
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };

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
        <h1 className="text-5xl font-bold mb-6">Modify your menu collection</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Manage your created menus in one place
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
                  <p className="text-xs  text-slate-600 mb-2 group-hover:text-slate-700 transition-colors">
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
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer"
                    onClick={() => setDeleteMenuId(menu._id)}
                  >
                    Delete Menu
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

      {/* Delete Modal*/}
      {deleteMenuId && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 "
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setDeleteMenuId(null);
            }
          }}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">Delete Menu?</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this menu? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteMenuId(null)}
                className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteMenuId)}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
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

export default ManageMenus;
