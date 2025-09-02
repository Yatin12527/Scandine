import Data from "@/components/menuOneData";
import HeadingOne from "@/components/menuOneHeading";
import axios from "axios";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useState, useEffect } from "react";

type MenuOneProps = {
  mode: "create" | "edit";
  menuId?: string;
};

export default function MenuOne({ mode, menuId }: MenuOneProps) {
  const [sectionIds, setSectionIds] = useState<number[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const router = useRouter();
  const params = usePathname();
  const parts = params.split("/");
  useEffect(() => {
    localStorage.setItem("style", parts[2]);
    if (mode === "create") {
      const saved = JSON.parse(localStorage.getItem("menuSectionIds") || "[]");
      if (saved.length > 0) {
        setSectionIds(saved);
      } else {
        const firstId = Date.now();
        setSectionIds([firstId]);
        localStorage.setItem("menuSectionIds", JSON.stringify([firstId]));
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}/items/menuItems/${menuId}`,
            { withCredentials: true }
          );
          const sections = response.data.sections;
          const sectionIdsArray = Object.keys(sections).map(Number);
          console.log(response);

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
          }
        } catch (error) {
          console.log(error);
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
    console.log("updated:", updated);
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
      setHasUnsavedChanges(false);

      alert(response.data.msg);
      router.push(`/menu/minimilist/${response.data.menuId}`);
    } catch (error) {
      console.error("Error submitting menu:", error);
      alert("Failed to save menu. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-inter flex flex-col items-center p-5 sm:p-8"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <HeadingOne />

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
        {sectionIds.map((id) => (
          <div className="flex flex-col justify-between w-full" key={id}>
            <Data sectionId={id} />
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
    </div>
  );
}
