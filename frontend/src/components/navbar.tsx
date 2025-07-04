"use client";
import { HiMenuAlt2 } from "react-icons/hi";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navMenu = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "title 2",
    link: "/title2",
  },
  {
    title: "title 3",
    link: "/title3",
  },
];
const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const [pfp, setPfp] = useState<string>("");
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/me`,
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(!isLoggedin);
        setPfp(response.data.picture);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <nav className="fixed w-full left-0 bg top-0 z-50 bg-[#fffbf6]">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="md:hidden mr-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600"
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

          <div className="flex items-center gap-x-8">
            {/* Desktop Navigation - hidden on mobile */}
            <div className="hidden md:flex space-x-8 items-center">
              {navMenu.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  {item.title}
                </a>
              ))}
            </div>

            {/* Profile/Login - always visible */}
            <div>
              {isLoggedin ? (
                <Avatar>
                  <AvatarImage src={pfp} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              ) : (
                <Link
                  className="bg-orange-500 text-white rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-orange-600"
                  href="/auth/login"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#fffbf6] w-full border-t absolute z-60">
          <div className="px-4 py-4 space-y-2 justify-center">
            {navMenu.map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="flex flex-col text-center px-3 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
