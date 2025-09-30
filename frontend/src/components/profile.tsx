"use client";
import { asyncGetApi } from "@/redux/authSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { FaPencil } from "react-icons/fa6";
import Image from "next/image";

const Profile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(asyncGetApi());
  }, [dispatch]);
  console.log(auth);
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
        <form className="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={auth.name || ""}
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
            />
          </div>

          {/* Email & Full Name */}
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 p-3 rounded-lg mt-1"
              value={auth.username||""}
            />
          </div>
          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
            />
          </div>

          {/* Business Name & Role */}
          <div className="flex flex-col">
            <label>Business Name</label>
            <input
              type="text"
              placeholder="Business Name"
              className="border border-gray-400 p-3 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label>Role</label>
            <input
              type="text"
              placeholder="Role"
              className="border border-gray-400 p-3 rounded-lg mt-1"
            />
          </div>

          {/* Phone Number - full width */}
          <div className="flex flex-col col-span-2">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-400 p-3 rounded-lg mt-1"
            />
          </div>

          {/* Tell us about yourself - full width */}
          <div className="flex flex-col col-span-2">
            <label>Tell us about yourself</label>
            <textarea
              placeholder="Tell us about yourself"
              className="border border-gray-400 p-3 rounded-lg mt-1 resize-none h-24"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
