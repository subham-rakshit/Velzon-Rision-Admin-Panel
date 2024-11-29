"use client";

import NextTopLoader from "nextjs-toploader";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  LeftSidebar,
  LeftTwoColumnSidebar,
  Navbar,
  RightSidebar,
  Footer,
  LoadingUI,
  HorizontalSidebar,
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
    leftSidebarSizeMain,
    preloader,
    toggleButtonStatus,
    toggleSmallButtonStatus,
  } = useAppSelector((state) => state.layout);

  const [bodyLeftMargin, setBodyLeftMargin] = useState("");
  const [leftSidebarWidth, setLeftSiderbarWidth] = useState("");
  const [horizontalNavHeight, setHorizontalNavHeight] = useState("");
  const [isScrollTop, setIsScrollTop] = useState(false);
  const handleScrolled = useRef(false);

  const dispatch = useAppDispatch();

  const handleResize = useCallback(() => {
    const width = window.innerWidth;

    if (width < 768) {
      // Small Screen
      if (layoutType === layout.HORIZONTAL) {
        if (toggleButtonStatus) {
          setHorizontalNavHeight("max-h-[355px]");
        } else {
          setHorizontalNavHeight("h-0");
        }
      } else {
        if (toggleSmallButtonStatus) {
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
        } else {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("hidden");
        }
      }
    } else if (width >= 768 && width < 1025) {
      // Medium Screen
      if (layoutType === layout.HORIZONTAL) {
        if (toggleButtonStatus) {
          setHorizontalNavHeight("max-h-[355px]");
        } else {
          setHorizontalNavHeight("h-0");
          // dispatch(changeToggleButtonStatus(true));
        }
      } else if (layoutType === layout.TWO_COLUMN) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-[290px]");
          setLeftSiderbarWidth("w-[290px]");
        } else {
          setBodyLeftMargin("ml-[70px]");
          setLeftSiderbarWidth("w-[70px]");
        }
      } else {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-[250px]");
          setLeftSiderbarWidth("w-[250px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
        } else {
          setBodyLeftMargin("ml-0");
          setLeftSiderbarWidth("w-[65px]");
          dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
        }
      }
    } else {
      // Large Screen
      if (layoutType === layout.HORIZONTAL) {
        setHorizontalNavHeight("h-[48px]");
        dispatch(changeToggleButtonStatus(false));
      } else if (layoutType === layout.TWO_COLUMN) {
        if (toggleButtonStatus) {
          setBodyLeftMargin("ml-[70px]");
          setLeftSiderbarWidth("w-[70px]");
        } else {
          setBodyLeftMargin("ml-[290px]");
          setLeftSiderbarWidth("w-[290px]");
        }
      } else {
        if (leftSidebarSizeMain === sidebarMainSize.LG) {
          if (toggleButtonStatus) {
            setBodyLeftMargin("ml-0");
            setLeftSiderbarWidth("w-[65px]");
            dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
          } else {
            setBodyLeftMargin("ml-[250px]");
            setLeftSiderbarWidth("w-[250px]");
            dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
          }
        } else if (leftSidebarSizeMain === sidebarMainSize.MD) {
          if (toggleButtonStatus) {
            setBodyLeftMargin("ml-0");
            setLeftSiderbarWidth("w-[65px]");
            dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
          } else {
            setBodyLeftMargin("ml-[180px]");
            setLeftSiderbarWidth("w-[180px]");
            dispatch(changeLeftSideBarSizeType(sidebarSize.COMPACT));
          }
        } else if (leftSidebarSizeMain === sidebarMainSize.SM) {
          if (toggleButtonStatus) {
            setBodyLeftMargin("ml-[250px]");
            setLeftSiderbarWidth("w-[250px]");
            dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
          } else {
            setBodyLeftMargin("ml-0");
            setLeftSiderbarWidth("w-[65px]");
            dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW));
          }
        } else if (leftSidebarSizeMain === sidebarMainSize.SM_HOVER) {
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
    }
  }, [
    toggleButtonStatus,
    toggleSmallButtonStatus,
    leftSidebarSizeMain,
    dispatch,
    layoutType,
  ]);

  // NOTE For Resize
  useEffect(() => {
    handleResize(); // Run on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // NOTE For Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !handleScrolled.current) {
        setIsScrollTop(true);
        handleScrolled.current = true;
      } else if (window.scrollY <= 200 && handleScrolled.current) {
        setIsScrollTop(false);
        handleScrolled.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <LoadingUI />
      {preloader === loader.TOP_LOADER && (
        <NextTopLoader showSpinner={false} color="#e61247" />
      )}
      <div
        className={`min-h-screen w-full ${
          layoutType === layout.HORIZONTAL ? "flex-col" : "flex"
        }`}
      >
        {layoutType === layout.VERTICAL || layoutType === layout.SEMI_BOX ? (
          <LeftSidebar width={leftSidebarWidth} />
        ) : layoutType === layout.TWO_COLUMN ? (
          <LeftTwoColumnSidebar width={leftSidebarWidth} />
        ) : null}

        <div
          className={`flex min-h-screen flex-1 flex-col ${bodyLeftMargin !== "ml-0" || layoutType === layout.TWO_COLUMN ? "transition-300" : "transition-none"} ${
            layoutType === layout.VERTICAL ||
            layoutType === layout.SEMI_BOX ||
            layoutType === layout.TWO_COLUMN
              ? bodyLeftMargin
              : ""
          }`}
        >
          <Navbar layoutType={layoutType} />
          {layoutType === layout.HORIZONTAL && (
            <HorizontalSidebar resizeHeight={horizontalNavHeight} />
          )}
          {children}
          <Footer />
        </div>
      </div>
      <RightSidebar isScrollTop={isScrollTop} />
    </>
  );
};

export default AuthProtectedLayoutProvider;
