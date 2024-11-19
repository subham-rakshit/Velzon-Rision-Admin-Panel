"use client";

import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";

import { languagesDetails } from "../../../app/assets/navData/navData";

import { useAppSelector } from "@/lib/store/hooks";

const NavbarLanguages = () => {
  const { layoutModeType } = useAppSelector((state) => state.layout);
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.values(languagesDetails)[0]
  );
  const languageArr = Object.values(languagesDetails);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span
          className={`rounded-full p-[10px] transition-all duration-300 ease-in-out ${layoutModeType === "light" ? "nav-icons-hover-light" : "nav-icons-hover-dark"}`}
        >
          <Image
            src={selectedLanguage.flag}
            alt={selectedLanguage.label}
            width={18}
            height={18}
            className="rounded-[4px]"
          />
        </span>
      }
      size="sm"
      className={`${layoutModeType === "light" ? "nav-bg-light" : "nav-bg-dark"} border-none p-0`}
    >
      {languageArr.map((language) => {
        return (
          <Dropdown.Item
            key={language.label}
            className={`flex items-center gap-4  ${
              language.label === selectedLanguage.label
                ? `${layoutModeType === "light" ? "bg-light-800" : "bg-dark-100"}`
                : ``
            } hover:bg-transparent`}
            onClick={() => setSelectedLanguage(language)}
          >
            <Image
              src={language.flag}
              alt={language.label}
              width={15}
              height={15}
              className="rounded-[3px]"
            />
            <span
              className={`pr-8 ${layoutModeType === "light" ? "h4-dark-light-mode" : "h4-dark-dark-mode"}`}
            >
              {language.label}
            </span>
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default NavbarLanguages;
