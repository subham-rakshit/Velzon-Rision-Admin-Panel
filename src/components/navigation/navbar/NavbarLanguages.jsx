"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { languagesDetails } from "../../../app/assets/navData/navData";

const NavbarLanguages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.values(languagesDetails)[0]
  );
  const languageArr = Object.values(languagesDetails);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[5px] sm:p-[10px] rounded-full hover:background-light400_dark100">
        <Image
          src={selectedLanguage.flag}
          alt={selectedLanguage.label}
          width={18}
          height={18}
          className="rounded-[3px]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="background-light900_dark200 w-screen sm:w-fit border-none">
        {languageArr.map((language) => {
          return (
            <DropdownMenuItem
              key={language.label}
              className={`flex-start gap-4 cursor-pointer`}
              onSelect={() => setSelectedLanguage(language)}
            >
              <Image
                src={language.flag}
                alt={language.label}
                width={15}
                height={15}
                className="rounded-[3px]"
              />
              <span className={`h4-light500_dark550 pr-8`}>
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
