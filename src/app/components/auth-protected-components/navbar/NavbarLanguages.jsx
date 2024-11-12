"use client";

import React from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { languagesDetails } from "../../../assets/navData/navData";
import Image from "next/image";

const NavbarLanguages = ({ selectedLanguage, setSelectedLanguage }) => {
  const languageArr = Object.values(languagesDetails);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-[10px] rounded-full hover:bg-[#E6EEFD] transition-all duration-300 ease-in-out">
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
    >
      {languageArr.map((language) => {
        return (
          <Dropdown.Item
            key={language.label}
            className={`flex items-center gap-4 ${
              language.label === selectedLanguage.label ? "bg-[#E6EEFD]" : ""
            }`}
            onClick={() => setSelectedLanguage(language)}
          >
            <Image
              src={language.flag}
              alt={language.label}
              width={15}
              height={15}
              className="rounded-[3px]"
            />
            <span className="text-drak pr-8">{language.label}</span>
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default NavbarLanguages;
