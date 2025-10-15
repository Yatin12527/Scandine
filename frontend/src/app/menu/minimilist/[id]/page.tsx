"use client";

import QRCodeModal from "@/components/qrModal";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineQrCode2 } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { asyncGetApi } from "@/redux/authSlice";
import Minimilist from "@/components/designs/minimilistPreview";

interface MenuItem {
  id: number;
  value: string;
  description: string;
  price: string;
  _id: string;
}

interface Section {
  sectionTitle: string;
  items: MenuItem[];
  image: string[];
  _id: string;
}

interface MenuData {
  _id: string;
  title: string;
  logo: string;
  sections: { [key: string]: Section };
  owner: string;
}

function CompletedMenu() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<MenuData | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const pathname = usePathname();
  const fullUrl = `${process.env.NEXT_PUBLIC_CLIENT}${pathname}`;
  const menuId = params.id;

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
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-inter flex flex-col items-center p-5 sm:p-8"
      style={{ backgroundImage: `url('/${bg}BG.png')` }}
    >
      {isOwner && (
        <div className="w-full max-w-7xl mb-6 flex justify-center gap-4 ">
          <button
            onClick={handleGenerateQR}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <MdOutlineQrCode2 size={20} />
            Generate QR
          </button>
          <button
            onClick={() => router.push(`/menu/${bg}/${menuId}/edit `)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <RiArrowGoBackFill size={20} />
            Back to Editing
          </button>
        </div>
      )}

      <div className="text-center mb-8 ">
        <div className="flex items-center justify-center mb-4 p-2">
          {data?.logo && (
            <img
              src={data.logo}
              alt="Logo Preview"
              className="h-20 w-20 object-contain mr-4 rounded-2xl border border-gray-300"
            />
          )}
          <h1 className="text-3xl md:text-5xl font-dancing text-gray-700 font-bold drop-shadow-lg">
            {data?.title}
          </h1>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {sectionsArray.map((section, sectionIndex) => (
          <Minimilist
            key={sectionIndex}
            data={section}
            imgUrl={section.image[0] || ""}
            setIspreview={() => {}}
            hideEdit={true}
          />
        ))}
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <QRCodeModal
          url={fullUrl}
          menuTitle={data?.title || "Menu"}
          onClose={handleCloseQR}
        />
      )}
    </div>
  );
}

export default CompletedMenu;
