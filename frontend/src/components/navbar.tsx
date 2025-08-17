"use client";
import { HiMenuAlt2 } from "react-icons/hi";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const navMenu = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Templates",
    link: "/menu",
  },
  {
    title: "title 3",
    link: "/title3",
  },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [pfp, setPfp] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if current route should hide navbar
  const shouldHideNavbar = () => {
    const regex = /^\/menu\/minimilist\/[^\/]+$/;
    return regex.test(pathname);
  };

  // Don't render navbar if on excluded route
  if (shouldHideNavbar()) {
    return null;
  }

  const getMobileBackground = () => {
    if (pathname === "/") {
      return "bg-[#fffbf5]";
    } else if (pathname === "/menu") {
      return "bg-[#fffbf5]";
    } else if (pathname === "/menu/minimilist") {
      return "bg-[#e3e4e2]";
    } else if (pathname.startsWith("/menu/minimilist")) {
      return "bg-[#e0dcdc]";
    } else {
      return "bg-white";
    }
  };

  const mobileBackground = getMobileBackground();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/users/me`,
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.picture) {
          setIsLoggedIn(true);
          setPfp(response.data.picture);
          console.log(response.data.picture);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className="relative md:absolute w-full md:left-0 md:top-0 z-50">
        <div
          className={`w-full px-4 ${mobileBackground} md:bg-transparent shadow-lg md:shadow-none`}
        >
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <div className="md:hidden mr-2">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <HiMenuAlt2 size={24} />}
                </button>
              </div>
              <Image
                src="/logo2.png"
                width={100}
                height={50}
                alt="QR Menu Logo"
              />
            </div>
            <div>
              {isLoading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              ) : isLoggedIn ? (
                <div className="flex items-center gap-x-8">
                  <div className="hidden md:flex space-x-8 items-center">
                    {navMenu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.link}
                        className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <Avatar className="cursor-pointer">
                    <AvatarImage src={pfp} alt="Profile" />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <>
                  <Link
                    className="bg-orange-500 text-white rounded-lg px-4 py-2 mr-2 font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                    href="/auth/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="bg-blue-100 text-blue-700 rounded-lg px-3 py-2 font-semibold cursor-pointer hover:bg-blue-200 transition-colors border border-blue-200"
                    href="/auth/signup"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`${mobileBackground} md:bg-transparent shadow-lg md:shadow-none`}
          >
            <div className="px-4 space-y-2">
              {navMenu.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="block text-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
