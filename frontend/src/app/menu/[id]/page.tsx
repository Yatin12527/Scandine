"use client";
import Data from "@/components/menuOneData";
import HeadingOne from "@/components/menuOneHeading";
import React, { useState, useEffect } from "react";

export default function MenuOne() {
  const [sectionIds, setSectionIds] = useState<number[]>([]);

  useEffect(() => {
    const savedSectionIds = JSON.parse(
      localStorage.getItem("menuSectionIds") || "[]"
    );

    if (savedSectionIds.length > 0) {
      setSectionIds(savedSectionIds);
    } else {
      const firstId = Date.now();
      setSectionIds([firstId]);
      localStorage.setItem("menuSectionIds", JSON.stringify([firstId]));
    }
  }, []);

  const addSection = () => {
    const newId = Date.now();
    const updated = [...sectionIds, newId];
    setSectionIds(updated);
    localStorage.setItem("menuSectionIds", JSON.stringify(updated));
  };

  const deleteSection = (id: number) => {
    const updatedSectionIds = sectionIds.filter((sid) => sid !== id);
    setSectionIds(updatedSectionIds);
    localStorage.setItem("menuSectionIds", JSON.stringify(updatedSectionIds));

    const allSections = JSON.parse(localStorage.getItem("menuItems") || "{}");
    delete allSections[id];
    localStorage.setItem("menuItems", JSON.stringify(allSections));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-inter flex flex-col items-center p-5 sm:p-8"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <HeadingOne />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {sectionIds.map((id) => (
          <div className="flex flex-col justify-between w-full" key={id}>
            <Data sectionId={id} />
            <button
              onClick={() => deleteSection(id)}
              className="border-2 bg-black text-white w-fit px-10 py-2 mt-10 sm:mt-2 mb-10 rounded-lg hover:bg-white hover:text-black hover:border-black cursor-pointer font-medium transition-colors duration-150 mx-auto"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        className="
          bg-orange-500 text-white
          font-bold
          px-8 py-3
          rounded-lg
          shadow-md
          transition-all
          duration-300
          ease-in-out
          transform
          hover:bg-red-600 hover:shadow-lg
          hover:scale-105
        "
        onClick={addSection}
      >
        Add Section
      </button>
    </div>
  );
}
