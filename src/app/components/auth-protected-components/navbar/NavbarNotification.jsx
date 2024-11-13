"use client";

import { Checkbox, Dropdown, Label } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";

import { notificationsData } from "@/app/assets/navData/navData";
import bellSvg from "../../../assets/images/svg/bell.svg";

// TODO Working on this file
const NavbarNotification = () => {
  const [selectedNotification, setSelectedNotification] = useState(
    notificationsData[0]
  );

  return (
    <Dropdown
      label={
        <span className="relative p-[9px] rounded-full hover:bg-[#E6EEFD] transition-all duration-300 ease-in-out">
          <FaRegBell size={20} color="#878A99" />
          <span className="absolute -top-[7px] left-[50%] bg-[#F06548] text-white font-poppins-md font-semibold text-[10px] rounded-full px-[7px] py-[2px]">
            3
          </span>
        </span>
      }
      arrowIcon={false}
      inline
      dismissOnClick={false}
      className="w-full max-w-[350px] notification-dropdown border-none rounded-[5px] overflow-hidden"
    >
      <Dropdown.Header className="bg-[#405189] p-0 m-0">
        <div className="flex items-center justify-between gap-2 w-full px-4 pt-4">
          <span className="block font-poppins-rg font-semibold text-[15px] tracking-wide text-white">
            Notifications
          </span>
          <span className="flex items-center gap-1 bg-white text-dark px-2 rounded-[4px] text-[13px] font-[500]">
            4 New
          </span>
        </div>
        <div className="flex items-center mt-6 px-2">
          {notificationsData.map((item) => {
            // NOTE Handle Notification buttons
            const handleNotificationButton = () => {
              const notificationObj = notificationsData.find(
                (data) => data.id === item.id
              );
              setSelectedNotification(notificationObj);
            };

            return (
              <button
                type="button"
                key={item.id}
                id={item.id}
                onClick={handleNotificationButton}
                className={`text-soft font-[500] hover:text-white text-[13px] px-3 py-2 rounded-tr-[5px] rounded-tl-[5px] ${
                  selectedNotification.id === item.id
                    ? "bg-white text-dark hover:text-dark"
                    : ""
                }`}
              >
                {item.id === "all-notification" && item.content.length > 0
                  ? `${item.label}(${item.content.length})`
                  : item.label}
              </button>
            );
          })}
        </div>
      </Dropdown.Header>
      {selectedNotification.content.length > 0 ? (
        <div className="max-h-[220px] overflow-y-auto py-2 custom-scrollbar">
          {selectedNotification.content.map((data) => {
            if (data.type === "general") {
              return (
                <Dropdown.Item
                  className="flex items-center justify-between gap-2 py-4"
                  key={data.id}
                >
                  <div className="flex items-start gap-2">
                    <span
                      style={{ backgroundColor: `${data.iconBgColor}` }}
                      className="p-1 rounded-full w-[25px] h-[25px] flex items-center justify-center"
                    >
                      {data.icon}
                    </span>
                    <p className="text-dark text-[13px] font-[500] text-left">
                      {data.notificationText}
                    </p>
                  </div>
                  <Checkbox id={data.id} />
                </Dropdown.Item>
              );
            } else {
              return (
                <Dropdown.Item
                  className="flex items-center justify-between gap-2 py-4"
                  key={data.id}
                >
                  <div className="flex items-start gap-2">
                    <Image
                      src={data.userImage}
                      alt={data.username}
                      width={35}
                      height={30}
                      className="rounded-full"
                    />
                    <p className="text-dark text-[13px] font-[500] text-left">
                      {data.notificationText}
                    </p>
                  </div>
                  <Checkbox id={data.id} />
                </Dropdown.Item>
              );
            }
          })}
          <Dropdown.Item
            className="text-[14px] font-medium text-center rounded-[5px]"
            as="div"
          >
            {/* TODO Create redirect to notifications page  */}
            {selectedNotification.label === "All" ? (
              <button className="text-[#0ab39c] hover:text-white tracking-wide font-poppins-rg font-[400] bg-[#daf4f0] hover:bg-[#0ab39c] px-2 py-2 rounded-[4px] transition-all duration-300 ease-in-out mx-auto flex items-center gap-2">
                View All Notifications
                <MdArrowForward />
              </button>
            ) : selectedNotification.label === "Messages" ? (
              <button className="text-[#0ab39c] hover:text-white tracking-wide font-poppins-rg font-[400] bg-[#daf4f0] hover:bg-[#0ab39c] px-2 py-2 rounded-[4px] transition-all duration-300 ease-in-out mx-auto flex items-center gap-2">
                View All Messages
                <MdArrowForward />
              </button>
            ) : (
              <button className="text-[#0ab39c] hover:text-white tracking-wide font-poppins-rg font-[400] bg-[#daf4f0] hover:bg-[#0ab39c] px-2 py-2 rounded-[4px] transition-all duration-300 ease-in-out mx-auto flex items-center gap-2">
                View All Alerts
                <MdArrowForward />
              </button>
            )}
          </Dropdown.Item>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 px-4 min-h-[200px]">
          <Image src={bellSvg} alt="bell" width={80} height={80} />
          <p className="text-dark text-[18px] font-[500] text-center">
            Hey! You have no any
            <br />
            notifications
          </p>
        </div>
      )}
    </Dropdown>
  );
};

export default NavbarNotification;
