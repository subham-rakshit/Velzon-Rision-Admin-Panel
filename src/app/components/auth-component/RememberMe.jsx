"use client";

import { Checkbox, Label } from "flowbite-react";
import React, { useState } from "react";

const RememberMe = ({
  boxId,
  boxName,
  checkboxExtraClasses,
  onHandleInputs,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  //NOTE: Handle checkbox toggel
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onHandleInputs(boxName, checked);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={boxId}
        name={boxName}
        checked={isChecked}
        className="w-3 h-3 focus:border-none focus:ring-0"
        onChange={handleCheckboxChange}
      />
      <Label
        htmlFor={boxId}
        className={`font-hk-grotesk text-dark text-[18px] font-medium ${checkboxExtraClasses}`}
      >
        Remember me
      </Label>
    </div>
  );
};

export default RememberMe;
