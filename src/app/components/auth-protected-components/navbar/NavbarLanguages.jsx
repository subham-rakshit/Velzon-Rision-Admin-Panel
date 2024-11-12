"use client";

import React from "react";
import { Avatar, Dropdown } from "flowbite-react";
import languagesDetails from "../../../assets/languagesData/languagesDetails";
import Image from "next/image";

const NavbarLanguages = ({ selectedLanguage, setSelectedLanguage }) => {
  const languageArr = Object.values(languagesDetails);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-[9px] rounded-full hover:bg-[#E6EEFD] transition-all duration-300 ease-in-out">
          <Image
            src={selectedLanguage.flag}
            alt={selectedLanguage.label}
            width={20}
            height={20}
            className="rounded-[4px]"
          />
        </span>
      }
    >
      {languageArr.map((language) => {
        return (
          <Dropdown.Item
            key={language.label}
            className={`flex items-center gap-3 ${
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
            <span className="text-drak">{language.label}</span>
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default NavbarLanguages;
