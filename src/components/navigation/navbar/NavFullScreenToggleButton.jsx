"use client";

import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const NavFullScreenToggleButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // NOTE: Handle fullscreen
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
      className="hover:background-light400_dark100 flex items-center justify-center rounded-full p-[5px] sm:p-[10px]"
    >
      <span>
        {isFullScreen ? (
          <MdFullscreenExit size={22} className="icon-light450_dark350" />
        ) : (
          <MdFullscreen size={22} className="icon-light450_dark350" />
        )}
      </span>
    </button>
  );
};

export default NavFullScreenToggleButton;
