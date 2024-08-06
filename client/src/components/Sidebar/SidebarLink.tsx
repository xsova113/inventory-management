import { cn } from "@/app/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

export default function SidebarLink({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinksProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={cn(
          "cursor-pointer flex items-center hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors",
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4",
          isActive && "bg-blue-200 text-white"
        )}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={cn(
            isCollapsed ? "hidden" : "block",
            "font-medium text-gray-700"
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}
