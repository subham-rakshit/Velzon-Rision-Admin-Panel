"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

const DarkModeProvider = ({ children, ...props }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default DarkModeProvider;
