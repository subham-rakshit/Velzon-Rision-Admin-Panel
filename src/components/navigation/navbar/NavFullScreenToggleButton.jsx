"use client";

import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

import { globalStyleObj } from "@/app/assets/styles";

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
      className={`${globalStyleObj.flexCenter} rounded-full p-[5px] hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100 sm:p-[10px]`}
    >
      <span>
        {isFullScreen ? (
          <MdFullscreenExit
            size={22}
            className={`${globalStyleObj.iconLight450Dark350}`}
          />
        ) : (
          <MdFullscreen
            size={22}
            className={`${globalStyleObj.iconLight450Dark350}`}
          />
        )}
      </span>
    </button>
  );
};

export default NavFullScreenToggleButton;
