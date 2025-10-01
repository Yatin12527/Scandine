"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SignupFormInputs = {
  name: string;
  username: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const router = useRouter();
  const [showpass, setshowpass] = useState(false);

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/users/signup`,
        data
      );
      if (response.data.redirect) {
        router.push(response.data.redirect);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex  flex-col sm:flex-row h-screen bg-white text-black">
      <div className="hidden w-1/2 h-full sm:flex items-center justify-center bg-[#ffe4dc]">
        <img
          src="/eating.png"
          alt="Signup illustration"
          className=" 1024:max-w-7xl 1024:max-h-full h-auto object-contain"
        />
      </div>
      <div className="w-full sm:w-1/2 h-full flex flex-col items-center justify-center">
        <form
          className="flex flex-col w-full max-w-md px-6 rounded-lg  sm:bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-4xl font-bold text-center mb-10">Sign up</h1>

          {/* Name */}
          <label className="font-semibold mb-2">Name</label>
          <div className="flex items-center border-2 border-zinc-400 focus-within:border-[#e9b459] rounded-lg bg-white px-3 gap-x-3">
            <MdDriveFileRenameOutline />
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="flex-1 py-2 px-2 text-black bg-transparent outline-none"
              placeholder="Name"
            />
          </div>
          <span className="text-red-500 text-sm min-h-[1.25rem] block">
            {errors.name?.message || ""}
          </span>

          {/* Email */}
          <label className="font-semibold mb-2">Email</label>
          <div className="flex items-center border-2 border-zinc-400 focus-within:border-[#e9b459] rounded-lg bg-white px-3 gap-x-3">
            <MdEmail />
            <input
              id="email"
              {...register("username", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="flex-1 py-2 px-2 text-black bg-transparent outline-none"
              placeholder="Email"
            />
          </div>
          <span className="text-red-500 text-sm min-h-[1.25rem] block">
            {errors.username?.message || ""}
          </span>

          {/* Password */}
          <label className="font-semibold mb-2">Password</label>
          <div className="flex items-center border-2 border-zinc-400 focus-within:border-[#e9b459] rounded-lg bg-white px-3 gap-x-3">
            <FaEye
              className={`cursor-pointer ${showpass ? "block" : "hidden"}`}
              onClick={() => setshowpass((prev) => !prev)}
            />
            <FaEyeSlash
              className={`cursor-pointer ${showpass ? "hidden" : "block"}`}
              onClick={() => setshowpass((prev) => !prev)}
            />
            <input
              id="password"
              type={showpass ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="flex-1 py-2 px-2 text-black bg-transparent outline-none"
              placeholder="Password"
            />
          </div>
          <span className="text-red-500 text-sm min-h-[1.25rem] block">
            {errors.password?.message || ""}
          </span>

          <button
            type="submit"
            className="bg-[#ff7c7c] text-white rounded-lg px-4 py-2 font-semibold mt-2 cursor-pointer hover:bg-[#e05555]"
          >
            Sign Up
          </button>
        </form>

        <div className="flex flex-col items-center justify-center p-6 bg-white">
          {/* Divider with text */}
          <div className="flex items-center w-full max-w-md mb-6">
            <div className="flex-1 h-px bg-gray-500"></div>
            <span className="px-4 text-sm text-gray-600 font-medium">
              Or Continue With
            </span>
            <div className="flex-1 h-px bg-gray-500"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              className="flex-1 flex items-center justify-center gap-3 p-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm cursor-pointer"
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_SERVER}/users/google`)
              }
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              <span className="font-medium text-sm sm:hidden">
                Login with Google
              </span>
              <span className="font-medium text-sm hidden sm:inline">
                Google
              </span>
            </button>

            {/* <button
              className="flex-1 flex items-center justify-center gap-3 p-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm cursor-pointer"
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_SERVER}/users/google`)
              }
            >
              <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
              <span className="font-medium text-sm sm:hidden">
                Login with Facebook
              </span>
              <span className="font-medium text-sm hidden sm:inline">
                Facebook
              </span>
            </button> */}
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600 ">
              Already have an account?{" "}
            </span>
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
