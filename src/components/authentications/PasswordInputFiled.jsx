"use client";

import { Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoAlertCircleOutline, IoEye, IoEyeOff } from "react-icons/io5";

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

  // NOTE: Handle Blur Effects
  const handleBlur = () => {
    if (passwordInput.trim() === "") {
      setIsBlank(true);
    } else {
      setIsBlank(false);
    }
  };

  // NOTE: Handle Input value changes and pass it to the Login page
  const handleChange = (e) => {
    const charInput = e.target.value;

    setPasswordInput(charInput);
    if (isBlank) setIsBlank(false);

    onHandleInputs(inputName, charInput);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
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
            <span className="font-poppins-rg text-[13px] text-light-400">
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
              <span className="font-poppins-rg text-[13px] font-normal text-red-500">
                {helperText}
              </span>
            )
          }
        />

        {/* Alert Icon, always visible if input is blank */}
        {isBlank && (
          <span className="absolute inset-y-3 right-0 pr-3">
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
              className="absolute inset-y-2 right-0 flex items-center pr-3"
            >
              {isVisible ? (
                <IoEyeOff
                  color="#878A99"
                  className="size-4 text-gray-500 dark:text-gray-400"
                />
              ) : (
                <IoEye
                  color="#878A99"
                  className="size-4 text-gray-500 dark:text-gray-400"
                />
              )}
            </button>
          )}
      </div>
      {pathname.includes("auth-pass-change") && userInfo && !isBlank && (
        <span className="text-soft font-poppins-rg text-[13px] font-normal">
          {userInfo}
        </span>
      )}
    </div>
  );
};

export default PasswordInputFiled;
