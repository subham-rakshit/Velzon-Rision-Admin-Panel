"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import {
  Footer,
  LeftSidebar,
  LeftTwoColumnSidebar,
  LeftHorizontalSidebar,
  Navbar,
  RightSidebar,
  LoadingUI,
} from "..";
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const AuthProtectedLayoutProvider = ({ children }) => {
  const { layoutType, leftSidbarSizeType, topbarColorType, preloader } =
    useAppSelector((state) => state.layout);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSidebarCollapse = leftSidbarSizeType === "small-icon-view";
  const leftMargin =
    leftSidbarSizeType === "small-icon-view" ? "ml-0" : "ml-[250px]";
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
    </>
  );
};

export default AuthProtectedLayoutProvider;

// IDEA --- useRouter() from next/router -> throw `NextRouter` was not mounted ERROR ❌
// useEffect(() => {
//   const handleStart = () => NProgress.start();
//   const handleStop = () => NProgress.done();

//   router.events.on("routeChangeStart", handleStart);
//   router.events.on("routeChangeComplete", handleStop);
//   router.events.on("routeChangeError", handleStop);

//   return () => {
//     router.events.off("routeChangeStart", handleStart);
//     router.events.off("routeChangeComplete", handleStop);
//     router.events.off("routeChangeError", handleStop);
//   };
// }, [router]);

// useEffect(() => {
//   const handleRouteChangeStart = () => {
//     console.log("Navigation started");
//     setIsLoading(true);
//     startTimeRef.current = performance.now(); // Start tracking time
//   };

//   const handleRouteChangeComplete = () => {
//     const duration = performance.now() - startTimeRef.current;
//     console.log(`Navigation completed in ${duration.toFixed(2)} ms`);
//     setNavigationTime(duration.toFixed(2));
//     setIsLoading(false);
//   };

//   // Trigger `routeChangeStart` logic
//   handleRouteChangeStart();

//   // Simulate `routeChangeComplete` after path or search params change
//   handleRouteChangeComplete();
// }, [pathname, searchParams]);

// useEffect(() => {
//   const handleStart = () => {
//     setIsLoading(true);
//     startTimeRef.current = performance.now();
//   };

//   const handleComplete = () => {
//     const duration = performance.now() - startTimeRef.current;
//     console.log(`Transition completed in ${duration.toFixed(2)} ms`);
//     setTimeout(() => setIsLoading(false), duration); // Ensure exact timing
//   };

//   // Simulate route transition start
//   handleStart();

//   // Simulate route transition complete after render
//   const timer = setTimeout(handleComplete, 0);

//   return () => clearTimeout(timer);
// }, [pathname, searchParams]);
