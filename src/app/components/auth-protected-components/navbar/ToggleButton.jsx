import React from "react";

const ToggleButton = ({ handleToggle, toggleStatus }) => {
  return (
    <button
      onClick={() => handleToggle()}
      type="button"
      className="inline-block cursor-pointer"
    >
      {["bar_1", "bar_2", "bar_3"].map((bar) => {
        let dynamicClasses;

        if (toggleStatus) {
          switch (bar) {
            case "bar_1":
              dynamicClasses =
                "w-[12px] rotate-[40deg] translate-y-[4px] translate-x-[12px]";
              break;
            case "bar_3":
              dynamicClasses =
                "w-[12px] -rotate-[40deg] -translate-y-[4px] translate-x-[12px]";
              break;
            default:
              dynamicClasses = "w-[22px] rotate-[180deg]";
              break;
          }
        } else {
          switch (bar) {
            case "bar_1":
              dynamicClasses = "w-[16px]";
              break;
            case "bar_3":
              dynamicClasses = "w-[12px]";
              break;
            default:
              dynamicClasses = "w-[22px]";
              break;
          }
        }
        return (
          <span
            key={bar}
            className={`block h-[2px] bg-[#878A99] my-[5px] transition-all duration-300 ease-in-out rounded-sm ${dynamicClasses}`}
          ></span>
        );
      })}
    </button>
  );
};

export default ToggleButton;
