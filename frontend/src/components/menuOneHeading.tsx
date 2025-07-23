"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { Loader } from "./ui/loader";

export default function HeadingOne() {
  const { handleSubmit: handleImageSubmit, register: registerImage } =
    useForm();
  const {
    handleSubmit: handleTextSubmit,
    register: registerText,
    formState: { errors },
    setValue,
  } = useForm();

  type Heading = {
    restaurantName?: string;
    logo?: string;
  };

  const [heading, setHeading] = useState<Heading>({});
  const [isEditing, setIsEditing] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRestaurantName = localStorage.getItem("Heading");
    const savedLogo = localStorage.getItem("Logo");

    if (savedRestaurantName || savedLogo) {
      setHeading({
        restaurantName: savedRestaurantName || undefined,
        logo: savedLogo || undefined,
      });
    }
    setIsHydrated(true);
  }, []);

  // Set form value when editing starts
  useEffect(() => {
    if (isEditing) {
      const savedRestaurantName = localStorage.getItem("Heading");
      if (savedRestaurantName) {
        setValue("restaurantName", savedRestaurantName);
      }
    }
  }, [isEditing, setValue]);

  const imgsubmit = async (data: any) => {
    try {
      setIsUploading(true);
      const file = data.logo[0];

      // Compress image if larger than 1MB
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressedFile);

      const response = await axios.post(
        "http://localhost:4000/api/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Store final image URL for persistence
      setHeading((prev) => ({ ...prev, logo: response.data.url }));
      localStorage.setItem("Logo", response.data.url);
      setImageSelected(false);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const textsubmit = (data: any) => {
    setHeading((prev) => ({
      ...prev,
      restaurantName: data.restaurantName,
    }));
    localStorage.setItem("Heading", data.restaurantName);
    setIsEditing(false);
  };
  if (!isHydrated)
    return (
      <div className="flex justify-center ">
        <Loader />
      </div>
    );
  return (
    <div className=" font-inter">
      <div>
        {isEditing && !heading.restaurantName ? (
          <div className="p-4 md:p-8">
            <div className="flex justify-center mb-8">
              <div className="w-full flex flex-col max-w-md bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <form onSubmit={handleImageSubmit(imgsubmit)}>
                  <label className="block mb-4">
                    <span className="text-gray-600 font-medium">
                      Upload your logo
                    </span>
                    <input
                      {...registerImage("logo")}
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={(e) =>
                        setImageSelected(
                          !!e.target.files && e.target.files.length > 0
                        )
                      }
                      className={`mt-2 w-full text-sm file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-green-100 file:text-green-700
    ${
      isUploading
        ? "file:bg-gray-200 file:text-gray-400 file:cursor-not-allowed"
        : "hover:file:bg-green-200 file:cursor-pointer"
    }
    disabled:cursor-not-allowed
  `}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`mb-4 w-28 text-center font-medium py-1 px-3 rounded-xl shadow-sm transition duration-150 text-xs ${
                      isUploading
                        ? "bg-orange-300 text-white cursor-not-allowed"
                        : "bg-orange-400 hover:bg-orange-500 text-white cursor-pointer"
                    }`}
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                </form>

                <form onSubmit={handleTextSubmit(textsubmit)}>
                  <label className="block">
                    <span className="text-gray-600 font-medium">
                      Restaurant name
                    </span>
                    <input
                      {...registerText("restaurantName", {
                        required: "Restaurant name is required",
                      })}
                      type="text"
                      placeholder="ScanDine outlet"
                      defaultValue={heading.restaurantName || ""}
                      className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-green-400 text-xl font-dancing font-bold"
                    />
                    <span className="text-red-500 text-sm min-h-[1.25rem] block">
                      {typeof errors.restaurantName?.message === "string"
                        ? errors.restaurantName.message
                        : ""}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isUploading || imageSelected}
                    className={`mt-2 px-4 py-2 w-full rounded-lg font-semibold transition duration-150 ${
                      isUploading || imageSelected
                        ? "bg-green-400 cursor-not-allowed text-white"
                        : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    }`}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mb-8 ">
            <div className="flex items-center justify-center mb-4 p-2">
              {(heading.logo || localStorage.getItem("Logo")) && (
                <img
                  src={
                    heading.logo ?? localStorage.getItem("Logo") ?? undefined
                  }
                  alt="Logo Preview"
                  className="h-20 w-20 object-contain mr-4 rounded-2xl border border-gray-300"
                />
              )}
              <h1 className="text-3xl md:text-5xl font-dancing text-gray-700 font-bold drop-shadow-lg">
                {heading.restaurantName || localStorage.getItem("Heading")}
              </h1>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("Heading");
                setHeading({});
                setIsEditing(true);
              }}
              className="cursor-pointer px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition duration-150"
            >
              Edit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
