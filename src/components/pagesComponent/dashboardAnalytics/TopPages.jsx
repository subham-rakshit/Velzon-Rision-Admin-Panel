"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { topPages } from "@/app/assets/pagesData/dashboardData/analytics";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopPages = () => {
  const [timeLine, setTimeLine] = useState("Today");

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Top Pages
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <BsThreeDotsVertical className="text-light-weight-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-[150px] bg-light-dencity-900 p-0 py-2 dark:bg-dark-dencity-200`}
          >
            {["Today", "LastWeek", "LastMonth", "CurrentYear"].map((item) => (
              <DropdownMenuItem
                key={item}
                value={item}
                onSelect={() => setTimeLine(item)}
                className={`${
                  timeLine === item
                    ? "bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/10"
                    : ""
                }`}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[380px]">
        <table className="size-full">
          <thead>
            <tr>
              <th>Active Page</th>
              <th>Active</th>
              <th>Users</th>
            </tr>
          </thead>
          <tbody>
            {(topPages || []).map((item, index) => (
              <tr key={index}>
                <td>
                  <Link href="#">{item.page}</Link>
                </td>
                <td>{item.active}</td>
                <td>{item.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TopPages;
