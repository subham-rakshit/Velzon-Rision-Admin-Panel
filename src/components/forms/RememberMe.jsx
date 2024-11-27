"use client";

import { Checkbox, Label } from "flowbite-react";
import React from "react";

import { globalStyleObj } from "@/app/assets/styles";

const RememberMe = ({
  boxId,
  boxName,
  checkedStatus,
  checkboxExtraClasses,
  onHandleInputs,
}) => {
  // NOTE: Handle checkbox toggel
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    onHandleInputs(boxName, checked);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={boxId}
        name={boxName}
        checked={checkedStatus}
        className="size-3 cursor-pointer focus:border-none focus:ring-0"
        onChange={handleCheckboxChange}
      />
      <Label
        htmlFor={boxId}
        className={`${checkboxExtraClasses} ${globalStyleObj.formLabelText}`}
      >
        Remember me
      </Label>
    </div>
  );
};

export default RememberMe;
