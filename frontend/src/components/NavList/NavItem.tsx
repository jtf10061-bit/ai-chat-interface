"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";

interface NavItemProps {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ label, link, icon }) => {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={`flex p-4 items-center w-full hover:bg-gray-700 font-medium ${
        pathname === path.join("/", link)
          ? "bg-gray-700 border-l-4 border-r-gray-100"
          : ""
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

export default NavItem;
