"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { Loader } from "./ui/loader";
import { themes } from "./data/themes";

export default function HeadingOne({ theme }) {
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
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const t = themes[theme];
    const savedRestaurantName = localStorage.getItem("Heading");
    const savedLogo = localStorage.getItem("Logo");

    if (savedRestaurantName || savedLogo) {
      setHeading({
        restaurantName: savedRestaurantName || undefined,
        logo: savedLogo || undefined,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const imgsubmit = async (data) => {
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
        `${process.env.NEXT_PUBLIC_SERVER}/upload-image`,
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

  const textsubmit = (data) => {
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

  const shouldShowModal = isEditing;
  const t = themes[theme];

  return (
    <div className=" font-inter">
      <div>
        {shouldShowModal ? (
          <div className="p-4 md:p-8">
            <div className="flex justify-center mb-8">
              <div
                className={`w-full flex flex-col max-w-md bg-${t.bg} p-6 rounded-2xl shadow-lg border border-${t.border}`}
              >
                <form onSubmit={handleImageSubmit(imgsubmit)}>
                  <div className="flex flex-col  items-center sm:items-start">
                    <span className={`text-${t.label} font-medium ml-2`}>
                      Upload your logo
                    </span>

                    {heading.logo || localStorage.getItem("Logo") ? (
                      <div className="p-2 sm:p-4 flex flex-col items-center">
                        <div
                          className={`w-16 h-16 bg-${t.inputBg} bg-opacity-50 rounded-lg flex items-center justify-center border-2 border-dashed border-${t.border} overflow-hidden`}
                        >
                          <img
                            src={
                              heading.logo || localStorage.getItem("Logo") || ""
                            }
                            alt="Uploaded Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setHeading((prev) => ({ ...prev, logo: "" }));
                            setImage(null);
                            localStorage.removeItem("Logo");
                          }}
                          className="mt-4 w-28 text-center font-medium py-1 px-3 rounded-xl shadow-sm transition duration-150 text-xs bg-red-400 hover:bg-red-500 text-white cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="p-2 sm:p-4 flex flex-col items-center">
                        <label
                          htmlFor="logo-image-upload"
                          className={`w-16 h-16 bg-${
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
                            {image ? (
                              <img
                                src={URL.createObjectURL(image)}
                                alt="Selected Preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span
                                className={`block w-full text-${t.text} text-xs font-medium text-center px-4 whitespace-nowrap overflow-hidden text-ellipsis`}
                              >
                                +
                              </span>
                            )}
                          </div>
                        </label>

                        <input
                          {...registerImage("logo")}
                          id="logo-image-upload"
                          name="logo-image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          disabled={isUploading}
                          onChange={(e) => {
                            const hasFile =
                              !!e.target.files && e.target.files.length > 0;
                            setImageSelected(hasFile);
                            if (hasFile) {
                              handleImage(e);
                            }
                          }}
                        />

                        <button
                          type="button"
                          onClick={async () => {
                            if (!image) return;

                            try {
                              setIsUploading(true);

                              // Compress image if larger than 1MB
                              const compressedFile = await imageCompression(
                                image,
                                {
                                  maxSizeMB: 0.5,
                                  maxWidthOrHeight: 1280,
                                  useWebWorker: true,
                                }
                              );

                              const formData = new FormData();
                              formData.append("file", compressedFile);

                              const response = await axios.post(
                                `${process.env.NEXT_PUBLIC_SERVER}/upload-image`,
                                formData,
                                {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                }
                              );

                              // Store final image URL for persistence
                              setHeading((prev) => ({
                                ...prev,
                                logo: response.data.url,
                              }));
                              localStorage.setItem("Logo", response.data.url);
                              setImage(null);
                              setImageSelected(false);
                            } catch (error) {
                              console.error("Upload failed:", error);
                            } finally {
                              setIsUploading(false);
                            }
                          }}
                          disabled={!image || isUploading}
                          className="mt-4 w-28 text-center font-medium py-1 px-3 rounded-xl shadow-sm transition duration-150 text-xs bg-orange-400 hover:bg-orange-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {isUploading ? "Uploading..." : "Upload"}
                        </button>
                      </div>
                    )}
                  </div>
                </form>

                <form onSubmit={handleTextSubmit(textsubmit)}>
                  <label className="block">
                    <span className={`text-${t.label} font-medium`}>
                      Restaurant name
                    </span>
                    <input
                      {...registerText("restaurantName", {
                        required: "Restaurant name is required",
                      })}
                      type="text"
                      placeholder="ScanDine outlet"
                      defaultValue={
                        localStorage.getItem("Heading") ||
                        heading.restaurantName
                      }
                      className={`mt-2 w-full px-4 py-2 rounded-lg border border-${t.border} bg-${t.inputBg} text-${t.text}
                        focus:outline-none focus:ring-2 focus:ring-${t.accent}-400 text-xl font-dancing font-bold`}
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
                        ? `bg-${t.accent}-400 cursor-not-allowed text-white`
                        : `bg-${t.accent}-600 hover:bg-${t.accent}-700 text-white cursor-pointer`
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
                  className={`h-20 w-20 object-contain mr-4 rounded-2xl border border-${t.border}`}
                />
              )}
              <h1
                className={`text-3xl md:text-5xl font-dancing text-${t.text} font-bold drop-shadow-lg`}
              >
                {heading.restaurantName || localStorage.getItem("Heading")}
              </h1>
            </div>
            <button
              onClick={() => {
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
