"use client";
import { HiMenuAlt2 } from "react-icons/hi";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ProfileModal from "./profileModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { asyncGetApi } from "@/redux/authSlice";
import { themes } from "./data/themes";

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
    title: "Dashboard",
    link: "/dashboard",
  },
];

type ThemeKey = keyof typeof themes;

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("minimilist");
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);


  const detectTheme = (path: string): ThemeKey => {
    if (path.includes("minimilist")) return "minimilist";
    if (path.includes("classic_black")) return "classic_black";
    if (path.includes("trifold_gourmet")) return "trifold_gourmet";
    return "minimilist";
  };

  const shouldHideNavbar = () => {
    if (pathname.includes("preview")) return false;
    const regex = /^\/menu\/(minimilist|classic_black)\/[^\/]+$/;
    return regex.test(pathname);
  };

  const getMobileBackground = () => {
    const theme = themes[currentTheme];
    if (pathname === "/") {
      return "bg-[#fffbf5]";
    } else if (pathname === "/menu") {
      return "bg-[#fffbf5]";
    } else if (pathname.startsWith("/menu/minimilist")) {
      return "bg-gray-200";
    } else {
      return `bg-${theme.text}`;
    }
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Update theme based on pathname
  useEffect(() => {
    setCurrentTheme(detectTheme(pathname));
  }, [pathname]);

  const handleProfileModalClose = () => {
    setShowProfileModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(asyncGetApi()).unwrap();
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (shouldHideNavbar()) {
    return null;
  }

  const mobileBackground = getMobileBackground();
  const theme = themes[currentTheme];

  return (
    <>
      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Profile modal backdrop */}
      {showProfileModal && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={handleProfileModalClose}
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
                  className="text-gray-800 hover:opacity-80 transition-colors"
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
                onClick={() => router.push("/")}
                className="cursor-pointer"
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
                        className={`text-${theme.text} hover:opacity-80 font-medium transition-colors`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="relative">
                    <Avatar
                      className="cursor-pointer"
                      onClick={() => setShowProfileModal((prev) => !prev)}
                    >
                      <AvatarImage src={auth.picture} alt="Profile" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    {showProfileModal && (
                      <ProfileModal
                        userData={auth}
                        onClose={handleProfileModalClose}
                      />
                    )}
                  </div>
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
                  className="block text-center px-3 py-2 text-gray-600 hover:bg-gray-800 rounded transition-colors"
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
