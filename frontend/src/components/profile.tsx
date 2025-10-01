"use client";
import { asyncGetApi, asyncPutApi } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { FaPencil } from "react-icons/fa6";
import Image from "next/image";

const Profile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [changes, setChanges] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
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
    dispatch(asyncGetApi());
  }, [dispatch]);

  useEffect(() => {
    if (auth && Object.keys(auth).length > 0) {
      setFormData({
        name: auth.name || "",
        username: auth.username || "",
        picture: auth.picture || "",
        lastName: auth.lastName || "",
        businessName: auth.businessName || "",
        role: auth.role || "",
        phone: auth.phone || "",
        about: auth.about || "",
      });
    }
  }, [auth]);

  console.log(auth);

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      asyncPutApi({
        name: formData.name,
        username: formData.username,
        picture: formData.picture,
        lastName: formData.lastName,
        businessName: formData.businessName,
        role: formData.role,
        phone: formData.phone,
        about: formData.about,
      })
    );
  };
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      </div>
      <h2 className="text-xl font-bold text-gray-600 mb-2">Account details</h2>
      <div className="relative w-max">
        {auth.picture ? (
          <Image
            src={auth.picture}
            alt="Profile picture"
            width={95}
            height={95}
            className="rounded-full"
          />
        ) : (
          <div className="w-[95px] h-[95px] rounded-full bg-gray-300" />
        )}

        <div className="absolute bottom-0 right-0 bg-orange-500 p-2 text-white border-[#fffcf4] border-3 rounded-full cursor-pointer">
          <FaPencil />
        </div>
      </div>
      <div>
        <form
          className="grid grid-cols-2 gap-x-8 gap-y-4 mt-4"
          onSubmit={handleSubmit}
        >
          {/* First & Last Name */}
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              name="name"
              placeholder="First Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={formData.name}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={formData.lastName}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Email & Full Name */}
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="username"
              placeholder="Email"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={formData.username}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={formData.name + " " + formData.lastName}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Business Name & Role */}
          <div className="flex flex-col">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={formData.businessName}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={formData.role}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Phone Number - full width */}
          <div className="flex flex-col col-span-2">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={formData.phone}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Tell us about yourself - full width */}
          <div className="flex flex-col col-span-2">
            <label>Tell us about yourself</label>
            <textarea
              name="about"
              placeholder="Tell us about yourself"
              className="border border-gray-400 p-3 rounded-lg mt-1 resize-none h-24"
              value={formData.about}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={!changes}
            className={`w-fit px-4 py-2 rounded-lg text-white duration-150 transition-all
      ${
        changes
          ? "bg-orange-400 cursor-pointer hover:bg-amber-600"
          : "bg-orange-300 cursor-not-allowed"
      }`}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
