"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const features = [
  {
    label: "Manage Effortlessly",
    title: "Instant Updates",
    desc: "Modify your menu in real-time from any device. No delays, no reprints, no complexity.",
    src: "/hp1.png",
  },
  {
    label: "Track Performance",
    title: "Business Intelligence",
    desc: "Data-driven insights on customer preferences and menu performance.",
    src: "/hp2.png",
  },
  {
    label: "Serve Smarter",
    title: "Contactless Experience",
    desc: "Seamless QR-based ordering that elevates the customer journey.",
    src: "/hp3.png",
  },
];

const metrics = [
  { number: "5min", label: "Setup Time" },
  { number: "∞", label: "Updates" },
  { number: "₹0", label: "Print Costs" },
  { number: "24/7", label: "Availability" },
];

const categories = [
  {
    title: "Fine Dining",
    description:
      "Sophisticated digital menus that complement your refined atmosphere. Manage wine lists, seasonal tasting menus, and chef selections with ease.",
    tags: ["Wine Pairing", "Tasting Menus", "Multi-Language"],
    image:
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Cafés & Coffee Houses",
    description:
      "Showcase your artisanal beverages and fresh pastries. Update seasonal offerings instantly to keep your menu current.",
    tags: ["Specialty Drinks", "Quick Service", "Retail"],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Quick Service",
    description:
      "Streamline operations with clear, dynamic menus that reduce wait times and improve order accuracy.",
    tags: ["Fast Orders", "Promotions", "High Volume"],
    image:
      "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=1170",
  },
  // {
  //   title: "Food Trucks",
  //   description:
  //     "Mobile-first menus for mobile-first businesses. Update locations, availability, and specials on the go.",
  //   tags: ["Location-Based", "Event Ready", "Mobile"],
  //   image:
  //     "https://images.unsplash.com/photo-1644150667853-d2ddead92129?auto=format&fit=crop&q=80&w=1248",
  // },
  // {
  //   title: "Bakeries",
  //   description:
  //     "Present your fresh baked goods beautifully. Update daily offerings as they come out of the oven.",
  //   tags: ["Daily Fresh", "Seasonal", "Visual"],
  //   image:
  //     "https://images.unsplash.com/photo-1628565836616-96eabd510740?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=880",
  // },
  // {
  //   title: "Bars & Lounges",
  //   description:
  //     "Feature your signature cocktails and spirits collection. Adjust pricing and happy hour specials effortlessly.",
  //   tags: ["Cocktails", "Happy Hours", "Events"],
  //   image:
  //     "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=735",
  // },
];

const AdditionalComponents = () => {
  const router = useRouter();
  return (
    <div className="relative w-full min-h-screen  bg-[#fffcf4] ">
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Built for Modern Operations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional tools designed to streamline your restaurant
              management
            </p>
          </div>

          <div className="space-y-14">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 items-center`}
              >
                <div className="flex-1 flex justify-center">
                  <div className="relative w-full max-w-lg">
                    <img
                      src={feature.src}
                      alt={feature.title}
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow: "inset 0 0 80px 20px #fffcf4",
                      }}
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-2">
                  <div className="text-orange-600 text-lg font-semibold">
                    {feature.label}
                  </div>
                  <h3 className="text-3xl  text-gray-900 font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Bar */}
          <div className="mt-24 border-t border-b border-gray-200 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-[#fffcf4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Trusted Across Industries
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From intimate bistros to high-volume establishments, our platform
              adapts to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl overflow-hidden hover:-translate-y-1 flex flex-col"
              >
                {/* Content on top */}
                <div className="relative p-8 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Image at bottom */}
                <div className="relative flex-1 min-h-[14rem] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={675}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Bottom CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Ready to modernize your menu?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join restaurants worldwide who have made the switch to digital
          </p>
          <button
            className="px-8 py-4 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200 uppercase tracking-wider cursor-pointer"
            onClick={() => {
              router.push("/menu");
            }}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdditionalComponents;
