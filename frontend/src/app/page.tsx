"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import AdditionalComponents from "@/components/hpComponents";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full">
        <div className="fixed inset-0 z-0">
          <Image
            src="/table.avif"
            alt="Restaurant table background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/70 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-20">
            <div className="max-w-4xl w-full space-y-12">
              <div className="space-y-8 text-center">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
                  Your Menu
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                    Instantly Digital
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                  Transform your restaurant with QR-powered menus. No printing.
                  No hassle.
                </p>

                <button
                  onClick={() => router.push("/menu")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group inline-flex items-center gap-3 px-9 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base font-medium rounded-xl hover:bg-white/15 hover:border-white/30 transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  Create Your Menu
                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                </button>

                <div className="flex items-center justify-center gap-8 sm:gap-16 pt-12">
                  <div>
                    <div className="text-xl sm:text-3xl font-light text-orange-300 tracking-wide">
                      5 min
                    </div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                      Setup
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <div className="text-xl sm:text-3xl  font-light text-orange-300 tracking-wide">
                      ∞
                    </div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                      Updates
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <div className="text-xl sm:text-3xl  font-light text-orange-300 tracking-wide">
                      ₹0
                    </div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                      Printing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AdditionalComponents />
      <Footer />
    </div>
  );
};

export default Home;
