"use client";
import Image from "next/image";
import React, { useState } from "react";

import { languagesDetails } from "../../../app/assets/navData/navData";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarLanguages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.values(languagesDetails)[0]
  );
  const languageArr = Object.values(languagesDetails);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="hover:background-light400_dark100 rounded-full p-[5px] sm:p-[10px]">
        <Image
          src={selectedLanguage.flag}
          alt={selectedLanguage.label}
          width={18}
          height={18}
          className="rounded-[3px]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="background-light900_dark200 w-screen border-none sm:w-fit"
      >
        {languageArr.map((language) => {
          return (
            <DropdownMenuItem
              key={language.label}
              className={`flex-start cursor-pointer gap-4`}
              onSelect={() => setSelectedLanguage(language)}
            >
              <Image
                src={language.flag}
                alt={language.label}
                width={15}
                height={15}
                className="rounded-[3px]"
              />
              <span className={`text-13-light500_dark550 pr-8`}>
                {language.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarLanguages;
