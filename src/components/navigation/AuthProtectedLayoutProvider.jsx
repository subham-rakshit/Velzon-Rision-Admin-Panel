"use client";

import NextTopLoader from "nextjs-toploader";
import React, { useCallback, useEffect, useState } from "react";

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
  sidebarMainSize,
  sidebarSize,
  toggleStatus,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import {
  changeLeftSideBarSizeType,
  changeToggleButtonStatus,
} from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const AuthProtectedLayoutProvider = ({ children }) => {
  const {
    layoutType,
    leftSidbarSizeType,
    leftSidebarColorType,
    leftSidbarSizeMain,
    topbarColorType,
    preloader,
    toggleButtonStatus,
  } = useAppSelector((state) => state.layout);

  const [bodyLeftMargin, setBodyLeftMargin] = useState("");
  const [leftSidebarWidth, setLeftSiderbarWidth] = useState("");

  const dispatch = useAppDispatch();

  const handleResize = useCallback(() => {
    const width = window.innerWidth;

    if (width < 768) {
      // Small Screen
      setBodyLeftMargin("ml-0");
      setLeftSiderbarWidth("hidden");
    } else if (width >= 768 && width < 1025) {
      // Medium Screen
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
      // Large Screen
      if (leftSidbarSizeMain === sidebarMainSize.LG) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
        } else {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
        }
      } else if (leftSidbarSizeMain === sidebarMainSize.MD) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
        } else {
          setBodyLeftMargin("ml-[180px]");
          setLeftSiderbarWidth("w-[180px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.COMPACT));
        }
      } else if (leftSidbarSizeMain === sidebarMainSize.SM) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
        } else {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
        }
      } else if (leftSidbarSizeMain === sidebarMainSize.SM_HOVER) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeToggleButtonStatus(toggleStatus.CLOSE));
          dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
        } else {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_HOVER_VIEW));
        }
      }
    }
  }, [toggleButtonStatus, leftSidbarSizeMain, dispatch]);

  useEffect(() => {
    handleResize(); // Run on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <LoadingUI />
      {preloader === loader.TOP_LOADER && (
        <NextTopLoader showSpinner={false} color="#e61247" />
      )}
      <div
        className={`flex min-h-screen w-full ${
          layoutType === layout.HORIZONTAL ? "flex-col" : ""
        }`}
      >
        {layoutType === layout.VERTICAL || layoutType === layout.SEMI_BOX ? (
          <LeftSidebar
            width={leftSidebarWidth}
            leftSidbarSizeType={leftSidbarSizeType}
            leftSidbarSizeMain={leftSidbarSizeMain}
            leftSidebarColorType={leftSidebarColorType}
            toggleButtonStatus={toggleButtonStatus}
          />
        ) : layoutType === layout.TWO_COLUMN ? (
          <LeftTwoColumnSidebar width={leftSidebarWidth} />
        ) : null}

        <div
          className={`flex min-h-screen flex-1 flex-col ${bodyLeftMargin !== "ml-0" ? "transition-300" : "transition-none"} ${
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
            leftSidbarSizeMain={leftSidbarSizeMain}
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
