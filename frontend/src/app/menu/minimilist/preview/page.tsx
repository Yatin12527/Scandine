"use client";
import Minimilist from "@/components/designs/minimilistPreview";
import { MenuData } from "@/types/sectionType";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

function Preview() {
  const [data, setData] = useState<MenuData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuResult = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/items/menuItems/68ea363d22f09c02386310fa`
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
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-inter flex flex-col items-center p-5 sm:p-8"
      style={{ backgroundImage: "url('/minimilistBG.png')" }}
    >
      <div className="text-center mb-8">
        <button
          className="absolute left-4 sm:left-8 md:left-16 lg:left-60 top-12 flex cursor-pointer bg-transparent rounded-full p-0 sm:px-4 sm:py-2 items-center hover:bg-white/10 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-100 group"
          onClick={() => router.back()}
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors sm:mr-2">
            <IoIosArrowBack size={18} className="text-gray-700" />
          </div>
          <span className="text-sm font-medium text-gray-800 hidden sm:flex">
            Back
          </span>
        </button>

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
    </div>
  );
}

export default Preview;
