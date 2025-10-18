"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import ClassicBlack from "@/components/designs/classicBlackPreview";
import { MenuData } from "@/types/sectionType";
import Image from "next/image";

export default function RestaurantMenu() {
  const [data, setData] = useState<MenuData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuResult = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/items/menuItems/68efd9e27b89e43765753f88`
        );
        setData(menuResult.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchMenuData();
  }, []);

  const sectionsArray = data?.sections ? Object.values(data.sections) : [];

  return (
    <div className="relative min-h-screen font-inter p-5 sm:p-8">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/classic_blackBG.png"
          alt="Background"
          fill
          quality={100}
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="min-h-screen">
        <div className="text-center mb-8">
          <button
            className="absolute left-4  sm:left-8 md:left-16 lg:left-60 top-26 flex cursor-pointer bg-transparent rounded-full p-0 sm:px-4 sm:py-2 items-center hover:bg-white/10 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-600 group"
            onClick={() => router.back()}
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-colors sm:mr-2">
              <IoIosArrowBack size={18} className="text-gray-200" />
            </div>
            <span className="text-sm font-medium text-gray-200 hidden sm:flex">
              Back
            </span>
          </button>

          <div className="flex items-center justify-center mb-4 p-2">
            {data?.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-20 w-20 object-contain mr-4 rounded-2xl"
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
      </div>
    </div>
  );
}
