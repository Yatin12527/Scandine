"use client";
import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { themes } from "../data/themes";

interface MenuItem {
  id: number;
  value: string;
  description: string;
  price: string;
}

interface SectionData {
  sectionTitle: string;
  items: MenuItem[];
  image?: string[];
}

interface MenuFormProps {
  sectionData: SectionData;
  imgUrls: string[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
  images: File[];
  sectionId: number;
  setIspreview: React.Dispatch<React.SetStateAction<boolean>>;
  setSections: React.Dispatch<React.SetStateAction<SectionData[]>>;
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
  currentTheme: string;
}

const MenuFormClassicBlack: React.FC<MenuFormProps> = ({
  sectionData,
  imgUrls,
  setImgUrls,
  sectionId,
  setIspreview,
  setSections,
  nextId,
  setNextId,
  currentTheme,
}) => {
  const t = themes[currentTheme];
  const [isUploading, setIsUploading] = useState(false);
  const [imageSlots, setImageSlots] = useState<number[]>(() => {
    // Initialize slots based on existing images
    return imgUrls.length > 0
      ? Array.from({ length: imgUrls.length }, (_, i) => i)
      : [];
  });
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);

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

  const handleImageForSlot = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slotIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadingSlot(slotIndex);
    try {
      const compressedFile = await imageCompression(file, {
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

      const uploadedUrl = response.data.url;
      const newImgUrls = [...imgUrls];
      newImgUrls[slotIndex] = uploadedUrl;

      setImgUrls(newImgUrls);
      setSections((prevSections) => {
        const newSections = JSON.parse(JSON.stringify(prevSections));
        const sectionToUpdate = newSections[0];
        sectionToUpdate.image = newImgUrls;
        return newSections;
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setUploadingSlot(null);
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

  const addImageSlot = () => {
    if (imageSlots.length < 3) {
      setImageSlots([...imageSlots, imageSlots.length]);
    }
  };

  const removeImageSlot = (slotIndex: number) => {
    const newImgUrls = imgUrls.filter((_, i) => i !== slotIndex);
    const newSlots = imageSlots.filter((_, i) => i !== slotIndex);

    setImgUrls(newImgUrls);
    setImageSlots(newSlots);
    setSections((prevSections) => {
      const newSections = JSON.parse(JSON.stringify(prevSections));
      const sectionToUpdate = newSections[0];
      sectionToUpdate.image = newImgUrls;
      return newSections;
    });
  };

  return (
    <div className="w-full p-2 sm:p-4">
      <form
        className={`bg-${t.bg} rounded-2xl shadow-xl border border-${t.border} overflow-hidden`}
        onSubmit={handleFinalSubmit}
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${t.header} px-4 sm:px-8 py-4 sm:py-6`}
        >
          <input
            className={`w-full text-base sm:text-lg md:text-xl font-semibold rounded-xl p-2 sm:p-3 border-2 border-white text-white bg-transparent placeholder-white ${t.headerFocus} transition disabled:bg-gray-300 disabled:cursor-not-allowed`}
            placeholder="Section Title"
            value={sectionData.sectionTitle}
            onChange={(e) =>
              handleItemChange(undefined, "Section Title", e.target.value)
            }
            required
          />
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Items Grid - Horizontal Scaling */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {sectionData.items.map((data) => (
              <div
                key={data.id}
                className={`bg-${t.inputBg} border border-${t.border} rounded-xl p-4 sm:p-5 space-y-3 hover:shadow-md transition-shadow`}
              >
                <div className="space-y-2">
                  <label
                    className={`block text-xs sm:text-sm font-medium text-${t.label}`}
                  >
                    Item
                  </label>
                  <input
                    className={`w-full px-3 py-2 bg-${t.bg} border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${t.accent}-500 focus:border-transparent transition-all text-${t.text} placeholder-gray-500 text-sm disabled:bg-gray-200 disabled:cursor-not-allowed`}
                    placeholder="Item name"
                    value={data.value}
                    onChange={(e) =>
                      handleItemChange(data.id, "value", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className={`block text-xs sm:text-sm font-medium text-${t.label}`}
                  >
                    Description
                  </label>
                  <input
                    className={`w-full px-3 py-2 bg-${t.bg} border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${t.accent}-500 focus:border-transparent transition-all text-${t.text} placeholder-gray-500 text-sm disabled:bg-gray-200 disabled:cursor-not-allowed`}
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) =>
                      handleItemChange(data.id, "description", e.target.value)
                    }
                  />
                </div>

                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <label
                      className={`block text-xs sm:text-sm font-medium text-${t.label}`}
                    >
                      Price
                    </label>
                    <input
                      className={`w-full px-3 py-2 bg-${t.bg} border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${t.accent}-500 focus:border-transparent transition-all text-${t.text} placeholder-gray-500 text-sm disabled:bg-gray-200 disabled:cursor-not-allowed`}
                      placeholder="₹0.00"
                      value={data.price}
                      onChange={(e) =>
                        handleItemChange(data.id, "price", e.target.value)
                      }
                    />
                  </div>
                  {sectionData.items.length > 1 && (
                    <button
                      type="button"
                      className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => deleteItem(data.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Item Button */}
          <button
            type="button"
            className={`w-full mb-8 flex items-center justify-center gap-2 px-4 py-3 bg-${t.accent}-600 hover:bg-${t.accent}-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none`}
            onClick={addItem}
          >
            <Plus size={20} />
            Add New Item
          </button>

          {/* Images Section */}
          <div className={`border-t border-${t.border} pt-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-base sm:text-lg font-semibold text-${t.label}`}
              >
                Images ({imageSlots.length}/3)
              </h3>
              {imageSlots.length < 3 && (
                <button
                  type="button"
                  onClick={addImageSlot}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-${t.accent}-600 hover:bg-${t.accent}-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer`}
                >
                  <Plus size={16} />
                  Add Image
                </button>
              )}
            </div>

            {/* Image Slots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageSlots.map((slot, index) => (
                <div key={slot} className="relative group">
                  <label
                    htmlFor={`image-upload-${index}`}
                    className={`block w-full h-48 sm:h-56 bg-${
                      t.inputBg
                    } bg-opacity-50 rounded-xl flex items-center justify-center border-2 border-dashed border-${
                      t.border
                    } transition-all overflow-hidden ${
                      isUploading && uploadingSlot === index
                        ? "cursor-not-allowed opacity-75"
                        : `cursor-pointer hover:bg-${t.hover}`
                    }`}
                  >
                    {uploadingSlot === index ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-emerald-600 mx-auto mb-3"></div>
                        <span className={`text-sm font-medium text-${t.label}`}>
                          Uploading...
                        </span>
                      </div>
                    ) : imgUrls[index] ? (
                      <img
                        src={imgUrls[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <svg
                          className={`mx-auto w-8 h-8 text-${t.label} mb-2`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className={`text-sm text-${t.label}`}>
                          Click to upload
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    id={`image-upload-${index}`}
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={(e) => handleImageForSlot(e, index)}
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeImageSlot(index)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center px-4 sm:px-6 pb-6">
          <button
            disabled={isUploading}
            type="submit"
            className={`w-full sm:w-2/3 lg:w-1/2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuFormClassicBlack;
