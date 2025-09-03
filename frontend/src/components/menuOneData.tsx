"use client";
import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { HiPencilSquare } from "react-icons/hi2";

function Data({ sectionId }: { sectionId: number }) {
  const [sections, setSections] = useState([
    {
      sectionTitle: "",
      items: [
        {
          id: 0,
          value: "",
          description: "",
          price: "",
        },
      ],
      image: " ",
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPreview, setIspreview] = useState(false);

  useEffect(() => {
    const allSections = JSON.parse(localStorage.getItem("menuItems") || "{}");
    const current = allSections[sectionId];
    // check if data is already present or not
    if (current) {
      setSections([current]);
      setImgUrl(current?.image ?? "");
      setIspreview(true);

      let maxId = 0;
      current?.items?.forEach((item: any) => {
        if (item.id > maxId) maxId = item.id;
      });
      setNextId(maxId + 1);
    } else {
      setSections([
        {
          sectionTitle: "",
          items: [{ id: 0, value: "", description: "", price: "" }],
          image: " ",
        },
      ]);
      setImgUrl("");
      setIspreview(false);
      setNextId(1);
    }
  }, [sectionId]);

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
    console.log(sections);
  };

  const deleteItem = (idToDelete: number) => {
    setSections((prevSections) => [
      {
        ...prevSections[0],
        items: prevSections[0].items.filter((item) => item.id !== idToDelete),
      },
    ]);
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

  const handleFinalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allSections = JSON.parse(localStorage.getItem("menuItems") || "{}");
    allSections[sectionId] = sections[0];
    localStorage.setItem("menuItems", JSON.stringify(allSections));
    setIspreview(true);
  };

  return (
    <div>
      {isPreview ? (
        <div className="max-w-xl mx-auto sm:p-0 p-10">
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
              {sections[0].sectionTitle}
            </h2>

            <HiPencilSquare
              size={30}
              style={{ color: "#f97316" }}
              className="cursor-pointer mb-4 "
              onClick={() => setIspreview(false)}
            />
          </div>
          <div className="bg-gray-500 w-full h-0.5 mb-4" />
          <div className="space-y-2">
            {sections[0].items.map((data, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                    {data.value}
                  </h3>
                  <p className="text-xs text-gray-600 cursor-pointer  hover:text-green-600 leading-tight">
                    {data.description}
                  </p>
                </div>
                <span className="font-bold text-gray-800 cursor-pointer hover:text-green-600 text-sm whitespace-nowrap">
                  {data.price}
                </span>
              </div>
            ))}
          </div>
          {imgUrl && imgUrl.trim() !== "" && (
            <div className="w-full h-60 mt-4">
              <img
                src={imgUrl}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full sm:p-4">
          <form
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            onSubmit={handleFinalSubmit}
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 flex items-center gap-4">
              <input
                className="w-full text-base sm:text-lg md:text-xl font-semibold rounded-2xl p-2 sm:p-3 border-white border-2 text-white bg-transparent placeholder-white focus:bg-white focus:text-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                placeholder="Section Title"
                value={sections[0].sectionTitle}
                onChange={(e) =>
                  handleItemChange(undefined, "Section Title", e.target.value)
                }
                required={true}
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="group relative space-y-6">
                {sections[0].items.map((data, index) => (
                  <div key={data.id}>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                      <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Item
                        </label>
                        <input
                          className="w-full px-4 py-3 bg-gray-50 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                          placeholder="Enter item name"
                          value={data.value}
                          onChange={(e) =>
                            handleItemChange(data.id, "value", e.target.value)
                          }
                          required={true}
                        />
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <input
                          className="w-full px-4 py-3 bg-gray-50 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                          placeholder="Enter Description"
                          value={data.description}
                          onChange={(e) =>
                            handleItemChange(
                              data.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <input
                          className="w-full px-4 py-3 bg-gray-50 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                          placeholder="₹0.00"
                          value={data.price}
                          onChange={(e) =>
                            handleItemChange(data.id, "price", e.target.value)
                          }
                        />
                      </div>
                      {sections[0].items.length > 1 && (
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

                    {index < sections[0].items.length - 1 && (
                      <div className="border-b border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  onClick={addItem}
                >
                  <Plus size={20} />
                  Add New Item
                </button>
              </div>
            </div>

            {imgUrl ? (
              <div className="p-6 sm:p-8 flex flex-col items-center">
                <div className="w-full h-60 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 overflow-hidden">
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
                    sections[0].image = "";
                  }}
                  className="mt-4 w-28 text-center font-medium py-1 px-3 rounded-xl shadow-sm transition duration-150 text-xs bg-red-400 hover:bg-red-500 text-white cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8 flex flex-col items-center">
                <label
                  htmlFor="file-upload"
                  className={`w-full h-60 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 transition-colors duration-200 ${
                    isUploading
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-gray-200"
                  }`}
                >
                  <div className="max-w-xs w-full">
                    <span className="block w-full text-gray-700 text-xs font-medium text-center px-4 whitespace-nowrap overflow-hidden text-ellipsis">
                      {image ? image.name : "+ Select Image"}
                    </span>
                  </div>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
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
                className=" w-1/2 mb-3 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {" "}
                Submit{" "}
              </button>
            </span>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Total items:{" "}
              <span className="font-semibold text-gray-700">
                {sections[0].items.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Data;
