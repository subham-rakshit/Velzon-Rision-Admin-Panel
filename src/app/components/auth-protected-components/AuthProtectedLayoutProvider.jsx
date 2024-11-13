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
    leftSidbarSizeType === "small-icon-view" ? "ml-[63px]" : "ml-[250px]";
  const leftSidebarWidth =
    leftSidbarSizeType === "small-icon-view" ? "w-[63px]" : "w-[250px]";

  //TODO: Create Semi Box Layout

  // Vertical Layout
  const handleVerticalLayout = () => {
    return (
      <>
        <div className="flex w-full min-h-screen">
          <LeftSidebar
            width={leftSidebarWidth}
            isSidebarCollapse={isSidebarCollapse}
          />
          <div
            className={`flex-grow min-h-screen flex flex-col ${leftMargin} transition-style`}
          >
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
        {/* <RightSidebar /> */}
      </>
    );
  };

  // Horizontal Leyout
  const handleHorizontalLayout = () => {
    return (
      <>
        <div className="flex flex-col w-full bg-red-400">
          <Navbar />
          <LeftSidebar />
          {children}
          <Footer />
        </div>
        <RightSidebar />
      </>
    );
  };

  // Two Column Layout
  const handleTwoColumnLayout = () => {
    return (
      <>
        <div className="flex w-full bg-red-400">
          <LeftTwoColumnSidebar />
          <div className="flex-[4]">
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
        <RightSidebar />
      </>
    );
  };

  //INFO: Switch cases according to Layout Types
  switch (layoutType) {
    case "vertical":
      return handleVerticalLayout();
    case "horizontal":
      return handleHorizontalLayout();
    case "two-column":
      return handleTwoColumnLayout();
  }
};

export default AuthProtectedLayoutProvider;
