import React from "react";

export default function RestaurantMenu() {
  const menuData = {
    appetizers: [
      {
        name: "FOOD NAME 01",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 02",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 03",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 04",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
    mainCourses: [
      {
        name: "FOOD NAME 01",
        price: "$10.25",
        description: "Lorem ipsum has been the industry's standard dummy text.",
      },
      {
        name: "FOOD NAME 02",
        price: "$10.25",
        description: "Lorem ipsum has been the industry's standard dummy text.",
      },
      {
        name: "FOOD NAME 03",
        price: "$10.25",
        description: "Lorem ipsum has been the industry's standard dummy text.",
      },
      {
        name: "FOOD NAME 04",
        price: "$10.25",
        description: "Lorem ipsum has been the industry's standard dummy text.",
      },
      {
        name: "FOOD NAME 04",
        price: "$10.25",
        description: "Lorem ipsum has been the industry's standard dummy text.",
      },
      {
        name: "FOOD NAME 04",
        price: "$10.25",
        description: "Lorem ipsum has been the industry's standard dummy text.",
      },
      {
        name: "FOOD NAME 04",
        price: "$10.25",
        description: "Lorem ipsum has been the industry's standard dummy text.",
      },
    ],
    soups: [
      {
        name: "FOOD NAME 01",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 02",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 03",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
    salads: [
      {
        name: "FOOD NAME 01",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 02",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 03",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
    desserts: [
      {
        name: "FOOD NAME 01",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 02",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 03",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
    drinks: [
      {
        name: "FOOD NAME 01",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 02",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 03",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 04",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
    specialOffer: [
      {
        name: "FOOD NAME 01",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 02",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 03",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        name: "FOOD NAME 04",
        price: "$10.25",
        description:
          "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/classic_blackBG.png)",
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8 md:px-8 lg:px-16 max-w-7xl mx-auto ">
        {/* Appetizers Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-wider text-white font-captureit">
            APPETIZER
          </h2>
          <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuData.appetizers.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold ">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full h-64 bg-gray-600 rounded-lg"></div>
          </div>
        </section>

        {/* Main Course Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-wider text-white font-captureit">
            MAIN COURSE
          </h2>
          <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {menuData.mainCourses.slice(0, 3).map((item, idx) => (
              <div key={idx}>
                <div className="w-full h-40 bg-gray-600 rounded-lg mb-3"></div>
                <div className="flex justify-between items-start">
                  <h3 className="text-white text-lg font-semibold">
                    {item.name}
                  </h3>
                  <span className="text-yellow-600 font-bold ml-4 font-captureit">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuData.mainCourses.slice(3).map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white text-lg font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.description}
                  </p>
                </div>
                <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-wider text-white font-captureit">
            SPECIAL OFFER
          </h2>
          <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="w-full h-64 bg-gray-600 rounded-lg"></div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuData.specialOffer.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two Column Layout for Soups/Salads and Desserts/Drinks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            {/* Soups Section */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-wider text-white font-captureit">
                SOUPS
              </h2>
              <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>

              <div className="grid grid-cols-1 gap-6">
                <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
                <div className="space-y-6">
                  {menuData.soups.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white text-lg font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Desserts Section */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-wider text-white font-captureit">
                DESSERTS
              </h2>
              <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>

              <div className="grid grid-cols-1 gap-6">
                <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
                <div className="space-y-6">
                  {menuData.desserts.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white text-lg font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div>
            {/* Salads Section */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-wider text-white font-captureit">
                SALADS
              </h2>
              <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>

              <div className="space-y-6">
                {menuData.salads.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Image Placeholders */}
            <div className="space-y-4 mb-12">
              <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
              <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
            </div>

            {/* Drinks & Tea Section */}
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-wider text-white font-captureit">
                DRINKS & TEA
              </h2>
              <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>

              <div className="space-y-6">
                {menuData.drinks.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
