"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

import { languagesDetails } from "../../../app/assets/data/navData/navData";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import setLanguageAction from "@/lib/db/api/i18n/setLanguageAction";
import { useAppSelector } from "@/store/hooks";

const NavbarLanguages = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const languageArr = Object.values(languagesDetails);
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.values(languagesDetails)[4]
  );

  useEffect(() => {
    const selectedLanguageId = Cookies.get("language");
    if (selectedLanguageId) {
      const selectedLanguage = languageArr.find(
        (language) => language.id === selectedLanguageId
      );
      setSelectedLanguage(selectedLanguage);
    }
  }, [languageArr]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} rounded-full p-[5px] sm:p-[10px]`}
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
              key={language.id}
              className={`${globalStyleObj.flexStart} cursor-pointer gap-4`}
              onSelect={() => {
                setSelectedLanguage(language);
                setLanguageAction(language.id);
              }}
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
