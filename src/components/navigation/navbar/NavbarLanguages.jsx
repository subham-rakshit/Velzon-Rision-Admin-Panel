"use client";
import React, { useState } from "react";

import { Dropdown } from "flowbite-react";
import Image from "next/image";

import { languagesDetails } from "../../../app/assets/navData/navData";

const NavbarLanguages = () => {
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
          className={`nav-icons-hover rounded-full p-[10px] transition-all duration-300 ease-in-out`}
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
      className={`background-light900_dark200 border-none p-0`}
    >
      {languageArr.map((language) => {
        return (
          <Dropdown.Item
            key={language.label}
            className={`flex items-center gap-4 ${selectedLanguage === language.label ? "background-light800_dark100" : ""}`}
            onClick={() => setSelectedLanguage(language)}
          >
            <Image
              src={language.flag}
              alt={language.label}
              width={15}
              height={15}
              className="rounded-[3px]"
            />
            <span className={`h4-light500_dark550 pr-8`}>{language.label}</span>
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default NavbarLanguages;
