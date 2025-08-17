"use client";

import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineQrCode2 } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import QRCode from "react-qr-code";

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
  image: string;
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
  const [data, setData] = useState<MenuData | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const pathname = usePathname();
  const fullUrl = `${process.env.NEXT_PUBLIC_CLIENT}${pathname}`;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuId = params.id;
        const [menuResponse, userResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}/items/menuItems/${menuId}`,
            { withCredentials: true }
          ),
          axios.get(`${process.env.NEXT_PUBLIC_SERVER}/users/me`, {
            withCredentials: true,
          }),
        ]);
        setData(menuResponse.data);
        if (userResponse.data.id === menuResponse.data.owner) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  // Convert sections object to array
  const sectionsArray = data?.sections ? Object.values(data.sections) : [];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-inter flex flex-col items-center p-5 sm:p-8"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      {isOwner && (
        <div className="w-full max-w-7xl mb-6 flex justify-center gap-4 flex-col">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2 cursor-pointer">
            <MdOutlineQrCode2 size={20} />
            Generate QR
          </button>
          <button
            // onClick={}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <RiArrowGoBackFill size={20} />
            Back to Editing
          </button>
          <QRCode
            size={250}
            value={fullUrl}
            viewBox={`0 0 256 256`}
          />
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
          <div key={sectionIndex} className="max-w-xl mx-auto sm:p-0 p-10">
            <div className="flex justify-between items-center ">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
                {section.sectionTitle}
              </h2>
            </div>
            <div className="bg-gray-500 w-full h-0.5 mb-4" />
            <div className="space-y-2">
              {section.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                      {item.value}
                    </h3>
                    <p className="text-xs text-gray-600 cursor-pointer hover:text-green-600 leading-tight">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-bold text-gray-800 cursor-pointer hover:text-green-600 text-sm whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            {section.image && section.image.trim() !== "" && (
              <div className="w-full h-60 mt-4">
                <img
                  src={section.image}
                  alt="Section Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedMenu;
