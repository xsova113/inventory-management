"use client";

import { setIsSidebarCollapsed } from "@/app/lib/state";
import { cn } from "@/app/lib/utils";
import { useAppDispatch, useAppSelector } from "@/providers/StoreProvider";
import { Layout, Menu } from "lucide-react";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { sidebarLinks } from "./constants";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = cn(
    "fixed flex flex-col bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40",
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  );

  return (
    <div className={sidebarClassNames}>
      {/* top logo */}
      <div
        className={cn(
          "flex gap-3 justify-between md:justify-normal items-center pt-8 pl-4 pr-8",
          isSidebarCollapsed ? "px-5" : "px-8"
        )}
      >
        <Image src={"https://s3-inventory-management-nextjs.s3.us-east-2.amazonaws.com/logo.png"} alt="logo" width={40} height={40} />
        <h1
          className={cn(
            "font-extrabold text-2xl",
            isSidebarCollapsed && "opacity-0 ransition-opacity duration-300"
          )}
        >
          GEOSTOCK
        </h1>

        <button
          onClick={toggleSidebar}
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition"
        >
          <Menu className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* links */}
      <div className="flex-grow mt-8">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            {...link}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* footer */}
      <div className={cn(isSidebarCollapsed ? "hidden" : "block", "mb-10")}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 GEOSTOCK
        </p>
      </div>
    </div>
  );
}
