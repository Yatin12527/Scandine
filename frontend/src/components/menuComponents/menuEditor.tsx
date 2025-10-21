import Data from "@/components/menuComponents/menuData";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { themes } from "../data/themes";
import HeadingOne from "./menuHeading";
import StackMenuSkeleton from "../ui/stackLoader";
import GridMenuSkeleton from "../ui/gridLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type MenuOneProps = {
  mode: "create" | "edit";
  menuId?: string;
};

const TEMPLATE_LAYOUTS = {
  minimilist: "grid",
  classic_black: "stack",
  trifold_gorment: "grid",
};

export default function MenuEditor({ mode, menuId }: MenuOneProps) {
  const [sectionIds, setSectionIds] = useState<number[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = usePathname();
  const parts = params.split("/");
  const t = themes[parts[2]];
  const currentTemplate = parts[2];
  const layoutType = TEMPLATE_LAYOUTS[currentTemplate] || "grid";
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.loading) {
      setIsLoading(true);
      return;
    }
    if (auth.error) {
      setIsLoading(false);
      router.push("/auth/login");
    }
  }, [auth.loading, auth.error, router]);

  useEffect(() => {
    localStorage.setItem("style", parts[2]);
    if (mode === "create") {
      const menuMode = localStorage.getItem("menuMode");
      if (menuMode === "edit") {
        localStorage.removeItem("Heading");
        localStorage.removeItem("Logo");
        localStorage.removeItem("menuItems");
        localStorage.removeItem("menuSectionIds");
        window.dispatchEvent(new Event("localStorageCleared"));
      }
      localStorage.setItem("menuMode", "create");

      const saved = JSON.parse(localStorage.getItem("menuSectionIds") || "[]");
      if (saved.length > 0) {
        setSectionIds(saved);
      } else {
        const firstId = Date.now();
        setSectionIds([firstId]);
        localStorage.setItem("menuSectionIds", JSON.stringify([firstId]));
      }
      setIsLoading(false);
    } else {
      localStorage.setItem("menuMode", "edit");
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}/items/menuItems/${menuId}`,
            { withCredentials: true }
          );
          const sections = response.data.sections;
          const sectionIdsArray = Object.keys(sections).map(Number);

          if (sectionIdsArray.length > 0) {
            setSectionIds(sectionIdsArray);
            localStorage.setItem(
              "menuSectionIds",
              JSON.stringify(sectionIdsArray)
            );
            localStorage.setItem("Heading", response.data.title);
            localStorage.setItem("menuItems", JSON.stringify(sections));
            if (response.data.logo) {
              localStorage.setItem("Logo", response.data.logo);
            }
            window.dispatchEvent(new Event("localStorageCleared"));
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      setHasUnsavedChanges(true);
      fetchData();
    }
  }, [mode, menuId]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        const message =
          "Your changes are not saved, reloading will delete all the changes!";
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    if (mode !== "create") {
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [hasUnsavedChanges, mode]);

  const addSection = () => {
    const newId = Date.now();
    const updated = [...sectionIds, newId];
    setSectionIds(updated);
    localStorage.setItem("menuSectionIds", JSON.stringify(updated));
  };

  const deleteSection = (id: number) => {
    const updatedSectionIds = sectionIds.filter((sid) => sid !== id);
    setSectionIds(updatedSectionIds);
    localStorage.setItem("menuSectionIds", JSON.stringify(updatedSectionIds));

    const allSections = JSON.parse(localStorage.getItem("menuItems") || "{}");
    delete allSections[id];
    localStorage.setItem("menuItems", JSON.stringify(allSections));
  };

  const finalSubmit = async () => {
    try {
      const payload = {
        title: localStorage.getItem("Heading"),
        logo: localStorage.getItem("Logo"),
        sections: JSON.parse(localStorage.getItem("menuItems") ?? "{}"),
        style: localStorage.getItem("style"),
        menuId,
      };

      const url =
        mode === "create"
          ? `${process.env.NEXT_PUBLIC_SERVER}/items/addmenuItems`
          : `${process.env.NEXT_PUBLIC_SERVER}/items/editmenuItems`;

      const method = mode === "create" ? "post" : "put";

      const response = await axios[method](url, payload, {
        withCredentials: true,
      });

      localStorage.removeItem("Heading");
      localStorage.removeItem("Logo");
      localStorage.removeItem("menuItems");
      localStorage.removeItem("menuSectionIds");
      localStorage.removeItem("style");
      localStorage.removeItem("menuMode");
      setHasUnsavedChanges(false);

      alert(response.data.msg);
      router.push(`/menu/${parts[2]}/${response.data.menuId}`);
    } catch (error) {
      console.error("Error submitting menu:", error);
      alert("Failed to save menu. Please try again.");
    }
  };

  if (auth.error) {
    return null;
  }
  if (layoutType === "stack") {
    return (
      <div className="relative min-h-screen font-inter flex flex-col items-center p-5 sm:p-8">
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url('/${parts[2]}BG.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
            height: "100vh",
            width: "100vw",
          }}
        />
        <button
          className="absolute left-0 sm:left-8 md:left-16 lg:left-60 top-12 flex cursor-pointer bg-transparent rounded-full p-0 sm:px-4 sm:py-2 items-center hover:bg-white/10 transition-all duration-200 shadow-md hover:shadow-lg sm:border border-gray-100 group"
          onClick={() => router.back()}
        >
          <div
            className={`w-8 h-8 rounded-full bg-${t.bg} flex items-center justify-center transition-colors mt-5 sm:mt-0 ml-2 sm:ml-0 sm:mr-2`}
          >
            <IoIosArrowBack size={18} className={`text-${t.text}`} />
          </div>
          <span className={`text-sm font-medium text-${t.text} hidden sm:flex`}>
            Back
          </span>
        </button>
        <HeadingOne t={t} />
        {isLoading ? (
          <StackMenuSkeleton />
        ) : (
          <>
            <div className="w-full max-w-7xl flex justify-center mb-8">
              <button
                className="bg-green-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:shadow-xl hover:scale-105 text-lg cursor-pointer"
                onClick={finalSubmit}
              >
                {mode === "create" ? "Create Menu" : "Update Menu"}
              </button>
            </div>

            <div className="w-full max-w-7xl">
              {sectionIds.map((id, index) => (
                <div key={id} className="mb-12">
                  <Data sectionId={id} sectionIndex={index} />
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => deleteSection(id)}
                      className="border-2 bg-red-500 text-white px-10 py-2 rounded-lg hover:bg-red-600 hover:border-red-700 cursor-pointer font-medium transition-colors duration-150"
                    >
                      Delete Section
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-red-600 hover:shadow-lg hover:scale-105 mt-6"
              onClick={addSection}
            >
              Add Section
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-inter flex flex-col items-center p-5 sm:p-8">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('/${parts[2]}BG.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          height: "100vh",
          width: "100vw",
        }}
      />
      <button
        className="absolute left-0 sm:left-8 md:left-16 lg:left-60 top-12 flex cursor-pointer bg-transparent rounded-full p-0 sm:px-4 sm:py-2 items-center hover:bg-white/10 transition-all duration-200 shadow-md hover:shadow-lg sm:border border-gray-100 group"
        onClick={() => router.back()}
      >
        <div
          className={`w-8 h-8 rounded-full bg-${t.bg} flex items-center justify-center  transition-colors mt-5 sm:mt-0 ml-2 sm:ml-0 sm:mr-2`}
        >
          <IoIosArrowBack size={18} className={`text-${t.text}`} />
        </div>
        <span className={`text-sm font-medium text-${t.text} hidden sm:flex`}>
          Back
        </span>
      </button>
      <HeadingOne t={t} />
      {isLoading ? (
        <GridMenuSkeleton />
      ) : (
        <>
          <div className="w-full max-w-7xl flex justify-center mb-8">
            <button
              className="
            bg-green-500 text-white
            font-bold
            px-8 py-3
            rounded-lg
            shadow-lg
            transition-all
            duration-300
            ease-in-out
            transform
            hover:bg-green-600 hover:shadow-xl
            hover:scale-105
            text-lg cursor-pointer
          "
              onClick={finalSubmit}
            >
              {mode === "create" ? "Create Menu" : "Update Menu"}
            </button>
          </div>

          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            {sectionIds.map((id, index) => (
              <div className="flex flex-col justify-between w-full" key={id}>
                <Data sectionId={id} sectionIndex={index} />
                <button
                  onClick={() => deleteSection(id)}
                  className="border-2 bg-black text-white w-fit px-10 py-2 mt-10 sm:mt-2 mb-10 rounded-lg hover:bg-white hover:text-black hover:border-black cursor-pointer font-medium transition-colors duration-150 mx-auto"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            className="
          bg-orange-500 text-white
          font-bold
          px-8 py-3
          rounded-lg
          shadow-md
          transition-all
          duration-300
          ease-in-out
          transform
          hover:bg-red-600 hover:shadow-lg
          hover:scale-105
          mt-6
        "
            onClick={addSection}
          >
            Add Section
          </button>
        </>
      )}
    </div>
  );
}
