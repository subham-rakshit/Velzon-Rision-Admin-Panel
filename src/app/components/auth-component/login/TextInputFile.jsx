"use client";

import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { IoAlertCircleOutline } from "react-icons/io5";

const TextInputFile = ({
  labelText,
  labelClasses,
  inputId,
  inputName,
  inputPlaceholder,
  inputExtraClasses,
  onHandleInputs,
}) => {
  const [textInput, setTextInput] = useState("");
  const [isBlank, setIsBlank] = useState(false);

  //NOTE: Handle Input blank effects
  const handleBlur = () => {
    if (textInput.trim() === "") {
      setIsBlank(true);
    } else {
      setIsBlank(false);
    }
  };

  //NOTE: Handle Input value changes and pass it to the Login page
  const handleChange = (e) => {
    const charInput = e.target.value;

    setTextInput(charInput);
    if (isBlank) setIsBlank(false);

    onHandleInputs(inputName, charInput);
  };

  return (
    <div>
      <div className="block mb-2">
        <Label
          htmlFor={inputId}
          value={labelText}
          className={`${labelClasses} font-hk-grotesk text-dark text-[18px] font-medium`}
        />
      </div>
      <div className="relative">
        <TextInput
          id={inputId}
          name={inputName}
          type="text"
          placeholder={inputPlaceholder}
          className={`font-hk-grotesk text-dark text-[20px] font-medium w-full rounded-lg ${
            isBlank ? "border-2 border-red-500" : ""
          } ${inputExtraClasses}`}
          sizes="sm"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            isBlank && (
              <span className="text-sm font-medium text-red-500 font-hk-grotesk">
                Please enter your {inputName}
              </span>
            )
          }
        />
        {isBlank && (
          <span className="absolute right-0 pr-3 inset-y-3">
            <IoAlertCircleOutline color="red" size="25" />
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInputFile;
