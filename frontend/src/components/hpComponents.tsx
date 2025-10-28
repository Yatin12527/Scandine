"use client";

import Image from "next/image";

const features = [
  {
    title: "Update in Seconds",
    desc: "Sold out of a dish or launching a new special? Update your menu instantly from your phone — no delays, no printing.",
    color: "from-orange-500 to-red-500",
    stat: "Real-time",
  },
  {
    title: "Track What Works",
    desc: "Discover what customers love most — see top-viewed menus, busy hours, and what drives the most orders.",
    color: "from-emerald-500 to-teal-500",
    stat: "Analytics",
  },
  {
    title: "Zero Contact Ordering",
    desc: "Guests scan, browse, and order — no physical menus needed. Sleek, simple, and totally touch-free.",
    color: "from-blue-500 to-indigo-500",
    stat: "QR Powered",
  },
];

const stats = [
  { number: "5 min", label: "Setup Time", color: "text-orange-600" },
  { number: "∞", label: "Menu Updates", color: "text-emerald-600" },
  { number: "$0", label: "Printing Costs", color: "text-blue-600" },
  { number: "100%", label: "Mobile Ready", color: "text-red-600" },
];

const categories = [
  {
    title: "Fine Dining & Restaurants",
    description:
      "Elegant digital menus that match your space. Update wine lists, tasting menus, and chef's picks effortlessly.",
    tags: ["Wine Lists", "Daily Specials", "Multi-Language"],
    tagColors: ["bg-red-500", "bg-orange-500", "bg-pink-500"],
    color: "from-red-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Cafes & Coffee Shops",
    description:
      "Let your brews and bakes shine. Update your seasonal specials or new drink launches in seconds.",
    tags: ["Seasonal Drinks", "Quick Service", "Takeaway"],
    tagColors: ["bg-emerald-500", "bg-teal-500", "bg-lime-500"],
    color: "from-emerald-500 to-teal-500",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Quick Service & Fast Food",
    description:
      "Speed matters. Let customers order faster with clear, dynamic menus that keep lines moving.",
    tags: ["Fast Orders", "Combo Deals", "High Volume"],
    tagColors: ["bg-yellow-500", "bg-amber-500", "bg-orange-500"],
    color: "from-yellow-500 to-orange-500",
    image:
      "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Food Trucks & Pop-ups",
    description:
      "Change locations daily? No worries. Keep your menu fresh and customers updated — anywhere, anytime.",
    tags: ["Mobile First", "Location Based", "Events"],
    tagColors: ["bg-blue-500", "bg-indigo-500", "bg-cyan-500"],
    color: "from-blue-500 to-indigo-500",
    image:
      "https://images.unsplash.com/photo-1644150667853-d2ddead92129?auto=format&fit=crop&q=80&w=1248",
  },
  {
    title: "Bakeries & Dessert Shops",
    description:
      "Showcase your treats with style. Update pastries, cakes, and specials fresh out of the oven — every morning.",
    tags: ["Fresh Bakes", "Seasonal Treats", "Photo Ready"],
    tagColors: ["bg-pink-500", "bg-rose-500", "bg-fuchsia-500"],
    color: "from-pink-500 to-rose-500",
    image:
      "https://images.unsplash.com/photo-1628565836616-96eabd510740?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
  {
    title: "Bars & Lounges",
    description:
      "Highlight your signature cocktails and happy hours. Update prices or specials before the night rush — in seconds.",
    tags: ["Cocktail Menu", "Happy Hours", "Dynamic Pricing"],
    tagColors: ["bg-purple-500", "bg-violet-500", "bg-indigo-500"],
    color: "from-purple-500 to-indigo-500",
    image:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
  },
];

const AdditionalComponents = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#fffcf4]">
      {/* Features Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#fffcf4] to-[#fff5e6]">
        {/* Ambient background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Everything You Need to Go{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Digital
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Stop losing money on outdated menus. Switch to smarter, faster,
              digital dining.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-orange-200 overflow-hidden transition-all duration-500 hover:-translate-y-3"
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />

                <div
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${feature.color} text-white text-sm font-bold mb-6 shadow-xl`}
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {feature.stat}
                </div>

                {/* Dynamic hover color fix */}
                <h3
                  className={`text-2xl font-black text-gray-900 mb-4 transition-all duration-300 group-hover:bg-gradient-to-r ${feature.color} group-hover:bg-clip-text group-hover:text-transparent`}
                >
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed font-medium">
                  {feature.desc}
                </p>

                {/* Floating orb */}
                <div
                  className={`absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-20 transition-all duration-700`}
                />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="relative bg-white rounded-3xl p-12 shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-pink-500/5 to-red-500/5" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div
                    className={`text-5xl md:text-6xl font-black ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-700 font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#fff5e6] to-[#fffcf4] relative overflow-hidden">
        {/* Ambient elements */}
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Perfect for{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Every Food Business
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Whether you run a cozy café or a bustling food truck, your menu
              deserves to shine.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-400 transition-all duration-500 hover:-translate-y-2 bg-white shadow-md hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative w-full h-44 md:h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95 group-hover:brightness-100"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/25 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 z-10" />
                </div>

                {/* Content */}
                <div className="p-6 bg-gradient-to-b from-white via-white to-orange-50/40 relative">
                  <div className="relative z-10">
                    <h3
                      className={`text-xl md:text-2xl font-extrabold text-gray-900 mb-3 transition-all duration-300 group-hover:bg-gradient-to-r ${item.color} group-hover:bg-clip-text group-hover:text-transparent`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm font-medium">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1.5 ${item.tagColors[i]} text-white text-[11px] font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-tl from-orange-400/20 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdditionalComponents;
