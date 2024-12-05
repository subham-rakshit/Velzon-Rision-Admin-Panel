"use client";

import React from "react";
import CountUp from "react-countup";

const CountupText = ({ number, secondNumber, prefix, secondPrefix }) => {
  if (secondNumber && secondPrefix) {
    return (
      <span className="flex items-center gap-2">
        <span>
          <CountUp start={0} end={number} decimals={0} duration={4} />
          {prefix}
        </span>
        <span>
          <CountUp start={0} end={secondNumber} decimals={0} duration={4} />
          {secondPrefix}
        </span>
      </span>
    );
  } else {
    return (
      <>
        <CountUp start={0} end={number} decimals={2} duration={4} />
        {prefix}
      </>
    );
  }
};

export default CountupText;
