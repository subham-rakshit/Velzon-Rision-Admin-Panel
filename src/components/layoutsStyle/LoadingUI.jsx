"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

import { layoutThemePrimaryColor } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/lib/store/hooks";

const LoadingUI = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  let colorHex;

  switch (layoutThemePrimaryColorType) {
    case layoutThemePrimaryColor.TEAL_GREEN:
      colorHex = "#066b5e";
      break;
    case layoutThemePrimaryColor.ROYAL_PURPLE:
      colorHex = "#5147A3";
      break;
    case layoutThemePrimaryColor.COBALT_BLUE:
      colorHex = "#2a5fc1";
      break;
    default:
      colorHex = "#405189";
      break;
  }
  return (
    <div
      className={`main-tranisiton page-transition-off ${globalStyleObj.backgroundLight900Dark200}`}
    >
      <ClipLoader size={36} color={colorHex} />
    </div>
  );
};

export default LoadingUI;
