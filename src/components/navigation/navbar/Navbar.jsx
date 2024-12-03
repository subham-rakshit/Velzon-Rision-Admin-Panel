import React from "react";

import {
  NavbarLanguages,
  NavbarMyCart,
  NavbarNotification,
  NavbarSearchSmallDevice,
  NavbarThemeSwitcher,
  NavbarWebApps,
  NavFullScreenToggleButton,
  NavLogo,
  NavProfile,
  NavSearchBox,
  ToggleButton,
} from "../..";

import {
  layout,
  layoutThemePrimaryColor,
  position,
  sidebarVisibility,
  topbarColor,
  widthType,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";

const Navbar = ({
  layoutType,
  layoutPositionType,
  topbarColorType,
  layoutThemePrimaryColorType,
  layoutWidthType,
  leftSidebarVisibilityType,
}) => {
  let bgColor;

  switch (layoutThemePrimaryColorType) {
    case layoutThemePrimaryColor.TEAL_GREEN:
      bgColor = "bg-[#066b5e]";
      break;
    case layoutThemePrimaryColor.ROYAL_PURPLE:
      bgColor = "bg-[#5147A3]";
      break;
    case layoutThemePrimaryColor.COBALT_BLUE:
      bgColor = "bg-[#2a5fc1]";
      break;
    default:
      bgColor = "bg-[#405189]";
      break;
  }

  return (
    <nav
      className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.backgroundLight900Dark200}` : `${bgColor}`} ${globalStyleObj.flexBetween} ${layoutType === layout.HORIZONTAL ? "px-5 md:px-10 lg:px-[50px]" : layoutType === layout.SEMI_BOX ? "rounded-sm px-5" : "px-5"} ${layoutPositionType === position.FIXED ? "sticky" : window.innerWidth < 768 ? "sticky" : ""} top-0 h-[70px] shadow-light`}
    >
      <div
        className={`${globalStyleObj.flexBetween} ${layoutWidthType === widthType.BOXED ? `mx-auto w-full max-w-[1300px]` : `w-full`} h-full`}
      >
        <div className={`${globalStyleObj.flexStart} h-full gap-2 md:gap-5`}>
          {layoutType === layout.HORIZONTAL ? (
            <NavLogo topbarColorType={topbarColorType} />
          ) : layoutType === layout.SEMI_BOX &&
            leftSidebarVisibilityType === sidebarVisibility.HIDDEN ? (
            <NavLogo topbarColorType={topbarColorType} />
          ) : null}

          <ToggleButton />
          <NavSearchBox />
        </div>

        <div
          className={`${globalStyleObj.flexStart} h-full gap-2 sm:gap-0 lg:gap-2`}
        >
          <NavbarSearchSmallDevice />

          <NavbarLanguages />

          <NavbarWebApps />

          <NavbarMyCart />

          <NavFullScreenToggleButton />

          <NavbarThemeSwitcher />

          <NavbarNotification />

          <NavProfile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
