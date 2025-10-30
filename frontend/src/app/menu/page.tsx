import Link from "next/link";
import Templates from "@/components/templates";
import Locked from "@/components/ui/lockedOverlay";
import Image from "next/image";
import ContactButton from "@/components/ui/contactDesignTeamButton";

function Menu() {
  return (
    <div className="min-h-screen bg-[#fffcf4] py-16 px-4 flex  justify-center">
      <div className="max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">
            Premium Templates
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Professionally crafted menu designs to showcase your culinary
            offerings with style and sophistication
          </p>
        </div>

        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {Templates.map((items, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-slate-300/50 hover:-translate-y-2"
            >
              {items.status !== "active" && <Locked />}

              {/* Badge */}
              {items.badge && (
                <div className="absolute top-6 right-6 z-10">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      items.badge === "Popular"
                        ? "bg-emerald-500 text-white"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    } shadow-lg`}
                  >
                    {items.badge}
                  </span>
                </div>
              )}

              {/* Image  */}
              <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-100 to-slate-200 h-64">
                <Image
                  src={items.Image}
                  alt={items.Title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {items.Title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                    {items.Description}
                  </p>
                  <p className="text-emerald-600 font-semibold text-xs tracking-wide uppercase">
                    {items.Subheading}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 items-center">
                  <Link href={items.Preview} className="flex-1">
                    <button className="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:scale-[1.02] text-sm cursor-pointer">
                      Preview
                    </button>
                  </Link>

                  <Link href={items.Use} className="flex-1">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer">
                      Use Template
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 ">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Need a Custom Design?</h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Our design team can create a bespoke menu template tailored
                specifically to your brand and requirements
              </p>
              <ContactButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
