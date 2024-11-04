"use client";

import React, { useState } from "react";
import Link from "next/link";

import { IoAlertCircleOutline, IoEye, IoEyeOff } from "react-icons/io5";
import { Label, TextInput } from "flowbite-react";

const PasswordInputFiled = ({
  labelText,
  labelClasses,
  inputId,
  inputName,
  inputExtraClasses,
  onHandleInputs,
}) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isBlank, setIsBlank] = useState(false);

  //NOTE: Handle Blur Effects
  const handleBlur = () => {
    if (passwordInput.trim() === "") {
      setIsBlank(true);
    } else {
      setIsBlank(false);
    }
  };

  //NOTE: Handle Input value changes and pass it to the Login page
  const handleChange = (e) => {
    const charInput = e.target.value;

    setPasswordInput(charInput);
    if (isBlank) setIsBlank(false);

    onHandleInputs(inputName, charInput);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label
          htmlFor={inputId}
          value={labelText}
          className={`${labelClasses} font-hk-grotesk text-dark text-[18px] font-medium`}
        />

        <Link href="/forgot-password">
          <span className="font-hk-grotesk text-[18px] text-soft font-medium">
            Forgot password?
          </span>
        </Link>
      </div>
      <div className="relative">
        <TextInput
          type={isVisible ? "text" : "password"}
          id={inputId}
          name={inputName}
          value={passwordInput}
          placeholder="******"
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
        {isBlank ? (
          <span className="absolute right-0 pr-3 inset-y-3">
            <IoAlertCircleOutline color="red" size="25" />
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {isVisible ? (
              <IoEyeOff
                color="#878A99"
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
              />
            ) : (
              <IoEye
                color="#878A99"
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordInputFiled;
