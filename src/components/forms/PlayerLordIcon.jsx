"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import ICON from "../../app/assets/jsonData/animate-mail-2.json";

// Dynamically import the Player component to disable SSR
const Player = dynamic(
  () => import("@lordicon/react").then((mod) => mod.Player),
  { ssr: false }
);

const PlayerLordIcon = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <>
      <Player
        ref={playerRef}
        size={96}
        icon={ICON}
        speed={0.4}
        colors="primary:#0ab39c"
        className="mx-auto"
        onComplete={() => playerRef.current?.playFromBeginning()}
      />
    </>
  );
};

export default PlayerLordIcon;
