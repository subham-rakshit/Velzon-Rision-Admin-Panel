"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MdOutlineArrowForward,
  MdSearch,
  MdOutlineBubbleChart,
} from "react-icons/md";
import { RiLifebuoyLine, RiUserSettingsLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const pagesContent = [
  {
    id: "pages_ana_dash_1",
    icon: <MdOutlineBubbleChart size={18} />,
    text: "Analytics Dashboard",
  },
  {
    id: "pages_ana_dash_2",
    icon: <RiLifebuoyLine size={18} />,
    text: "Help Center",
  },
  {
    id: "pages_ana_dash_3",
    icon: <RiUserSettingsLine size={18} />,
    text: "My account settings",
  },
];

const membersContent = [
  {
    id: "members_1",
    userAvater: "/assets/userAvatarsImg/avatar-2.jpg",
    name: "Angela Bernier",
    designation: "Manager",
  },
  {
    id: "members_2",
    userAvater: "/assets/userAvatarsImg/avatar-3.jpg",
    name: "David Grasso",
    designation: "Web Designer",
  },
  {
    id: "members_3",
    userAvater: "/assets/userAvatarsImg/avatar-5.jpg",
    name: "Mike Bunch",
    designation: "React Developer",
  },
];

const NavSearchBoxRecentSearches = ({
  isRecentSearchOpen,
  setIsRecentSearchOpen,
}) => {
  return (
    <motion.div
      initial={{ y: "20px", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="bg-white rounded-[3px] h-[385px] min-w-[320px] absolute top-full left-0 mt-[1px] shadow-light flex flex-col pt-4"
    >
      {/* NOTE Scrollable Content */}
      <div className="h-full overflow-y-auto custom-scrollbar">
        <h3 className="text-[13px] tracking-wide uppercase font-poppins-md font-[500] px-5">
          Recent Searches
        </h3>
        {/* Buttons */}
        <div className="text-[11px] flex items-center gap-2 mt-2 text-[#568df3] font-poppins-rg font-[500] px-5">
          <Link href="/">
            <button className="flex items-center gap-1 bg-[#e1ebfd] hover:bg-[#568df3] hover:text-white px-3 py-2 rounded-full">
              how to setup
              <MdSearch />
            </button>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-1 bg-[#e1ebfd] hover:bg-[#568df3] hover:text-white px-3 py-2 rounded-full">
              buttons
              <MdSearch />
            </button>
          </Link>
        </div>

        {/* Pages */}
        <h3 className="text-[13px] tracking-wide uppercase font-poppins-md mt-5 font-[500] px-5">
          Pages
        </h3>
        <ul className="mt-2">
          {pagesContent.map((content) => (
            <li
              key={content.id}
              onClick={() => setIsRecentSearchOpen(false)}
              className="flex items-center gap-2 hover:bg-[#EFF2F7] py-3 px-5 cursor-pointer"
            >
              <span>{content.icon}</span>
              <span className="text-[13px] text-dark">{content.text}</span>
            </li>
          ))}
        </ul>

        {/* Members */}
        <h3 className="text-[13px] tracking-wide uppercase font-poppins-md mt-5 font-[500] px-5">
          Members
        </h3>
        <ul className="mt-2">
          {membersContent.map((member) => (
            <li
              key={member.id}
              onClick={() => setIsRecentSearchOpen(false)}
              className="flex items-center gap-4 py-3 px-5 cursor-pointer hover:bg-[#EFF2F7]"
            >
              <Image
                src={member.userAvater}
                alt={member.name}
                width={35}
                height={35}
                className="rounded-full"
              />
              <span className="flex flex-col gap-1 text-[13px] font-poppins-md text-dark">
                <span>{member.name}</span>
                <span className="text-[11px] font-poppins-rg text-soft">
                  {member.designation}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* TODO Need To Work ON Redirection */}
      <div className="w-full py-3 mt-auto">
        <button
          type="button"
          className="bg-[#405189] hover:bg-[#3c4c80] text-white text-[11px] flex items-center gap-1 px-3 py-2 rounded-[3px] mx-auto"
        >
          View All Results
          <MdOutlineArrowForward />
        </button>
      </div>
    </motion.div>
  );
};

export default NavSearchBoxRecentSearches;
