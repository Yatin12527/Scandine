"use client";
import Image from "next/image";
import { ChartNoAxesCombined, Clock, QrCode, Plus, Play } from "lucide-react";
import { ArrowRight, Zap, RefreshCw, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const iconData = [
  { Icon: ChartNoAxesCombined, color: "text-red-500" },
  { Icon: Clock, color: "text-green-500" },
  { Icon: QrCode, color: "text-blue-500" },
];

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className=" md:hidden menu-overlay fixed inset-0 bg-black opacity-20 z-50 "
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="w-full h-full bg-gradient-to-bl from-orange-300 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-200 to-transparent rounded-full -translate-x-32 translate-y-32 opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-amber-200 to-transparent rounded-full opacity-20"></div>

      {/* Hero Section */}

      <section className=" py-20 px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center text-balance 979:text-left">
                Your Menu.
                <br />
                Your QR.
                <br />
                <span className="text-orange-500">In Seconds.</span>
              </h1>
              <div className="justify-center flex 979:justify-start">
                <p className="text-xl text-gray-600 mb-8 max-w-lg 979:text-left text-center">
                  Launch your digital menu, share instantly, and handle
                  everything in one place
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center 979:justify-start">
                <button
                  className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => {
                    router.push("/menu");
                  }}
                >
                  <Plus />
                  Create New Menu
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold flex  items-center justify-center gap-6 hover:border-orange-400 hover:text-orange-600 transition-colors">
                  <Play />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="hidden sm:flex items-center gap-6 pt-8 justify-center 979:justify-start">
              {/* Step Icons */}
              <div className="flex items-center gap-3">
                {iconData.map(({ Icon, color }, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-full flex items-center justify-center ${color}`}
                  >
                    <Icon size={18} />
                  </div>
                ))}
              </div>

              {/* Compact Setup Message */}
              <div className="leading-tight">
                <div className="text-xl font-semibold text-gray-800">
                  5 Minutes
                </div>
                <div className="text-sm text-gray-500">
                  From setup to your first scan
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative space-y-6">
            {/* Chef Image Container */}
            <div className="relative z-10 justify-center 979:justify-start flex">
              <div className="relative">
                <Image
                  src="/table.avif"
                  alt="table with menu"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />

                {/* Subtle Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        Live Menu
                      </div>
                      <div className="text-xs text-gray-600">
                        Updated instantly
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -top-3 -right-3 text-black bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50"
                  style={{
                    boxShadow: "0 -6px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        5 Minutes
                      </div>
                      <div className="text-xs text-gray-600">
                        All you need to start
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - New Modern Layout */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-orange-500">ScanDine</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to modernize your restaurant's ordering
              experience
            </p>
          </div>

          {/* Modern Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <Zap className="w-8 h-8" />
                  <div className="text-3xl font-bold opacity-20">01</div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Lightning Fast Setup
                </h3>
                <p className="text-orange-100 mb-6">
                  Get your digital menu live in under 5 minutes. No technical
                  skills required.
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-200">02</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Unlimited Updates
                </h3>
                <p className="text-gray-600 mb-6">
                  Change prices, add items, update descriptions anytime. Your
                  customers always see the latest menu.
                </p>
                <div className="flex items-center text-sm font-semibold text-blue-600">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <TrendingUp className="w-8 h-8" />
                  <div className="text-3xl font-bold opacity-20">03</div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Boost Efficiency</h3>
                <p className="text-gray-300 mb-6">
                  Reduce wait times, eliminate printing costs, and wow your
                  customers with instant menu access.
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>See Results</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
              <span className="font-semibold">Ready to get started?</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
