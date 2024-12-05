import Image from "next/image";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { FiAlertTriangle, FiActivity, FiExternalLink } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { RiArrowRightLine } from "react-icons/ri";

import illustaratorImg from "../../../../assets/images/user-illustarator-2.png";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";
import { Breadcrumb, TransitionLink, Widget } from "@/components";
import ROUTES from "@/constants/routes";

export const metadata = {
  title: titlesObject.analytics.title,
};

const DashboardAnalytics = () => {
  return (
    <div className={`min-h-full border border-red-500`}>
      <Breadcrumb title="Analytics" pageTilte="Dashboard" />
      {/* Container 1 (Upgrade Plan and Widgets && Live user and Sessions Country container) */}
      <div className={`mt-[40px] flex flex-col gap-5 2xl:flex-row`}>
        {/* Container 1.1 (Upgrade Plan and Widgets container) */}
        <div className="flex flex-col gap-5 border">
          {/* Container 1.1.1 (Upgrade Plan Container) */}
          <div
            className={`${globalStyleObj.backgroundLight900Dark300} rounded-b-sm shadow-light`}
          >
            <div
              className={`${globalStyleObj.flexBetween} gap-2 bg-[#FEF4E4] p-3 dark:bg-[#413A2E]`}
            >
              <div className={`${globalStyleObj.flexStart} gap-2`}>
                <FiAlertTriangle color={"#F9A741"} size={13} />
                <h5 className="font-poppins-rg text-[13px] text-[#F9A741]">
                  Your free trial expired in{" "}
                  <span className="font-poppins-sb">17</span> days.
                </h5>
              </div>

              <TransitionLink
                href={`${ROUTES.PAGES_PRICING}`}
                className="font-poppins-sb text-[13px] tracking-wide text-[#F9A741] underline"
              >
                Upgrade
              </TransitionLink>
            </div>

            <div
              className={`flex flex-col gap-2 px-3 sm:flex-row sm:items-end sm:justify-between`}
            >
              <div className="py-3">
                <div
                  className={`flex flex-col gap-2 sm:flex-row sm:items-center`}
                >
                  <p
                    className={`font-poppins-rg text-[16px] text-dark-weight-600 dark:text-light-weight-550`}
                  >
                    Upgrade your plan from a{" "}
                    <span className="font-poppins-sb">Free trial</span>, to
                    ‘Premium Plan’
                  </p>
                  <RiArrowRightLine size={16} />
                </div>
                <TransitionLink href={`${ROUTES.PAGES_PRICING}`}>
                  <button
                    type="button"
                    className="mt-5 rounded-[4px] bg-custom-green-400 p-2 font-poppins-rg text-[13px] tracking-wide text-white hover:bg-custom-green-500"
                  >
                    Upgrade Account!
                  </button>
                </TransitionLink>
              </div>
              <Image
                src={illustaratorImg}
                alt="illustarator"
                width={250}
                height={100}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
          {/* Container 1.1.2 (Widget - Users and Sessions Container) */}
          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Users"
                number="28.10"
                status="up"
                percentage="16.24"
                prefix="k"
                icon={<LuUsers color={"#2998D5"} size={22} />}
              />
            </div>

            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Sessions"
                number="97.66"
                status="down"
                percentage="3.96"
                prefix="k"
                icon={<FiActivity color={"#2998D5"} size={22} />}
              />
            </div>
          </div>
          {/* Container 1.1.3 (Widget - Avg. Visit and Bounce Rate Container) */}
          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Avg. Visit Duration"
                number="3"
                secondNumber="40"
                status="down"
                percentage="0.24"
                prefix="m"
                secondPrefix="sec"
                icon={<FaRegClock color={"#2998D5"} size={22} />}
              />
            </div>

            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Bounce Rate"
                number="33.48"
                status="up"
                percentage="7.05"
                prefix="%"
                icon={<FiExternalLink color={"#2998D5"} size={22} />}
              />
            </div>
          </div>
        </div>
        {/* Container 1.2 (Live user and Sessions Country container) */}
        <div className="flex flex-col gap-5 border xl:flex-row">
          {/* TODO Container 1.2.1 (Live user container) */}
          <div
            className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-b-sm shadow-light xl:w-[49%]`}
          >
            <div className={`${globalStyleObj.flexBetween}`}>
              <h4>Live Users by Country</h4>
              <button
                type="button"
                className="bg-red-500 px-[5px] py-[2px] font-poppins-rg text-white"
              >
                Export Report
              </button>
            </div>
          </div>
          {/* Container 1.2.2 (Sessions Country container) */}
        </div>
      </div>
      {/* Container 2 */}
      {/* Container 3 */}
    </div>
  );
};

export default DashboardAnalytics;
