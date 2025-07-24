"use client";
import Data from "@/components/menuOneData";
import HeadingOne from "@/components/menuOneHeading";
import React, { useState, useEffect } from "react";

interface MenuItem {
  id: number;
  value: string;
  price: string;
}

interface Section {
  sectionTitle: string;
  items: MenuItem[];
  image: string;
}

export default function MenuOne() {
  const [finalSubmission, setFinalSubmission] = useState({
    submitted: false,
    sectionTitle: "",
  });
  const [savedData, setSavedData] = useState<Section[] | null>(null);

  useEffect(() => {
    if (finalSubmission.submitted && finalSubmission.sectionTitle) {
      const storedData = localStorage.getItem(finalSubmission.sectionTitle);
      if (storedData) {
        setSavedData(JSON.parse(storedData));
      }
    }
  }, [finalSubmission]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-inter"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <HeadingOne />
      {!finalSubmission.submitted ? (
        <Data setFinalSubmission={setFinalSubmission} />
      ) : (
        <div className="max-w-xl mx-auto p-10">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {savedData?.[0]?.sectionTitle || "Menu Items"}
            </h2>

            {savedData?.[0]?.items && (
              <div className="space-y-4">
                {savedData[0].items.map((item: MenuItem) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-b border-gray-100 pb-3"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold text-gray-800 hover:text-green-600 transition-colors cursor-pointer">
                        {item.value}
                      </h3>
                    </div>
                    <span className="font-bold text-gray-800 hover:text-green-600 transition-colors whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {savedData?.[0]?.image && savedData[0].image !== " " && (
              <div className="mt-6">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={savedData[0].image}
                    alt="Menu section"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setFinalSubmission({ submitted: false, sectionTitle: "" });
                setSavedData(null);
              }}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200"
            >
              Edit Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
