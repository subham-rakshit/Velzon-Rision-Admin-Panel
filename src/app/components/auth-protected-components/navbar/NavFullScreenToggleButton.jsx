"use client";

import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const NavFullScreenToggleButton = () => {
  console.log("I am Navbar Screen Button");
  const [isFullScreen, setIsFullScreen] = useState(false);

  //NOTE: Handle fullscreen
  const handleFullScreen = () => {
    // Extract that elem which want to convert in fullscreen
    const fullScreenContainerElem = document.getElementById(
      "full-screen-toggle-container"
    );
    // Store the done fullscreen elem
    const fullScreenStatus = document.fullscreenElement;

    if (fullScreenStatus) {
      document.exitFullscreen(); // Exit fullscreen
    } else {
      fullScreenContainerElem.requestFullscreen(); // Convert fullscreen
    }

    setIsFullScreen(!isFullScreen);
  };

  return (
    <button
      type="button"
      onClick={handleFullScreen}
      className="hover:bg-[#E6EEFD] rounded-full p-[9px] flex items-center justify-center"
    >
      <span>
        {isFullScreen ? (
          <MdFullscreenExit size={22} color="#878A99" />
        ) : (
          <MdFullscreen size={22} color="#878A99" />
        )}
      </span>
    </button>
  );
};

export default NavFullScreenToggleButton;
