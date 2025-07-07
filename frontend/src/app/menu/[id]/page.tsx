"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Menu() {
  const { handleSubmit, register } = useForm();
  type Heading = {
    restaurantName?: string;
    logo?: FileList;
  };
  const [heading, setHeading] = useState<Heading>({});
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const onsubmit = async (data: any) => {
    try {
      setHeading(data);

      const formData = new FormData();
      formData.append("file", data.logo[0]);
      console.log(formData)

      const response = await axios.post(
        "http://localhost:4000/api/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image upload success:", response.data);
      // If needed: store `response.data.url` to localStorage or DB
      setIsEditing(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-inter"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <div className="min-h-screen">
        {isEditing ? (
          <form className="p-4 md:p-8" onSubmit={handleSubmit(onsubmit)}>
            <div className="flex justify-center mb-8">
              <div className="w-full flex flex-col max-w-md bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                {/* File Upload */}
                <label className="block mb-4">
                  <span className="text-gray-600 font-medium">
                    Upload your logo
                  </span>
                  <input
                    {...register("logo")}
                    type="file"
                    accept="image/*"
                    className="mt-2 w-full text-sm file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-green-100 file:text-green-700
                      hover:file:bg-green-200"
                  />
                </label>

                {/* Text Input */}
                <label className="block">
                  <span className="text-gray-600 font-medium">
                    Restaurant name
                  </span>
                  <input
                    {...register("restaurantName")}
                    type="text"
                    placeholder="ScanDine outlet"
                    className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300
                      focus:outline-none focus:ring-2 focus:ring-green-400 text-xl font-dancing text-green-700 font-bold"
                  />
                </label>

                <button
                  type="submit"
                  className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold mt-4 cursor-pointer hover:bg-green-700 "
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {
                <img
                  src={
                    heading.logo?.[0]
                      ? URL.createObjectURL(heading.logo[0])
                      : ""
                  }
                  alt="Logo Preview"
                  className="h-16 w-16 object-contain mr-4 rounded-2xl border border-gray-300"
                />
              }
              <h1 className="text-4xl md:text-6xl font-dancing text-green-600 font-bold drop-shadow-lg">
                {heading.restaurantName}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
