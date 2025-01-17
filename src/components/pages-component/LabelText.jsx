import React from "react";

const LabelText = ({ text, htmlForId, classNames, star }) => {
  return (
    <label
      htmlFor={htmlForId}
      className={`${classNames} font-poppins-md text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
    >
      {text}
      {star && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};

export default LabelText;
