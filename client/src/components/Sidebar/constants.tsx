import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  SlidersHorizontal,
  User,
} from "lucide-react";

export const sidebarLinks: { href: string; icon: LucideIcon; label: string }[] =
  [
    {
      href: "/dashboard",
      icon: Layout,
      label: "Dashboard",
    },
    {
      href: "/inventory",
      icon: Archive,
      label: "Inventory",
    },
    {
      href: "/products",
      icon: Clipboard,
      label: "Products",
    },
    {
      href: "/users",
      icon: User,
      label: "Users",
    },
    {
      href: "/settings",
      icon: SlidersHorizontal,
      label: "Settings",
    },
    {
      href: "/expenses",
      icon: CircleDollarSign,
      label: "Expenses",
    },
  ];
