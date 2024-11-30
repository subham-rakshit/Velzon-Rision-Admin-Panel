"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import avatarImg from "../../../app/assets/images/users/avatar-1.jpg";

import {
  avatarStatus,
  topbarColor,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import {
  profileDataGroup1,
  profileDataGroup2,
} from "@/app/assets/navData/navData";
import { globalStyleObj } from "@/app/assets/styles";
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
  const [isFetching, setIsFetching] = useState(false);
  const [profileName, setProfileName] = useState("");
  const { sidebarUserProfileAvtarType, topbarColorType } = useAppSelector(
    (state) => state.layout
  );

  const session = useSession();
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
      console.log("Logout Error: ", error);
      toast.error("Logout failure.", {
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
  };

  const handleOAuthLogout = () => {
    signOut({
      callbackUrl: ROUTES.LOGIN,
    });
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/get-details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setProfileName(data.message);
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
        console.log("Get username error: ", error);
        toast.error("Profile name Error!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setIsFetching(false);
      }
    };
    if (session && session.status === "unauthenticated") {
      getUserDetails();
    }
  }, [session]);

  if (sidebarUserProfileAvtarType === avatarStatus.SHOW) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          asChild
          className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/5` : `bg-[#fff]/10`} h-full cursor-pointer px-4 sm:ml-2`}
        >
          <span className={`${globalStyleObj.flexStart} gap-[10px]`}>
            <Image
              alt="User settings"
              src={avatarImg}
              width={33}
              height={33}
              className="rounded-full"
            />
            <span className="hidden font-poppins-rg xl:flex xl:flex-col">
              {isFetching ? (
                <BeatLoader size={5} color="#b9b1b1" />
              ) : (
                <>
                  <span
                    className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.text13Light550Dark550}` : `font-poppins-rg text-[13px] text-light-weight-850`}`}
                  >
                    {session && session.data
                      ? session.data.user.username
                      : profileName}
                  </span>
                  <span className={`${globalStyleObj.text11Light400}`}>
                    Founder
                  </span>
                </>
              )}
            </span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          className={`${globalStyleObj.backgroundLight900Dark200} border-none px-3 py-2`}
        >
          <DropdownMenuLabel>
            {isFetching ? (
              <BeatLoader size={3} color="#b9b1b1" />
            ) : (
              <span className="font-poppins-light text-[12px] tracking-wide text-light-weight-400">
                {`Welcome ${session && session.data ? session.data.user.username : profileName}!`}
              </span>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {profileDataGroup1.map((tab) => (
              <Link key={tab.id} href={tab.linkAddress}>
                <DropdownMenuItem className="cursor-pointer">
                  {tab.icon}
                  <span className={`${globalStyleObj.text13Light600Dark400}`}>
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
                  <span className={`${globalStyleObj.flexBetween} w-full`}>
                    <span className={`${globalStyleObj.text13Light600Dark400}`}>
                      {tabData.label}
                    </span>
                    {tabData.subLabel ? (
                      <span
                        className={`${globalStyleObj.text13Light600Dark450} ml-2`}
                      >
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

            <DropdownMenuItem
              onClick={
                session && session.data ? handleOAuthLogout : handleLogout
              }
              className="cursor-pointer"
            >
              <MdLogout size={16} color="#878a99" />
              <span className={`${globalStyleObj.text13Light600Dark400}`}>
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
