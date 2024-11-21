"use client";

import NextTopLoader from "nextjs-toploader";
import React from "react";

import {
  LeftHorizontalSidebar,
  LeftSidebar,
  LeftTwoColumnSidebar,
  Navbar,
  RightSidebar,
  Footer,
  LoadingUI,
} from "..";

import { useAppSelector } from "@/lib/store/hooks";

const AuthProtectedLayoutProvider = ({ children }) => {
  const {
    layoutType,
    leftSidbarSizeType,
    topbarColorType,
    preloader,
    layoutModeType,
  } = useAppSelector((state) => state.layout);

  const isSidebarCollapse = leftSidbarSizeType === "small-icon-view";
  const leftMargin =
    leftSidbarSizeType === "small-icon-view" ? "lg:ml-0" : "lg:ml-[250px]";
  const leftSidebarWidth =
    leftSidbarSizeType === "small-icon-view" ? "w-fit" : "w-[250px]";

  return (
    <>
      <LoadingUI />
      {preloader === "top-loader" && (
        <NextTopLoader showSpinner={false} color="#e61247" />
      )}
      <div
        className={`flex ${
          layoutType === "horizontal" ? "flex-col" : ""
        } min-h-screen w-full`}
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
          className={`flex min-h-screen grow flex-col ${
            layoutType === "vertical" || layoutType === "semi-box"
              ? leftMargin
              : ""
          }`}
        >
          <Navbar
            topbarColorType={topbarColorType}
            layoutModeType={layoutModeType}
          />
          {layoutType === "horizontal" && <LeftHorizontalSidebar />}
          <main>{children}</main>
          <Footer />
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default AuthProtectedLayoutProvider;
