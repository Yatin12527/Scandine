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
  const [menuItems, setMenuItems] = useState([""]);
  useEffect(() => {
    setMenuItems(JSON.parse(localStorage.getItem("menuItems") || '[""]'));
  }, []);

  const addMenuItems = () => {
    setMenuItems([...menuItems, ""]);
  };
  console.log(menuItems);
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-inter flex flex-col items-center"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <HeadingOne />
      {menuItems.map((data, index) => (
        <Data key={index} />
      ))}
      <button
        className="border-1 border-black mb-10 w-50 cursor-pointer"
        onClick={addMenuItems}
      >
        Add section
      </button>
    </div>
  );
}
