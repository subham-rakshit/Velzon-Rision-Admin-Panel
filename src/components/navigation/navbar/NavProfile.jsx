"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";

import avatarImg from "../../../app/assets/images/users/avatar-1.jpg";

import {
  profileDataGroup1,
  profileDataGroup2,
} from "@/app/assets/navData/navData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ROUTES from "@/constants/routes";
import { useAppSelector } from "@/lib/store/hooks";

const NavProfile = () => {
  const { sidebarUserProfileAvtarType } = useAppSelector(
    (state) => state.layout
  );
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/logout`
      );
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push(ROUTES.LOGIN); // NOTE: redirect to login page
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (sidebarUserProfileAvtarType === "show") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="md:background-light800_dark100 h-full cursor-pointer px-4"
        >
          <span className="flex items-center gap-[10px]">
            <Image
              alt="User settings"
              src={avatarImg}
              width={33}
              height={33}
              className="rounded-full"
            />
            <span className="hidden font-poppins-rg xl:flex xl:flex-col">
              <span className={`text-13-light500_dark550`}>Badsha</span>
              <span className={`text-11-light400`}>Founder</span>
            </span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          className="background-light900_dark200 border-none px-4 py-2"
        >
          <DropdownMenuLabel>
            <span className="font-poppins-extra-light text-[12px] tracking-wide text-light-weight-400">
              Welcome Badsha!
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {profileDataGroup1.map((tab) => (
              <Link key={tab.id} href={tab.linkAddress}>
                <DropdownMenuItem className="cursor-pointer">
                  {tab.icon}
                  <span className="font-poppins-rg text-[13px] text-dark-weight-600 dark:text-light-weight-400">
                    {tab.label}
                  </span>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {profileDataGroup2.map((tabData) => (
              <Link key={tabData.id} href={tabData.linkAddress}>
                <DropdownMenuItem className="cursor-pointer">
                  {tabData.icon}
                  <span className="flex-between w-full">
                    <span className="font-poppins-rg text-[13px] text-dark-weight-600 dark:text-light-weight-400">
                      {tabData.label}
                    </span>
                    {tabData.subLabel ? (
                      <span className="ml-2 font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-450">
                        {tabData.subLabel}
                      </span>
                    ) : tabData.isNew ? (
                      <span className="bg-custom-green-50 px-2 text-[11px] text-accent-light-green dark:bg-custom-green-450">
                        New
                      </span>
                    ) : null}
                  </span>
                </DropdownMenuItem>
              </Link>
            ))}

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <MdLogout size={16} color="#878a99" />
              <span className="font-poppins-rg text-[13px] text-dark-weight-600 dark:text-light-weight-400">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return null;
  }
};

export default NavProfile;
