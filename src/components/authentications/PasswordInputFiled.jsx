"use client";

import React, { useState } from "react";
import Link from "next/link";

import { IoAlertCircleOutline, IoEye, IoEyeOff } from "react-icons/io5";
import { Label, TextInput } from "flowbite-react";
import { usePathname } from "next/navigation";

const PasswordInputFiled = ({
  labelText,
  labelClasses,
  inputId,
  inputName,
  inputValue,
  inputExtraClasses,
  helperText,
  placeholderText,
  userInfo,
  onHandleInputs,
}) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const pathname = usePathname();

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
        <div>
          <Label
            htmlFor={inputId}
            value={labelText}
            className={`${labelClasses} form-lable-text`}
          />
          {pathname.includes("register") && (
            <span className="ml-1 font-bold text-red-500">*</span>
          )}
        </div>
        {pathname.includes("login") && (
          <Link href="/forgot-password">
            <span className="text-light-400 font-poppins-rg text-[13px]">
              Forgot password?
            </span>
          </Link>
        )}
      </div>
      <div className="relative">
        <TextInput
          type={isVisible ? "text" : "password"}
          id={inputId}
          name={inputName}
          value={inputValue}
          placeholder={placeholderText}
          className={`form-input-text w-full rounded-lg ${
            isBlank ? "border-2 border-red-500" : ""
          } ${inputExtraClasses}`}
          sizes="sm"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            isBlank && (
              <span className="text-[13px] font-normal text-red-500 font-poppins-rg">
                {helperText}
              </span>
            )
          }
        />

        {/* Alert Icon, always visible if input is blank */}
        {isBlank && (
          <span className="absolute right-0 pr-3 inset-y-3">
            <IoAlertCircleOutline color="red" size="25" />
          </span>
        )}

        {/* Conditional button to toggle visibility, visible only on login page */}
        {!isBlank &&
          (pathname.includes("login") ||
            pathname.includes("auth-pass-change")) && (
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-0 flex items-center pr-3 inset-y-2"
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
      {pathname.includes("auth-pass-change") && userInfo && !isBlank && (
        <span className="text-[15px] font-normal text-soft font-poppins-rg">
          {userInfo}
        </span>
      )}
    </div>
  );
};

export default PasswordInputFiled;
