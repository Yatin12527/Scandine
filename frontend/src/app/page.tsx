"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import AdditionalComponents from "@/components/hpComponents";
// import Video from "@/components/video";

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
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-20">
            <div className="max-w-4xl w-full space-y-12">
              <div className="space-y-8 text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
                  Your Menu.
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-red-400 bg-clip-text text-transparent">
                    Instantly Digital.
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  Transform your restaurant with QR-powered menus. No printing.
                  No hassle.
                </p>

                <button
                  onClick={() => router.push("/menu")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-full  transition-all transform hover:scale-105 cursor-pointer"
                >
                  Create Your Menu
                  <ArrowRight
                    className={`w-6 h-6 transition-transform ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                </button>

                <div className="flex items-center justify-center gap-12 pt-8">
                  <div>
                    <div className="text-4xl font-black text-orange-400">
                      5 min
                    </div>
                    <div className="text-sm text-gray-300">Setup</div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div>
                    <div className="text-4xl font-black text-orange-400">∞</div>
                    <div className="text-sm text-gray-300">Updates</div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div>
                    <div className="text-4xl font-black text-orange-400">
                      $0
                    </div>
                    <div className="text-sm text-gray-300">Printing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AdditionalComponents />
      {/* <Video /> */}
      <Footer />
    </div>
  );
};

export default Home;
