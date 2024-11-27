"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MdOutlineArrowForward,
  MdSearch,
  MdOutlineBubbleChart,
} from "react-icons/md";
import { RiLifebuoyLine, RiUserSettingsLine } from "react-icons/ri";

import avarat2 from "../../../app/assets/images/users/avatar-2.jpg";
import avarat3 from "../../../app/assets/images/users/avatar-3.jpg";
import avarat5 from "../../../app/assets/images/users/avatar-5.jpg";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";

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
    userAvater: avarat2,
    name: "Angela Bernier",
    designation: "Manager",
  },
  {
    id: "members_2",
    userAvater: avarat3,
    name: "David Grasso",
    designation: "Web Designer",
  },
  {
    id: "members_3",
    userAvater: avarat5,
    name: "Mike Bunch",
    designation: "React Developer",
  },
];

const btnStyle = `${globalStyleObj.flexStart} gap-1 bg-custom-blue-100 dark:bg-custom-green-100 rounded-full px-3 py-1 hover:bg-custom-blue-500 dark:hover:bg-custom-blue-500 hover:text-white`;

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
      className={`${globalStyleObj.backgroundLight900Dark200} absolute left-0 top-full mt-px flex h-[385px] min-w-[320px] flex-col rounded-[3px] pt-4 shadow-light`}
    >
      {/* NOTE Scrollable Content */}
      <div className="custom-scrollbar h-full overflow-y-auto">
        <h3
          className={`${globalStyleObj.text13Light550Dark550} px-5 uppercase tracking-wide`}
        >
          Recent Searches
        </h3>
        {/* Buttons */}
        <div
          className={`${globalStyleObj.flexStart} mt-2 gap-2 px-5 font-poppins-rg text-[11px] text-[#568df3]`}
        >
          <Link href={ROUTES.DASHBOARD_ECOMMERCE}>
            <button className={btnStyle}>
              how to setup
              <MdSearch />
            </button>
          </Link>
          <Link href={ROUTES.DASHBOARD_ECOMMERCE}>
            <button className={btnStyle}>
              buttons
              <MdSearch />
            </button>
          </Link>
        </div>

        {/* Pages */}
        <h3 className="mt-5 px-5 font-poppins-md text-[13px] uppercase tracking-wide">
          Pages
        </h3>
        <ul className="mt-2">
          {pagesContent.map((content) => (
            <li
              key={content.id}
              onClick={() => setIsRecentSearchOpen(false)}
              className={`${globalStyleObj.flexStart} cursor-pointer gap-2 px-5 py-3 hover:bg-light-dencity-800 dark:hover:bg-dark-dencity-500`}
            >
              <span>{content.icon}</span>
              <span className={`${globalStyleObj.text13Light550Dark550}`}>
                {content.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Members */}
        <h3 className="mt-5 px-5 font-poppins-md text-[13px] uppercase tracking-wide">
          Members
        </h3>
        <ul className="mt-2">
          {membersContent.map((member) => (
            <li
              key={member.id}
              onClick={() => setIsRecentSearchOpen(false)}
              className={`${globalStyleObj.flexStart} cursor-pointer gap-2 px-5 py-3 hover:bg-light-dencity-800 dark:hover:bg-dark-dencity-500`}
            >
              <Image
                src={member.userAvater}
                alt={member.name}
                width={35}
                height={35}
                className="rounded-full"
              />
              <span className="text-dark flex flex-col gap-1 font-poppins-md text-[13px]">
                <span className={`${globalStyleObj.text13Light550Dark550}`}>
                  {member.name}
                </span>
                <span className={`${globalStyleObj.text11Light400}`}>
                  {member.designation}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* TODO Need To Work ON Redirection */}
      <div className="mt-auto w-full py-3">
        <button
          type="button"
          className={`mx-auto ${globalStyleObj.flexStart} gap-1 rounded-[3px] bg-[#405189] px-3 py-2 text-[11px] text-white hover:bg-[#3c4c80]`}
        >
          View All Results
          <MdOutlineArrowForward />
        </button>
      </div>
    </motion.div>
  );
};

export default NavSearchBoxRecentSearches;
