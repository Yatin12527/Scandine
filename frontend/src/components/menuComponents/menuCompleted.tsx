"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { asyncGetApi } from "@/redux/authSlice";
import QRCodeModal from "@/components/qrModal";
import { MdOutlineQrCode2 } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MenuData } from "@/types/sectionType";
import { IoIosArrowBack } from "react-icons/io";

interface MenuCompletedProps {
  DesignComponent;
  template?: string;
}

const MenuCompleted: React.FC<MenuCompletedProps> = ({
  DesignComponent,
  template,
}) => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const menuId = params.id;

  const [data, setData] = useState<MenuData | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  const fullUrl = `${process.env.NEXT_PUBLIC_CLIENT}${pathname}`;
  const bg = pathname.split("/")[2];
  const isDark = template === "classicBlack";

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuResult = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/items/menuItems/${menuId}`
        );
        setData(menuResult.data);
        const userResult = await dispatch(asyncGetApi()).unwrap();

        if (userResult && menuResult.data.owner) {
          setIsOwner(userResult.id === menuResult.data.owner);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchMenuData();
  }, [dispatch, menuId]);

  const handleGenerateQR = () => {
    setShowQRModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseQR = () => {
    setShowQRModal(false);
    document.body.style.overflow = "unset";
  };

  const sectionsArray = data?.sections ? Object.values(data.sections) : [];

  return (
    <div
      className={`min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-inter p-5 sm:p-8 ${
        isDark ? "" : "flex flex-col items-center"
      }`}
      style={{ backgroundImage: `url('/${bg}BG.png')` }}
    >
      <div className="min-h-screen">
        {isOwner && (
          <div
            className={`w-full mb-6 flex justify-center gap-4 ${
              isDark ? "max-w-7xl mx-auto mt-15" : "max-w-7xl"
            }`}
          >
            <button
              className="absolute left-0 sm:left-8 md:left-16 lg:left-60 top-18 flex cursor-pointer bg-transparent rounded-full p-0 sm:px-4 sm:py-2 items-center hover:bg-white/10 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-100 group"
            onClick={() => router.push("/dashboard")}
            >
              <div className="w-8 h-8 hidden  rounded-full bg-gray-100 sm:flex items-center justify-center  transition-colors sm:mr-2">
                <IoIosArrowBack size={18} className="text-gray-700 " />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }  hidden sm:flex`}
              >
                Back
              </span>
            </button>
            <button
              onClick={handleGenerateQR}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <MdOutlineQrCode2 size={20} />
              Generate QR
            </button>
            <button
              onClick={() => router.push(`/menu/${bg}/${menuId}/edit`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <RiArrowGoBackFill size={20} />
              Back to Editing
            </button>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4 p-2">
            {data?.logo && (
              <img
                src={data.logo}
                alt="Logo Preview"
                className={`h-20 w-20 object-contain mr-4 rounded-2xl ${
                  isDark ? "" : "border border-gray-300"
                }`}
              />
            )}
            <h1
              className={`text-3xl md:text-5xl font-dancing font-bold drop-shadow-lg ${
                isDark ? "text-white" : "text-gray-700"
              }`}
            >
              {data?.title}
            </h1>
          </div>
        </div>

        <div
          className={`${isDark ? "max-w-7xl mx-auto" : "w-full max-w-7xl"} ${
            !isDark ? "grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch" : ""
          }`}
        >
          {sectionsArray.map((section, sectionIndex) => (
            <DesignComponent
              key={sectionIndex}
              data={section}
              imgUrl={isDark ? section.image : section.image[0] || ""}
              setIspreview={() => {}}
              sectionIndex={sectionIndex}
              hideEdit={true}
            />
          ))}
        </div>

        {showQRModal && (
          <QRCodeModal
            url={fullUrl}
            menuTitle={data?.title || "Menu"}
            onClose={handleCloseQR}
          />
        )}
      </div>
    </div>
  );
};

export default MenuCompleted;
