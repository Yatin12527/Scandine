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
import ClassicBlack from "@/components/designs/classicBlackPreview";

interface MenuItem {
  id: number;
  value: string;
  description: string;
  price: string;
  _id: string;
}

interface SectionData {
  sectionTitle: string;
  items: MenuItem[];
  image: string[];
  _id: string;
}

interface MenuData {
  _id: string;
  title: string;
  logo: string;
  sections: { [key: string]: SectionData };
  owner: string;
}

const ClassicBlackCompleted = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const menuId = params.id;

  const [data, setData] = useState<MenuData | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  const fullUrl = `${process.env.NEXT_PUBLIC_CLIENT}${pathname}`;

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
  const bg = pathname.split("/")[2];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-inter"
      style={{ backgroundImage: `url('/${bg}BG.png')` }}
    >
      <div className="bg-black bg-opacity-80 min-h-screen p-5 sm:p-8">
        {isOwner && (
          <div className="w-full max-w-7xl mx-auto mb-6 flex justify-center gap-4 mt-15">
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
                className="h-20 w-20 object-contain mr-4 rounded-2xl "
              />
            )}
            <h1 className="text-3xl md:text-5xl font-dancing text-white font-bold drop-shadow-lg">
              {data?.title}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {sectionsArray.map((section, sectionIndex) => (
            <ClassicBlack
              key={sectionIndex}
              data={section}
              imgUrl={section.image}
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

export default ClassicBlackCompleted;
