"use client";

import { Label, TextInput } from "flowbite-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

const TextInputFile = ({
  labelText,
  labelClasses,
  inputId,
  inputName,
  inputValue,
  inputPlaceholder,
  inputExtraClasses,
  helperText,
  onHandleInputs,
}) => {
  const [textInput, setTextInput] = useState("");
  const [isBlank, setIsBlank] = useState(false);
  const pathname = usePathname();

  // NOTE: Handle Input blank effects
  const handleBlur = () => {
    if (textInput.trim() === "") {
      setIsBlank(true);
    } else {
      setIsBlank(false);
    }
  };

  // NOTE: Handle Input value changes and pass it to the Login page
  const handleChange = (e) => {
    const charInput = e.target.value;

    setTextInput(charInput);
    if (isBlank) setIsBlank(false);

    onHandleInputs(inputName, charInput);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor={inputId}
          value={labelText}
          className={`${labelClasses} form-lable-text`}
        />
        {pathname.includes("register") && (
          <span className="ml-1 font-bold text-red-500">*</span>
        )}
      </div>
      <div className="relative">
        <TextInput
          id={inputId}
          name={inputName}
          value={inputValue}
          type="text"
          placeholder={inputPlaceholder}
          className={`form-input-text !dark:bg-white w-full rounded-lg bg-white ${
            isBlank ? "border-2 border-red-500" : ""
          } ${inputExtraClasses}`}
          sizes="sm"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            isBlank && (
              <span className="font-poppins-rg text-[13px] font-normal text-red-500">
                {helperText}
              </span>
            )
          }
        />
        {isBlank && (
          <span className="absolute inset-y-3 right-0 pr-3">
            <IoAlertCircleOutline color="red" size="25" />
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInputFile;
