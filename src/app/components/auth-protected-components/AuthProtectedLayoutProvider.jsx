"use client";

import React from "react";
import { Footer, LeftSidebar, Navbar, RightSidebar } from "..";
import { useAppSelector } from "@/lib/store/hooks";

const AuthProtectedLayoutProvider = ({ children }) => {
  const userDetails = useAppSelector((state) => state.user);
  const layout = useAppSelector((state) => state.layout);
  console.log(userDetails);
  console.log(layout);

  return (
    <>
      <div className="flex w-full bg-red-400">
        <LeftSidebar />
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

export default AuthProtectedLayoutProvider;
