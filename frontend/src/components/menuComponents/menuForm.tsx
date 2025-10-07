"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { themes } from "./data/themes";

interface MenuItem {
  id: number;
  value: string;
  description: string;
  price: string;
}

interface SectionData {
  sectionTitle: string;
  items: MenuItem[];
  image?: string;
}

interface MenuFormProps {
  sectionData: SectionData;
  imgUrl: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  image: File | null;
  sectionId: number;
  setIspreview: React.Dispatch<React.SetStateAction<boolean>>;
  setSections: React.Dispatch<React.SetStateAction<SectionData[]>>;
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
  currentTheme: string;
}
const MenuForm: React.FC<MenuFormProps> = ({
  sectionData,
  imgUrl,
  setImage,
  setImgUrl,
  image,
  sectionId,
  setIspreview,
  setSections,
  nextId,
  setNextId,
  currentTheme,
}) => {
  const t = themes[currentTheme];
  const [isUploading, setIsUploading] = useState(false);
  const handleFinalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allSections = JSON.parse(localStorage.getItem("menuItems") || "{}");
    allSections[sectionId] = sectionData;
    localStorage.setItem("menuItems", JSON.stringify(allSections));
    setIspreview(true);
  };

  const handleItemChange = (
    itemId: number | undefined,
    field: "value" | "price" | "Section Title" | "description",
    newValue: string
  ) => {
    setSections((currentSections) => {
      const newSections = [...currentSections];
      const sectionToUpdate = newSections[0];
      if (field === "Section Title") {
        sectionToUpdate.sectionTitle = newValue;
      } else {
        const itemToUpdate = sectionToUpdate.items.find(
          (item: { id: number }) => item.id === itemId
        );

        if (itemToUpdate) {
          itemToUpdate[field] = newValue;
        }
      }
      return newSections;
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const deleteItem = (idToDelete: number) => {
    setSections((prevSections) => [
      {
        ...prevSections[0],
        items: prevSections[0].items.filter((item) => item.id !== idToDelete),
      },
    ]);
  };

  const addItem = () => {
    setSections((prev) => [
      {
        ...prev[0],
        items: [
          ...prev[0].items,
          { id: nextId, value: "", description: "", price: "" },
        ],
      },
    ]);
    setNextId((prevId) => prevId + 1);
  };
  const imageSubmit = async () => {
    if (!image) return;

    setIsUploading(true);
    try {
      const compressedFile = await imageCompression(image, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressedFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedImageUrl = response.data.url;
      setImgUrl(uploadedImageUrl);
      setSections((prevSections) => {
        const newSections = JSON.parse(JSON.stringify(prevSections));
        const sectionToUpdate = newSections[0];
        sectionToUpdate.image = uploadedImageUrl;
        return newSections;
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="w-full sm:p-4">
      <form
        className={`bg-${t.bg} rounded-2xl shadow-xl border border-${t.border} overflow-hidden`}
        onSubmit={handleFinalSubmit}
      >
        <div
          className={`bg-gradient-to-r ${t.header} px-8 py-6 flex items-center gap-4`}
        >
          <input
            className={`w-full text-base sm:text-lg md:text-xl font-semibold rounded-2xl p-2 sm:p-3 border-white border-2 text-white bg-transparent placeholder-white ${t.headerFocus} transition disabled:bg-gray-300 disabled:cursor-not-allowed`}
            placeholder="Section Title"
            value={sectionData.sectionTitle}
            onChange={(e) =>
              handleItemChange(undefined, "Section Title", e.target.value)
            }
            required
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="group relative space-y-6">
            {sectionData.items.map((data, index) => (
              <div key={data.id}>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-3">
                  <div className="flex-1 space-y-2">
                    <label
                      className={`block text-sm font-medium text-${t.label}`}
                    >
                      Item
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-${t.inputBg} border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-${t.accent}-500 focus:border-transparent transition-all duration-200 text-${t.text} placeholder-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed`}
                      placeholder="Enter item name"
                      value={data.value}
                      onChange={(e) =>
                        handleItemChange(data.id, "value", e.target.value)
                      }
                      required
                    />
                    <label
                      className={`block text-sm font-medium text-${t.label}`}
                    >
                      Description
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-${t.inputBg} border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-${t.accent}-500 focus:border-transparent transition-all duration-200 text-${t.text} placeholder-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed`}
                      placeholder="Enter Description"
                      value={data.description}
                      onChange={(e) =>
                        handleItemChange(data.id, "description", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <label
                      className={`block text-sm font-medium text-${t.label}`}
                    >
                      Price
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-${t.inputBg} border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-${t.accent}-500 focus:border-transparent transition-all duration-200 text-${t.text} placeholder-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed`}
                      placeholder="₹0.00"
                      value={data.price}
                      onChange={(e) =>
                        handleItemChange(data.id, "price", e.target.value)
                      }
                    />
                  </div>
                  {sectionData.items.length > 1 && (
                    <div className="flex items-center pb-2">
                      <button
                        type="button"
                        className="p-3 sm:mt-8 mt-4 flex gap-x-2 items-center text-white bg-red-600 sm:bg-white sm:text-red-500 sm:hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group-hover:opacity-100 opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => deleteItem(data.id)}
                      >
                        <span className="sm:hidden">Delete</span>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {index < sectionData.items.length - 1 && (
                  <div className={`border-b border-${t.border}`}></div>
                )}
              </div>
            ))}
          </div>

          <div className={`pt-6 border-t border-${t.border}`}>
            <button
              type="button"
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-${t.accent}-600 hover:bg-${t.accent}-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
              onClick={addItem}
            >
              <Plus size={20} />
              Add New Item
            </button>
          </div>
        </div>

        {imgUrl ? (
          <div className="p-6 sm:p-8 flex flex-col items-center">
            <div
              className={`w-full h-60 bg-${t.inputBg} bg-opacity-50 rounded-lg flex items-center justify-center border-2 border-dashed border-${t.border} overflow-hidden`}
            >
              <img
                src={imgUrl}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setImgUrl("");
                setImage(null);
                sectionData.image = "";
              }}
              className="mt-4 w-28 text-center font-medium py-1 px-3 rounded-xl shadow-sm transition duration-150 text-xs bg-red-400 hover:bg-red-500 text-white cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 flex flex-col items-center">
            <label
              htmlFor="menu-item-image-upload"
              className={`w-full h-60 bg-${
                t.inputBg
              } bg-opacity-50 rounded-lg flex items-center justify-center border-2 border-dashed border-${
                t.border
              } transition-colors duration-200 ${
                isUploading
                  ? "cursor-not-allowed opacity-50"
                  : `cursor-pointer hover:bg-${t.hover}`
              }`}
            >
              <div className="max-w-xs w-full">
                <span
                  className={`block w-full text-${t.label} text-xs font-medium text-center px-4 whitespace-nowrap overflow-hidden text-ellipsis`}
                >
                  {image ? image.name : "+ Select Image"}
                </span>
              </div>
            </label>
            <input
              id="menu-item-image-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              disabled={isUploading}
              onChange={handleImage}
            />
            <button
              type="button"
              onClick={imageSubmit}
              disabled={!image || isUploading}
              className="mt-4 w-28 text-center font-medium py-1 px-3 rounded-xl shadow-sm transition duration-150 text-xs bg-orange-400 hover:bg-orange-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
        <span className="flex flex-col items-center">
          <button
            disabled={isUploading}
            type="submit"
            className="w-1/2 mb-3 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            Submit
          </button>
        </span>
      </form>
    </div>
  );
};

export default MenuForm;
