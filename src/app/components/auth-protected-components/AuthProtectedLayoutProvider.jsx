"use client";

import React from "react";
import {
  Footer,
  LeftSidebar,
  LeftTwoColumnSidebar,
  LeftHorizontalSidebar,
  Navbar,
  RightSidebar,
} from "..";
import { useAppSelector } from "@/lib/store/hooks";

const AuthProtectedLayoutProvider = ({ children }) => {
  const { layoutType, leftSidbarSizeType, topbarColorType } = useAppSelector(
    (state) => state.layout
  );

  const isSidebarCollapse = leftSidbarSizeType === "small-icon-view";
  const leftMargin =
    leftSidbarSizeType === "small-icon-view" ? "ml-0" : "ml-[250px]";
  const leftSidebarWidth =
    leftSidbarSizeType === "small-icon-view" ? "w-fit" : "w-[250px]";

  return (
    <div
      className={`flex ${
        layoutType === "horizontal" ? "flex-col" : ""
      } w-full min-h-screen`}
    >
      {layoutType === "vertical" || layoutType === "semi-box" ? (
        <LeftSidebar
          width={leftSidebarWidth}
          isSidebarCollapse={isSidebarCollapse}
        />
      ) : layoutType === "two-column" ? (
        <LeftTwoColumnSidebar
          width={leftSidebarWidth}
          isSidebarCollapse={isSidebarCollapse}
        />
      ) : null}

      <div
        className={`flex-grow min-h-screen flex flex-col ${
          layoutType === "vertical" || layoutType === "semi-box"
            ? leftMargin
            : ""
        }`}
      >
        <Navbar topbarColorType={topbarColorType} />
        {layoutType === "horizontal" && <LeftHorizontalSidebar />}
        {children}
        <Footer />
      </div>
      <RightSidebar />
    </div>
  );
};

export default AuthProtectedLayoutProvider;

//TODO: Create Semi Box Layout
