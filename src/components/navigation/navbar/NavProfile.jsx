"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { BeatLoader } from "react-spinners";

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
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/helpers/toast-notification";
import { useAppSelector } from "@/lib/store/hooks";
import axios from "axios";

const NavProfile = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userData, setUserData] = useState({});
  const { sidebarUserProfileAvtarType, topbarColorType } = useAppSelector(
    (state) => state.layout
  );

  const session = useSession();
  const router = useRouter();

  // NOTE Handle Logout for credentials Login
  const handleLogout = async () => {
    try {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/logout`
      );

      if (response.data.success && response.status === 200) {
        showSuccessToast(response.data.message);
        router.push(ROUTES.LOGIN); // NOTE: redirect to login page
      }
    } catch (error) {
      console.log("Logout Error: ", error);
      showErrorToast(
        error.response.data.message ||
          error.response.data.errors ||
          error.message ||
          "Logout failure."
      );
    }
  };

  // NOTE Handle Logout for OAuth Login
  const handleOAuthLogout = () => {
    signOut({
      callbackUrl: ROUTES.LOGIN,
    });
  };

  // NOTE Get User Details
  const getUserDetails = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/get-details`
      );

      if (response.data.success && response.status === 200) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.log("Get user details error CLIENT: ", error);
      if (
        error.response.status === 400 &&
        error.response.data.message === "Unauthenticated user."
      ) {
        showErrorToast(error.response.data.message);
        handleLogout();
      } else {
        showErrorToast(
          error.response.data.message ||
            error.response.data.errors ||
            error.message ||
            "Profile details ERROR."
        );
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (session && session.status === "unauthenticated") {
      getUserDetails();
    }
  }, [session]);

  if (sidebarUserProfileAvtarType === avatarStatus.SHOW) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          asChild
          className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/5` : `bg-[#fff]/5`} h-full cursor-pointer px-4 sm:ml-2`}
        >
          <span className={`${globalStyleObj.flexStart} gap-[10px]`}>
            <Image
              alt="User settings"
              src={userData.picture ? userData.picture : avatarImg}
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
                      : userData.username
                        ? userData.username
                        : "Anonymous"}
                  </span>
                  <span className={`${globalStyleObj.text11Light400}`}>
                    {session && session.data
                      ? session.data.user.role.includes("Admin")
                        ? "Admin"
                        : "User"
                      : userData.role
                        ? userData.role.includes("Admin")
                          ? "Admin"
                          : "User"
                        : "Anonymous"}
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
                {`Welcome ${session && session.data ? session.data.user.username : userData.username ? userData.username : "Anonymous"}!`}
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
