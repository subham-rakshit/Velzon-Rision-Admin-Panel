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

import {
  layout,
  loader,
  sidebarSize,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { changeLeftSideBarSizeType } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const AuthProtectedLayoutProvider = ({ children }) => {
  const {
    layoutType,
    leftSidbarSizeType,
    leftSidebarColorType,
    topbarColorType,
    preloader,
    toggleButtonStatus,
  } = useAppSelector((state) => state.layout);

  const [bodyLeftMargin, setBodyLeftMargin] = useState("");
  const [leftSidebarWidth, setLeftSiderbarWidth] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBodyLeftMargin("ml-0");
        setLeftSiderbarWidth("hidden");
      } else if (width >= 768 && width < 1025) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
        } else {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
        }
      } else {
        // for width > 1024
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
        } else {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
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
      {preloader === loader.TOP_LOADER && (
        <NextTopLoader showSpinner={false} color="#e61247" />
      )}
      <div
        className={`flex ${
          layoutType === layout.HORIZONTAL ? "flex-col" : ""
        } min-h-screen w-full`}
      >
        {layoutType === layout.VERTICAL || layoutType === layout.SEMI_BOX ? (
          <LeftSidebar
            width={leftSidebarWidth}
            leftSidbarSizeType={leftSidbarSizeType}
            leftSidebarColorType={leftSidebarColorType}
          />
        ) : layoutType === layout.TWO_COLUMN ? (
          <LeftTwoColumnSidebar width={leftSidebarWidth} />
        ) : null}

        <div
          className={`flex min-h-screen flex-1 flex-col ${
            layoutType === layout.VERTICAL || layoutType === layout.SEMI_BOX
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
          {layoutType === layout.HORIZONTAL && <LeftHorizontalSidebar />}
          {children}
          <Footer />
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default AuthProtectedLayoutProvider;
