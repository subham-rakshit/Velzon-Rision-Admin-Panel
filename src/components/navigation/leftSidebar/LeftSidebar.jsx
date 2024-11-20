"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import TransitionLink from "./TransitionLink";
import logoLight from "../../../app/assets/images/logo-light.png";
import logoSmall from "../../../app/assets/images/logo-sm.png";
import leftSidebarData from "../../../app/assets/leftSidebarData/leftSidebarData";

const LeftSidebar = ({ width, isSidebarCollapse }) => {
  const pathname = usePathname();

  // NOTE Default Sidebar State to manage open tabs based on pathname
  const [parentTabDetails, setParentTabDetails] = useState(null);
  const [firstChildTabDetails, setFirstChildTabDetails] = useState(null);
  const [secondChildTabDetails, setSecondChildTabDetails] = useState(null);
  const [thirdChildTabDetails, setThirdChildTabDetails] = useState(null);

  // NOTE Small(Icon View) Sidebar state to manage tab open based on hover
  const [parentTabIsOpen, setParentTabIsOpen] = useState({
    id: "",
    isOpen: false,
  });
  const [firstChildTabIsOpen, setFirstChildTabIsOpen] = useState({
    id: "",
    isOpen: false,
  });
  const [secondChilTabIsOpen, setSecondChilTabIsOpen] = useState({
    id: "",
    isOpen: false,
  });

  // TODO Need To Remove
  // console.log("Parent: ", parentTabDetails);
  // console.log("FirstChild: ", firstChildTabDetails);
  // console.log("SecondChild: ", secondChildTabDetails);
  // console.log("ThirdChild: ", thirdChildTabDetails);

  // console.log("Parent: ", parentTabIsOpen);
  // console.log("FirstChild: ", firstChildTabIsOpen);
  // console.log("SecondChild: ", secondChilTabIsOpen);
  // console.log("ThirdChild: ", thirdChildTabIsOpen);

  useEffect(() => {
    const mainPath = pathname.split("/")[1];
    const parentObject = { id: "", isOpen: false };
    const firstChildObject = { id: "", isOpen: false };
    const secondChildObject = { id: "", isOpen: false };
    const thirdChildObject = { id: "", isOpen: false };

    // Loop over each category and tab to check if their IDs are in the pathname
    leftSidebarData.forEach((category) => {
      category.tabNameList.forEach((parent) => {
        // Open the main tab if its ID is in the pathname
        if (mainPath.includes(parent.id.toLowerCase())) {
          parentObject.id = parent.id;
          parentObject.isOpen = true;
        }

        // Loop over each dropdown item in this tab to see if they match the pathname
        parent.tabDropdownList.forEach((firstChild) => {
          if (firstChild.tabDropdownList.length > 0) {
            if (mainPath.includes(firstChild.id)) {
              firstChildObject.id = firstChild.id;
              firstChildObject.isOpen = true;

              parentObject.id = parent.id;
              parentObject.isOpen = true;
            }
          } else {
            if (mainPath === firstChild.id) {
              firstChildObject.id = firstChild.id;
              firstChildObject.isOpen = true;

              parentObject.id = parent.id;
              parentObject.isOpen = true;
            }
          }

          // Check for any sub-dropdowns within the dropdown item
          firstChild.tabDropdownList.forEach((secondChild) => {
            if (secondChild.tabDropdownList.length > 0) {
              if (mainPath.includes(secondChild.id)) {
                secondChildObject.id = secondChild.id;
                secondChildObject.isOpen = true;

                firstChildObject.id = firstChild.id;
                firstChildObject.isOpen = true;

                parentObject.id = parent.id;
                parentObject.isOpen = true;
              }
            } else {
              if (mainPath === secondChild.id) {
                secondChildObject.id = secondChild.id;
                secondChildObject.isOpen = true;

                firstChildObject.id = firstChild.id;
                firstChildObject.isOpen = true;

                parentObject.id = parent.id;
                parentObject.isOpen = true;
              }
            }

            // Check for any sub-dropdowns within the dropdown item
            secondChild.tabDropdownList.forEach((thirdChild) => {
              if (thirdChild.tabDropdownList.length > 0) {
                if (mainPath.includes(thirdChild.id)) {
                  thirdChildObject.id = thirdChild.id;
                  thirdChildObject.isOpen = true;

                  secondChildObject.id = secondChild.id;
                  secondChildObject.isOpen = true;

                  firstChildObject.id = firstChild.id;
                  firstChildObject.isOpen = true;

                  parentObject.id = parent.id;
                  parentObject.isOpen = true;
                }
              } else {
                if (mainPath === thirdChild.id) {
                  thirdChildObject.id = thirdChild.id;
                  thirdChildObject.isOpen = true;

                  secondChildObject.id = secondChild.id;
                  secondChildObject.isOpen = true;

                  firstChildObject.id = firstChild.id;
                  firstChildObject.isOpen = true;

                  parentObject.id = parent.id;
                  parentObject.isOpen = true;
                }
              }
            });
          });
        });
      });
    });

    setParentTabDetails(parentObject);
    setFirstChildTabDetails(firstChildObject);
    setSecondChildTabDetails(secondChildObject);
    setThirdChildTabDetails(thirdChildObject);
  }, [pathname, isSidebarCollapse]);

  // Handle Parent Tab toggle
  const handleParentTabToggle = (parentId) => {
    setParentTabDetails((prev) => ({
      ...prev,
      id: parentId,
      isOpen: prev.id === parentId ? !prev.isOpen : true,
    }));
  };

  // Handle First Child Tab toggle
  const handleFirstChildTabToggle = (firstChildId) => {
    setFirstChildTabDetails((prev) => ({
      ...prev,
      id: firstChildId,
      isOpen: prev.id === firstChildId ? !prev.isOpen : true,
    }));
  };

  // Handle First Child Tab toggle
  const handleSecondChildTabToggle = (secondChildId) => {
    setSecondChildTabDetails((prev) => ({
      ...prev,
      id: secondChildId,
      isOpen: prev.id === secondChildId ? !prev.isOpen : true,
    }));
  };

  // NOTE Vertical Default LeftSidebar View ----
  const verticalDefaultLeftSidebarView = () => {
    return (
      <ul className="custom-left-sidebar-scrollbar hide-scrollbar transition-style h-[calc(100vh-70px)] overflow-y-auto bg-[#405189] px-[20px] py-2 text-[#a6b4e4]">
        {leftSidebarData.map((tab, index) => {
          return (
            <li key={tab.tabCategory} className="flex flex-col gap-5 pt-[20px]">
              {/* NOTE Tab category */}
              <span
                className={`text-soft text-[11px] font-semibold uppercase tracking-wider`}
              >
                {tab.tabCategory}
              </span>

              {/* NOTE Full Category Items Main Container */}
              <ul className={`flex flex-col`}>
                {tab.tabNameList.map((tabList) => {
                  return (
                    // NOTE Parent and childs Tab Main container *****
                    <li
                      key={tabList.id}
                      className={`transition-style cursor-pointer py-2 font-poppins-rg`}
                    >
                      {tabList.tabDropdownList.length > 0 ? (
                        // DEBUG Parent Tab having child
                        <div
                          className={`group flex items-center gap-2 ${
                            pathname.includes(tabList.id.toLowerCase())
                              ? "text-white"
                              : ""
                          }`}
                          onClick={() => handleParentTabToggle(tabList.id)}
                        >
                          {/* NOTE Parent Tab Icon */}
                          <span
                            className={`transition-style group-hover:text-white`}
                          >
                            {tabList.tabIcon}
                          </span>

                          {/* NOTE Parent Tabname and Arrow Icon Container */}
                          <span
                            className={`transition-style flex w-full items-center justify-between text-[15px] group-hover:text-white`}
                          >
                            {/* NOTE Parent Tabname */}
                            <span>{tabList.tabName}</span>

                            {/* NOTE Parent Arrow Icon */}
                            <IoIosArrowForward
                              className={`${
                                pathname.includes(tabList.id.toLowerCase())
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </span>
                        </div>
                      ) : (
                        // DEBUG Parent Tab having no child
                        <TransitionLink href={tabList.pathName}>
                          <div
                            className={`group ${
                              pathname.includes(tabList.id.toLowerCase())
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {/* NOTE Parent Tab */}
                            <span
                              className={`transition-style flex items-center gap-2 group-hover:text-white`}
                            >
                              {tabList.tabIcon}
                              {/* NOTE Parent Tabname */}
                              <span>{tabList.tabName}</span>
                            </span>
                          </div>
                        </TransitionLink>
                      )}

                      {/* NOTE All Child's Main container */}
                      <ul
                        className={`transition-style flex flex-col justify-center overflow-hidden ${
                          parentTabDetails &&
                          tabList.id === parentTabDetails.id &&
                          parentTabDetails.isOpen
                            ? "mt-2 h-fit"
                            : "h-0"
                        } transition-style`}
                      >
                        {tabList.tabDropdownList.map((firstChild) => {
                          // NOTE If 1st child doesn't have children
                          if (firstChild.tabDropdownList.length === 0) {
                            return (
                              // DEBUG 1st Child (No Children)
                              <li
                                id={firstChild.id}
                                key={firstChild.id}
                                className="py-[10px] font-poppins-rg"
                              >
                                {/* NOTE 1stChild Icon and Name container */}
                                <TransitionLink href={firstChild.pathName}>
                                  <span
                                    className={`flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-white ${
                                      firstChildTabDetails &&
                                      firstChildTabDetails.id === firstChild.id
                                        ? "text-white"
                                        : ""
                                    }`}
                                  >
                                    {/* NOTE 1stChild Icon */}
                                    <BsDash size={18} />

                                    {/* NOTE 1stChild Name and New text */}
                                    <span
                                      className={`flex w-full items-center justify-between text-[13px]`}
                                    >
                                      {firstChild.tabName}
                                      {firstChild.isNew && (
                                        <span className="rounded-[2px] bg-[#0ab39c] px-1 text-[10px] text-white">
                                          New
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                </TransitionLink>
                              </li>
                            );
                          } else {
                            // NOTE If 1st child have children
                            return (
                              // NOTE 1st Child main container
                              <li
                                id={firstChild.id}
                                key={firstChild.id}
                                className="py-[10px] font-poppins-rg"
                              >
                                {/* DEBUG 1st Child (Children) */}
                                <span
                                  className={`flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-white ${
                                    pathname.includes(firstChild.id)
                                      ? "text-white"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleFirstChildTabToggle(firstChild.id)
                                  }
                                >
                                  {/* NOTE 1stChild Icon */}
                                  <BsDash size={18} />

                                  {/* NOTE 1stChild Icon Tabname and Arrow Container */}
                                  <span
                                    className={`flex w-full items-center justify-between text-[13px]`}
                                  >
                                    {firstChild.tabName}
                                    <IoIosArrowForward
                                      className={`${
                                        pathname.includes(firstChild.id)
                                          ? "rotate-90"
                                          : ""
                                      }`}
                                    />
                                    {firstChild.isNew && (
                                      <span className="rounded-[2px] bg-[#0ab39c] px-1 text-[10px] text-white">
                                        New
                                      </span>
                                    )}
                                  </span>
                                </span>

                                {/* NOTE 2ndChild's main container  */}
                                <ul
                                  className={`overflow-hidden pl-5 ${
                                    firstChildTabDetails &&
                                    firstChildTabDetails.id === firstChild.id &&
                                    firstChildTabDetails.isOpen
                                      ? "h-fit"
                                      : "h-0"
                                  } transition-style`}
                                >
                                  {firstChild.tabDropdownList.map(
                                    (secChild) => {
                                      // NOTE If 2nd Child doesn't have child
                                      if (
                                        secChild.tabDropdownList.length === 0
                                      ) {
                                        return (
                                          // DEBUG 2nd Child
                                          <li
                                            key={secChild.id}
                                            id={secChild.id}
                                            className={`transition-style group pt-[10px] font-poppins-rg text-[13px] ${
                                              pathname.includes(secChild.id)
                                                ? "text-white"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              href={secChild.pathName}
                                              className="flex items-center gap-3"
                                            >
                                              <span
                                                className={`transition-style size-[6px] rounded-full border border-[#a6b4e4] group-hover:bg-white ${
                                                  pathname.includes(secChild.id)
                                                    ? "bg-white"
                                                    : ""
                                                }`}
                                              ></span>
                                              <span
                                                className={`transition-style group-hover:text-white`}
                                              >
                                                {secChild.tabName}
                                              </span>
                                            </Link>
                                          </li>
                                        );
                                      } else {
                                        // NOTE If 2nd Child have children
                                        return (
                                          <li
                                            key={secChild.id}
                                            id={secChild.id}
                                            className={`transition-style pt-[10px] font-poppins-rg text-[13px]`}
                                          >
                                            <span
                                              className={`group flex items-center gap-3 ${
                                                pathname.includes(secChild.id)
                                                  ? "text-white"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                handleSecondChildTabToggle(
                                                  secChild.id
                                                )
                                              }
                                            >
                                              <span
                                                className={`transition-style size-[6px] rounded-full border border-[#a6b4e4] group-hover:bg-white ${
                                                  pathname.includes(secChild.id)
                                                    ? "bg-white"
                                                    : ""
                                                }`}
                                              ></span>

                                              {/* NOTE 2ndChild Icon Tabname and Arrow Container */}
                                              <span
                                                className={`flex w-full items-center justify-between text-[13px] group-hover:text-white`}
                                              >
                                                {secChild.tabName}
                                                <IoIosArrowForward
                                                  className={`${
                                                    pathname.includes(
                                                      secChild.id
                                                    )
                                                      ? "rotate-90"
                                                      : ""
                                                  }`}
                                                />
                                              </span>
                                            </span>

                                            {/* TODO 3rcChild */}
                                            <ul
                                              className={`overflow-hidden pl-5 ${
                                                secondChildTabDetails &&
                                                secondChildTabDetails.id ===
                                                  secChild.id &&
                                                secondChildTabDetails.isOpen
                                                  ? "h-fit"
                                                  : "h-0"
                                              } transition-style`}
                                            >
                                              {secChild.tabDropdownList.map(
                                                (thirdChild) => {
                                                  return (
                                                    <li
                                                      key={thirdChild.id}
                                                      id={thirdChild.id}
                                                      className={`transition-style group pt-[10px] font-poppins-rg text-[13px]`}
                                                    >
                                                      <Link
                                                        href={
                                                          thirdChild.pathName
                                                        }
                                                        className="flex items-center gap-3"
                                                      >
                                                        <span
                                                          className={`transition-style size-[6px] rounded-full border border-[#a6b4e4] group-hover:bg-white ${
                                                            pathname.includes(
                                                              thirdChild.id
                                                            )
                                                              ? "bg-white"
                                                              : ""
                                                          }`}
                                                        ></span>
                                                        <span
                                                          className={`transition-style group-hover:text-white ${
                                                            pathname.includes(
                                                              thirdChild.id
                                                            )
                                                              ? "text-white"
                                                              : ""
                                                          }`}
                                                        >
                                                          {thirdChild.tabName}
                                                        </span>
                                                      </Link>
                                                    </li>
                                                  );
                                                }
                                              )}
                                            </ul>
                                          </li>
                                        );
                                      }
                                    }
                                  )}
                                </ul>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  };

  // NOTE Vertical Small Icon LeftSidebar View ----
  const verticalSmallIconLeftSideView = () => {
    return (
      <ul className="transition-style relative h-full bg-[#405189] py-2 text-[#a6b4e4]">
        {leftSidebarData.map((category) =>
          category.tabNameList.map((parentTabIcon) => (
            // Tab Icon Main Container
            <li
              key={parentTabIcon.id}
              className="relative flex items-center justify-center py-[13px] hover:cursor-pointer"
              onMouseEnter={() =>
                setParentTabIsOpen({ id: parentTabIcon.id, isOpen: true })
              }
              onMouseLeave={() => setParentTabIsOpen({ id: "", isOpen: false })}
            >
              {/* NOTE Parent Icon */}
              <span
                className={`text-[22px] ${
                  pathname.includes(parentTabIcon.id.toLowerCase())
                    ? "text-white"
                    : ""
                }`}
              >
                {parentTabIcon.tabIcon}
              </span>

              {/* NOTE Parent Dropdown Box */}
              <ul
                className={`transition-style absolute left-full top-0 z-[9999] w-[200px] rounded-r-[5px] bg-[#405189] px-2 py-3 font-poppins-rg ${
                  parentTabIsOpen.isOpen &&
                  parentTabIsOpen.id === parentTabIcon.id
                    ? "visible opacity-100"
                    : "hidden opacity-0"
                }`}
              >
                {/* Parent Tab Name  */}
                <span
                  className={`transition-style flex w-full items-center justify-between text-[15px] group-hover:text-white ${
                    parentTabIsOpen.id === parentTabIcon.id ? "text-white" : ""
                  } ${
                    parentTabIcon.tabDropdownList.length > 0 ? "mb-3" : "mb-0"
                  }`}
                >
                  <span>{parentTabIcon.tabName}</span>
                  {parentTabIcon.tabDropdownList.length > 0 && (
                    <IoIosArrowForward
                      className={`${
                        parentTabIsOpen.id === parentTabIcon.id
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  )}
                </span>

                {/* First Childrens */}
                {parentTabIcon.tabDropdownList.length > 0 &&
                  parentTabIcon.tabDropdownList.map((firstChild) => {
                    return (
                      <li
                        key={firstChild.id}
                        className={`transition-style cursor-pointer font-poppins-rg`}
                      >
                        {firstChild.tabDropdownList.length > 0 ? (
                          // FirstChild Tab having dropdown
                          <ul
                            className={`relative flex items-center gap-2 p-2 text-[13px]`}
                            onMouseEnter={() =>
                              setFirstChildTabIsOpen({
                                id: firstChild.id,
                                isOpen: true,
                              })
                            }
                            onMouseLeave={() =>
                              setFirstChildTabIsOpen({ id: "", isOpen: false })
                            }
                          >
                            <span
                              className={`transition-style flex w-full items-center justify-between text-[13px] hover:text-white ${
                                firstChildTabDetails &&
                                firstChildTabDetails.id === firstChild.id
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              <span>{firstChild.tabName}</span>
                              <IoIosArrowForward />
                            </span>

                            {/* Second Children */}
                            <li
                              className={`transition-style absolute left-full top-0 z-[9999] w-[200px] rounded-r-[5px] bg-[#405189] p-3 font-poppins-rg ${
                                firstChildTabIsOpen.isOpen &&
                                firstChildTabIsOpen.id === firstChild.id
                                  ? "visible opacity-100"
                                  : "hidden opacity-0"
                              }`}
                            >
                              {firstChild.tabDropdownList.map((secondChild) =>
                                // Second Child Having Dropdown
                                secondChild.tabDropdownList.length > 0 ? (
                                  <ul
                                    key={secondChild.id}
                                    className={`relative flex items-center gap-2 p-2 text-[13px]`}
                                    onMouseEnter={() =>
                                      setSecondChilTabIsOpen({
                                        id: secondChild.id,
                                        isOpen: true,
                                      })
                                    }
                                    onMouseLeave={() =>
                                      setSecondChilTabIsOpen({
                                        id: "",
                                        isOpen: false,
                                      })
                                    }
                                  >
                                    <span
                                      className={`transition-style flex w-full items-center justify-between text-[13px] hover:text-white ${
                                        secondChildTabDetails &&
                                        secondChildTabDetails.id ===
                                          secondChild.id
                                          ? "text-white"
                                          : ""
                                      }`}
                                    >
                                      <span>{secondChild.tabName}</span>
                                      <IoIosArrowForward />
                                    </span>

                                    {/* Third Child */}
                                    <li
                                      className={`transition-style absolute left-full top-0 z-[9999] w-[200px] rounded-[5px] bg-[#405189] p-3 font-poppins-rg ${
                                        secondChilTabIsOpen.isOpen &&
                                        secondChilTabIsOpen.id ===
                                          secondChild.id
                                          ? "visible opacity-100"
                                          : "hidden opacity-0"
                                      }`}
                                    >
                                      {secondChild.tabDropdownList.map(
                                        (thirdChild) =>
                                          thirdChild.tabDropdownList >
                                          0 ? null : (
                                            <Link
                                              href={thirdChild.pathName}
                                              key={thirdChild.id}
                                            >
                                              <span
                                                className={`transition-style flex items-center gap-2 p-2 text-[13px] hover:text-white ${
                                                  thirdChildTabDetails &&
                                                  thirdChildTabDetails.id ===
                                                    thirdChild.id
                                                    ? "text-white"
                                                    : ""
                                                }`}
                                              >
                                                {secondChild.tabName}
                                              </span>
                                            </Link>
                                          )
                                      )}
                                    </li>
                                  </ul>
                                ) : (
                                  // Second Child Having No Dropdown
                                  <Link
                                    href={secondChild.pathName}
                                    key={secondChild.id}
                                  >
                                    <span
                                      className={`transition-style flex items-center gap-2 p-2 text-[13px] hover:text-white ${
                                        secondChildTabDetails &&
                                        secondChildTabDetails.id ===
                                          secondChild.id
                                          ? "text-white"
                                          : ""
                                      }`}
                                    >
                                      {secondChild.tabName}
                                    </span>
                                  </Link>
                                )
                              )}
                            </li>
                          </ul>
                        ) : (
                          // FirstChild Tab having no dropdown
                          <Link href={firstChild.pathName}>
                            <span
                              className={`transition-style flex items-center gap-2 p-2 text-[13px] hover:text-white ${
                                firstChildTabDetails &&
                                firstChildTabDetails.id === firstChild.id
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              {firstChild.tabName}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        isSidebarCollapse ? "sticky" : `fixed`
      } left-0 top-0 z-[99] ${width}`}
    >
      {/* NOTE Sidebar Top Logo Section */}
      <div
        className={`transition-style sticky left-0 top-0 z-[100] h-[70px] w-full bg-[#405189] px-[20px]`}
      >
        <Link
          href="/dashboard"
          className="flex size-full items-center justify-center"
        >
          {isSidebarCollapse ? (
            <Image src={logoSmall} alt="logo small" width={25} height={25} />
          ) : (
            <Image src={logoLight} alt="logo light" width={100} height={20} />
          )}
        </Link>
      </div>

      {/* NOTE Tab Section */}
      {isSidebarCollapse
        ? verticalSmallIconLeftSideView()
        : verticalDefaultLeftSidebarView()}
    </div>
  );
};

export default LeftSidebar;
