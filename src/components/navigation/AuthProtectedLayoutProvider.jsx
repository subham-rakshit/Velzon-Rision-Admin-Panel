"use client";

import NextTopLoader from "nextjs-toploader";
import React, { useEffect, useState } from "react";

import {
  LeftHorizontalSidebar,
  LeftSidebar,
  LeftTwoColumnSidebar,
  Navbar,
  RightSidebar,
  Footer,
  LoadingUI,
} from "..";

import { changeLeftSideBarSizeType } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const AuthProtectedLayoutProvider = ({ children }) => {
  const {
    layoutType,
    leftSidbarSizeType,
    topbarColorType,
    preloader,
    toggleButtonStatus,
  } = useAppSelector((state) => state.layout);

  const [bodyLeftMargin, setBodyLeftMargin] = useState("");
  const [leftSidebarWidth, setLeftSiderbarWidth] = useState("");

  const dispatch = useAppDispatch();
  const isSidebarCollapse = leftSidbarSizeType === "small-icon-view";

  useEffect(() => {
    const handleResize = () => {
      console.log("Use Effect Run..");

      const width = window.innerWidth;

      if (width < 768) {
        setBodyLeftMargin("ml-0");
        setLeftSiderbarWidth("hidden");
      } else if (width >= 768 && width < 1025) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType("default"));
        } else {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType("small-icon-view"));
        }
      } else {
        // for width > 1024
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType("small-icon-view"));
        } else {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType("default"));
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleButtonStatus, dispatch]);

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
            leftSidbarSizeType={leftSidbarSizeType}
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
              ? bodyLeftMargin
              : ""
          }`}
        >
          <Navbar
            toggleButtonStatus={toggleButtonStatus}
            layoutType={layoutType}
            topbarColorType={topbarColorType}
            leftSidbarSizeType={leftSidbarSizeType}
          />
          {layoutType === "horizontal" && <LeftHorizontalSidebar />}
          {children}
          <Footer />
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default AuthProtectedLayoutProvider;
