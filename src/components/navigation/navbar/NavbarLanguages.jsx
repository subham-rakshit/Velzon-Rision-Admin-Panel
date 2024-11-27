"use client";
import Image from "next/image";
import React, { useState } from "react";

import { languagesDetails } from "../../../app/assets/navData/navData";

import { globalStyleObj } from "@/app/assets/styles";
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
      <DropdownMenuTrigger
        className={`rounded-full p-[5px] hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100 sm:p-[10px]`}
      >
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
        className={`${globalStyleObj.backgroundLight900Dark200} w-screen border-none sm:w-fit`}
      >
        {languageArr.map((language) => {
          return (
            <DropdownMenuItem
              key={language.label}
              className={`${globalStyleObj.flexStart} cursor-pointer gap-4`}
              onSelect={() => setSelectedLanguage(language)}
            >
              <Image
                src={language.flag}
                alt={language.label}
                width={15}
                height={15}
                className="rounded-[3px]"
              />
              <span className={`${globalStyleObj.text13Light550Dark550} pr-8`}>
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
