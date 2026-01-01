import React from "react";
import { BsRocketTakeoff } from "react-icons/bs";
// import { FaRocket } from "react-icons/fa";
import NavItem from "../NavList/NavItem";

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavList = () => {
  const navList: NavItemType[] = [
    {
      id: 1,
      label: "On Your Data",
      link: "/",
      icon: <BsRocketTakeoff className="size-5" />,
    },
  ];

  return (
    <div className="mt-12">
      {navList.map((item) => (
        <NavItem
          key={item.id}
          link={item.link}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default NavList;
