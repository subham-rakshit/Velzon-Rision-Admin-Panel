"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const sleep = (number) => {
  return new Promise((resolve) => setTimeout(resolve, number));
};

const TransitionLink = ({ children, href, ...props }) => {
  const { preloader } = useAppSelector((state) => state.layout);
  const router = useRouter();

  const handleTransition = async (e) => {
    if (preloader === "spinner") {
      e.preventDefault();

      // TODO Run some animation
      const transitionElem = document.querySelector(".main-tranisiton");
      transitionElem.classList.remove("page-transition-off");
      transitionElem.classList.add("page-transition-on");

      // TODO Sleep for some time
      await sleep(500);

      // TODO router.push(href)
      router.push(href);

      await sleep(500);

      // TODO Run some enter animation
      transitionElem.classList.remove("page-transition-on");
      transitionElem.classList.add("page-transition-off");
    }
  };

  return (
    <Link href={href} {...props} onClick={handleTransition}>
      {children}
    </Link>
  );
};

export default TransitionLink;
