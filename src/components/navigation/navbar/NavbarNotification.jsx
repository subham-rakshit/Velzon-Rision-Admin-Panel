"use client";

import { Checkbox, Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";

import bellSvg from "../../../app/assets/images/svg/bell.svg";

import { notificationsData } from "@/app/assets/navData/navData";
import { useAppSelector } from "@/lib/store/hooks";

// TODO Working on this file
const NavbarNotification = () => {
  const { layoutModeType } = useAppSelector((state) => state.layout);
  const [selectedNotification, setSelectedNotification] = useState(
    notificationsData[0]
  );

  return (
    <Dropdown
      label={
        <span
          className={`relative rounded-full p-[9px] transition-all duration-300 ease-in-out ${layoutModeType === "light" ? "nav-icons-hover-light" : "nav-icons-hover-dark"}`}
        >
          <FaRegBell size={20} color="#878A99" />
          <span className="absolute left-1/2 top-[-7px] rounded-full bg-[#F06548] px-[7px] py-[2px] font-poppins-md text-[10px] font-semibold text-white">
            3
          </span>
        </span>
      }
      arrowIcon={false}
      inline
      dismissOnClick={false}
      className="notification-dropdown w-full max-w-[350px] overflow-hidden rounded-[5px] border-none"
    >
      <Dropdown.Header className="m-0 bg-[#405189] p-0">
        <div className="flex w-full items-center justify-between gap-2 px-4 pt-4">
          <span className="block font-poppins-rg text-[15px] font-semibold tracking-wide text-white">
            Notifications
          </span>
          <span className="text-dark flex items-center gap-1 rounded-[4px] bg-white px-2 text-[13px] font-[500]">
            4 New
          </span>
        </div>
        <div className="mt-6 flex items-center px-2">
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
                className={`text-soft rounded-t-[5px] px-3 py-2 text-[13px] font-[500] hover:text-white ${
                  selectedNotification.id === item.id
                    ? "text-dark hover:text-dark bg-white"
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
        <div className="custom-scrollbar max-h-[220px] overflow-y-auto py-2">
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
                      className="flex size-[25px] items-center justify-center rounded-full p-1"
                    >
                      {data.icon}
                    </span>
                    <p className="text-dark text-left text-[13px] font-[500]">
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
                    <p className="text-dark text-left text-[13px] font-[500]">
                      {data.notificationText}
                    </p>
                  </div>
                  <Checkbox id={data.id} />
                </Dropdown.Item>
              );
            }
          })}
          <Dropdown.Item
            className="rounded-[5px] text-center text-[14px] font-medium"
            as="div"
          >
            {/* TODO Create redirect to notifications page  */}
            {selectedNotification.label === "All" ? (
              <button className="mx-auto flex items-center gap-2 rounded-[4px] bg-[#daf4f0] p-2 font-poppins-rg tracking-wide text-[#0ab39c] transition-all duration-300 ease-in-out hover:bg-[#0ab39c] hover:text-white">
                View All Notifications
                <MdArrowForward />
              </button>
            ) : selectedNotification.label === "Messages" ? (
              <button className="mx-auto flex items-center gap-2 rounded-[4px] bg-[#daf4f0] p-2 font-poppins-rg tracking-wide text-[#0ab39c] transition-all duration-300 ease-in-out hover:bg-[#0ab39c] hover:text-white">
                View All Messages
                <MdArrowForward />
              </button>
            ) : (
              <button className="mx-auto flex items-center gap-2 rounded-[4px] bg-[#daf4f0] p-2 font-poppins-rg tracking-wide text-[#0ab39c] transition-all duration-300 ease-in-out hover:bg-[#0ab39c] hover:text-white">
                View All Alerts
                <MdArrowForward />
              </button>
            )}
          </Dropdown.Item>
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 px-4">
          <Image src={bellSvg} alt="bell" width={80} height={80} />
          <p className="text-dark text-center text-[18px] font-[500]">
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
