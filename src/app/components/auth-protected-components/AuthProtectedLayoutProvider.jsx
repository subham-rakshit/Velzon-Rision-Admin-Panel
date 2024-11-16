"use client";

import React from "react";
import {
  Footer,
  LeftSidebar,
  LeftTwoColumnSidebar,
  Navbar,
  RightSidebar,
} from "..";
import { useAppSelector } from "@/lib/store/hooks";

const AuthProtectedLayoutProvider = ({ children }) => {
  const { layoutType, leftSidbarSizeType } = useAppSelector(
    (state) => state.layout
  );

  const isSidebarCollapse = leftSidbarSizeType === "small-icon-view";
  const leftMargin =
    leftSidbarSizeType === "small-icon-view" ? "ml-0" : "ml-[250px]";
  const leftSidebarWidth =
    leftSidbarSizeType === "small-icon-view" ? "w-fit" : "w-[250px]";

  // Horizontal Leyout
  const handleHorizontalLayout = () => {
    return (
      <div>
        <Navbar />
        <LeftSidebar />
        {children}
        <Footer />
      </div>
    );
  };

  // Two Column Layout
  const handleTwoColumnLayout = () => {
    return (
      <>
        <LeftTwoColumnSidebar />
        <div className={`flex-grow min-h-screen flex flex-col`}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </>
    );
  };

  // Vertical Layout
  const handleVerticalLayout = () => {
    return (
      <>
        <LeftSidebar
          width={leftSidebarWidth}
          isSidebarCollapse={isSidebarCollapse}
        />
        <div className={`flex-grow min-h-screen flex flex-col ${leftMargin}`}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </>
    );
  };

  return (
    <div
      className={`flex ${
        layoutType === "horizontal" ? "flex-col" : ""
      } w-full min-h-screen`}
    >
      {layoutType === "horizontal"
        ? handleHorizontalLayout()
        : layoutType === "two-column"
        ? handleTwoColumnLayout()
        : layoutType === "vertical"
        ? handleVerticalLayout()
        : null}
      <RightSidebar />
    </div>
  );
};

export default AuthProtectedLayoutProvider;

//TODO: Create Semi Box Layout
