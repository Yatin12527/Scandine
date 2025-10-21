"use client";
import { asyncPutApi } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast, Bounce } from "react-toastify";
import PhoneSelector from "./ui/phoneSelector";


const Profile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [changes, setChanges] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [img, setImg] = useState<string>();
  const [tempImg, setTempImg] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [accountData, setAccountData] = useState({
    name: "",
    username: "",
    picture: "",
    lastName: "",
    businessName: "",
    role: "",
    phone: "",
    about: "",
  });

  useEffect(() => {
    if (auth && Object.keys(auth).length > 0) {
      setAccountData({
        name: auth.name || "",
        username: auth.username || "",
        picture: auth.picture || "",
        lastName: auth.lastName || "",
        businessName: auth.businessName || "",
        role: auth.role || "",
        phone:
          typeof auth.phone === "string" ? auth.phone.split(" ")[1] || "" : "",
        about: auth.about || "",
      });
    }
  }, [auth]);

  const handleInputChange = (fieldName, value) => {
    setAccountData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        asyncPutApi({
          name: accountData.name,
          username: accountData.username,
          picture: img,
          lastName: accountData.lastName,
          businessName: accountData.businessName,
          role: accountData.role,
          phone: countryCode + " " + accountData.phone,
          about: accountData.about,
        })
      ).unwrap();
      setChanges(false);
      setTempImg(null);

      toast.success("Changes saved", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleImage = async (file: File) => {
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      });
      setTempImg(URL.createObjectURL(compressedFile));
      const formData = new FormData();
      formData.append("file", compressedFile);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImg(response.data.url);
      setChanges(true);
      toast.success("Image uploaded successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      </div>
      <h2 className="text-xl font-bold text-gray-600 mb-2">Account details</h2>
      <ToastContainer />
      <div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mt-4"
          onSubmit={handleSubmit}
        >
          {/* Profile Picture */}
          <div className="relative w-max flex flex-col col-span-1 md:col-span-2">
            {auth.picture || tempImg ? (
              <img
                src={tempImg || auth.picture}
                alt="Profile picture"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300" />
            )}

            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImage(file);
                }
              }}
            />

            <div
              onClick={() => document.getElementById("profilePic")?.click()}
              className="absolute bottom-0 right-0 bg-orange-500 p-2 text-white border-[#fffcf4] border-3 rounded-full cursor-pointer"
            >
              <FaPencil />
            </div>
          </div>

          {/* First Name */}
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              name="name"
              placeholder="First Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={accountData.name}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={accountData.lastName}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="username"
              placeholder="Email"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={accountData.username}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={accountData.name + " " + accountData.lastName}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Business Name */}
          <div className="flex flex-col">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={accountData.businessName}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={accountData.role}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label>Phone Number</label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <PhoneSelector value={countryCode} onChange={setCountryCode} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="border border-gray-400 p-3 rounded-lg mt-1 flex-1"
                value={accountData.phone}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label>Tell us about yourself</label>
            <textarea
              name="about"
              placeholder="Tell us about yourself"
              className="border border-gray-400 p-3 rounded-lg mt-1 resize-none h-24"
              value={accountData.about}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={!changes}
            className={`w-fit mb-20 sm:mb-0 px-4 py-2 rounded-lg text-white duration-150 transition-all
      ${
        changes && !auth.loading
          ? "bg-orange-400 cursor-pointer hover:bg-amber-600"
          : "bg-orange-300 cursor-not-allowed"
      }`}
          >
            {auth.loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
