"use client";
import React, { useState } from "react";

interface MenuItemData {
  name: string;
  description: string;
  price: string;
}

interface MenuSectionData {
  title: string;
  items: MenuItemData[];
}

const RestaurantMenu: React.FC = () => {
  // Hardcoded menu data structure
  const menuData: MenuSectionData[] = [
    {
      title: "PLATTER'S",
      items: [
        {
          name: "Veg Platter",
          description:
            "Combination of fried paneer, fried chicken and chicken tikka with green chutney",
          price: "Rs. 840",
        },
        {
          name: "Veg Momo Platter",
          description: "Combination of steam, fried, chilly & chilli",
          price: "Rs. 735",
        },
        {
          name: "Chicken Momo Platter",
          description: "Combination of steam, fried & chilli",
          price: "Rs. 695",
        },
        {
          name: "Chicken Platter",
          description: "Combination of fried chicken and chicken tikka",
          price: "Rs. 945",
        },
        {
          name: "Fish Platter",
          description: "Combination of fried fish & fish tikka style",
          price: "Rs. 1635",
        },
        {
          name: "Mixed Platter",
          description: "Combination of chicken, fish, mutton",
          price: "Rs. 1360",
        },
        {
          name: "Tandoori Platter",
          description: "Combination of chicken, fish & tikka",
          price: "Rs. 1295",
        },
        {
          name: "Newari Khaja Set",
          description: "Combination of typical newari snacks",
          price: "Rs. 760/795",
        },
        {
          name: "Fruits Platter",
          description: "Combination of different seasonal fruits",
          price: "Rs. 600",
        },
      ],
    },
    {
      title: "FROM THE TANDOOR",
      items: [
        {
          name: "Tandoori Chicken Half/ Full",
          description:
            "Chicken marinated in yoghurt and spices and cooked in tandoor",
          price: "Rs. 965/ 1800",
        },
        {
          name: "Tandoori Trout Fish",
          description:
            "Our fresh trout marinated in our fresh fish with Indian spices cooked in tandoor",
          price: "Rs. 990",
        },
        {
          name: "Tandoori Prawn",
          description:
            "Fresh prawn marinated with yoghurt and Indian spices cooked in tandoor",
          price: "Rs. 1360",
        },
        {
          name: "Chicken Tikka",
          description:
            "Our marinated boneless tikka chicken with Indian spices cooked in tandoor",
          price: "Rs. 740",
        },
        {
          name: "Fish Tikka",
          description:
            "Fresh fish marinated with fresh fish tikka spices cooked in tandoor",
          price: "Rs. 740",
        },
        {
          name: "Paneer Tikka",
          description:
            "Paneer marinated with yoghurt and spices cooked in tandoor",
          price: "Rs. 715",
        },
        {
          name: "Paneer Tikka Masala",
          description:
            "Tandoori tikka Paneer Tikka Butter Masala Paneer in Masala ka Salan",
          price: "Rs. 135/185/215",
        },
      ],
    },
    {
      title: "TOUCH OF ITALY",
      items: [
        {
          name: "Lasagna with Meat Sauce",
          description:
            "Layers of fresh pasta with meat sauce, bechamel & cheese melted on top",
          price: "Rs. 605",
        },
        {
          name: "Lasagna Bolognese",
          description:
            "Our baked layers of egg pasta with our classic meat sauce",
          price: "Rs. 685",
        },
        {
          name: "Spaghetti/ Penne Pasta",
          description:
            "Your choice of spaghetti or penne pasta with bolognese served with garlic bread",
          price: "Rs. 685",
        },
      ],
    },
    {
      title: "PIZZA (SMALL/LARGE)",
      items: [
        {
          name: "Margherita (Italian)",
          description: "Classic Italian Classic tomato herbs",
          price: "Rs. 515/ 790",
        },
        {
          name: "Mixed Sea Food",
          description: "Assorted sea food, tomato herbs",
          price: "Rs. 805/ 930",
        },
        {
          name: "Grilled Vegetable",
          description: "Grilled Vegetable tomato herbs",
          price: "Rs. 560/ 680",
        },
        {
          name: "Mushroom",
          description: "Grilled Mushroom, tomato & herbs",
          price: "Rs. 665/ 790",
        },
        {
          name: "Margherita",
          description: "Classic tomato and oregano",
          price: "Rs. 490/ 615",
        },
        {
          name: "Paneer Tikka",
          description: "Topping with the most talked Paneer, cheese, tomato",
          price: "Rs. 665/ 790",
        },
      ],
    },
    {
      title: "CHINESE",
      items: [
        {
          name: "Fried Rice Veg/Chicken/Mixed",
          description: "Rice choice fried rice with soya sauce",
          price: "Rs. 450/490/515",
        },
        {
          name: "Noodles Veg/Chicken/Mixed",
          description: "Noodles choice fried noodles with soya sauce",
          price: "Rs. 360/400/410",
        },
        {
          name: "Fried Rice with Chowmein/ Fried Noodles",
          description: "Fried rice combo with vegetable chowmein",
          price: "Rs. 590/ 620",
        },
        {
          name: "Schezwan/Dry Chicken",
          description:
            "Spicy sauce even chefs of fine thai served with steamed rice",
          price: "Rs. 470/ 530",
        },
        {
          name: "Garlic Prawn",
          description: "Fried prawns in garlic chili sauce with steamed rice",
          price: "Rs. 1535",
        },
        {
          name: "Garlic Paneer",
          description:
            "Crispy fried paneer in hot garlic chili sauce served with rice",
          price: "Rs. 640",
        },
        {
          name: "Sweet & Sour Fish",
          description:
            "Fresh fish cooked in lemon chili sauce with steamed rice",
          price: "Rs. 835",
        },
        {
          name: "Stir Fried Tofu & Pokchoy",
          description:
            "Stir fried tofu and pokchoy with oyster sauce and steamed rice",
          price: "Rs. 630",
        },
        {
          name: "Vegetable Spring Rolls",
          description:
            "Fried roll of spring vegetable and Chinese flour with sweet & sour sauce",
          price: "Rs. 465",
        },
        {
          name: "Chicken Spring Rolls",
          description:
            "Fried roll of spring chicken and Chinese flour with sweet & sour sauce",
          price: "Rs. 490",
        },
        {
          name: "Chicken Tofu",
          description:
            "Stir fried tofu in paneer chili sauce with steamed rice",
          price: "Rs. 590",
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-inter"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <div className="min-h-screen ">
        <div className="p-4 md:p-8 ">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {/* Menu Icon/Logo Space */}
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-lg">🍽️</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-dancing text-green-600 font-bold drop-shadow-lg">
                Ultimate Menu
              </h1>
            </div>
          </div>

          {/* Main Menu Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Platter's Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
                    {menuData[0].title}
                  </h2>
                  <div className="bg-gray-500 w-full h-0.5 mb-4" />

                  <div className="space-y-2">
                    {menuData[0].items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                            {item.name}
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
                </div>

                {/* Touch of Italy Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
                    {menuData[2].title}
                  </h2>
                  <div className="bg-gray-500 w-full h-0.5 mb-4" />
                  <div className="space-y-2">
                    {menuData[2].items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                            {item.name}
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

                  {/* Pasta Image Space */}
                  <div className="mt-4 w-full h-32 bg-gray-300 bg-opacity-20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                    <span className="text-gray-700 text-sm">
                      Pasta Image Placeholder
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                {/* From the Tandoor Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
                    {menuData[1].title}
                  </h2>
                  <div className="bg-gray-500 w-full h-0.5 mb-4" />
                  <div className="space-y-2">
                    {menuData[1].items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                            {item.name}
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
                </div>

                {/* Pizza Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
                    {menuData[3].title}
                  </h2>
                  <div className="bg-gray-500 w-full h-0.5 mb-4" />
                  <div className="space-y-2">
                    {menuData[3].items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                            {item.name}
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

                  {/* Pizza Image Space */}
                  <div className="mt-4 w-full h-32 bg-gray-300 bg-opacity-20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                    <span className="text-gray-700 text-sm">
                      Pizza Image Placeholder
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Chinese Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
                    {menuData[4].title}
                  </h2>
                  <div className="bg-gray-500 w-full h-0.5 mb-4" />
                  <div className="space-y-2">
                    {menuData[4].items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                            {item.name}
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

                  {/* Chinese Food Bowl Image Space */}
                  <div className="mt-4 w-full h-32 bg-gray-300 bg-opacity-20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                    <span className="text-gray-700 text-sm">
                      Chinese Food Image Placeholder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8 text-gray-800 text-sm font-semibold drop-shadow-md">
            <p>*All prices are inclusive of government charges.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
