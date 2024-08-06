"use client";

import { Bell, Menu, Moon, SettingsIcon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/providers/StoreProvider";
import { setIsDartMode, setIsSidebarCollapsed } from "@/app/lib/state";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <div className="mb-7 flex w-full items-center justify-between">
      {/* Left side */}
      <div className="flex items-center justify-between gap-5">
        <button
          className="rounded-full bg-gray-100 px-3 py-3 transition hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="search products.."
            className="w-56 rounded-lg border-2 border-gray-300 bg-white py-2 pl-10 pr-4 transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none md:w-72"
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>

        {/* Right side */}
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="hidden items-center justify-between gap-5 md:flex">
          <div>
            <button onClick={() => dispatch(setIsDartMode())}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>

          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full bg-red-400 px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100">
              3
            </span>
          </div>

          <hr className="mx-3 h-7 w-0 border border-l border-solid border-gray-300" />
          <div className="flex cursor-pointer items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={
                  "https://s3-inventory-management-nextjs.s3.us-east-2.amazonaws.com/profile.jpg"
                }
                className="rounded-full object-cover"
                alt="avatar"
                fill
              />
            </div>

            <span className="font-semibold">George Change</span>
          </div>
        </div>
        <Link href={"/settings"}>
          <SettingsIcon className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
}
