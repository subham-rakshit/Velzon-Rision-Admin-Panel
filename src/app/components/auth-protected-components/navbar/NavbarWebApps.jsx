import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";

import github from "../../../assets/images/brands/github.png";
import bitbucket from "../../../assets/images/brands/bitbucket.png";
import dribbble from "../../../assets/images/brands/dribbble.png";
import dropbox from "../../../assets/images/brands/dropbox.png";
import mail_chimp from "../../../assets/images/brands/mail_chimp.png";
import slack from "../../../assets/images/brands/slack.png";

import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

//NOTE Web App's Array Data
const webAppsData = [
  {
    id: "github_webapp",
    appName: "Github",
    appImage: github,
  },
  {
    id: "bitbucket_webapp",
    appName: "Bitbucket",
    appImage: bitbucket,
  },
  {
    id: "dribble_webapp",
    appName: "Dribble",
    appImage: dribbble,
  },
  {
    id: "dropbox_webapp",
    appName: "Dropbox",
    appImage: dropbox,
  },
  {
    id: "mailchimp_webapp",
    appName: "Mail Chimp",
    appImage: mail_chimp,
  },
  {
    id: "slack_webapp",
    appName: "Slack",
    appImage: slack,
  },
];

const NavbarWebApps = () => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-[9px] rounded-full hover:bg-[#E6EEFD] transition-all duration-300 ease-in-out">
          <BiCategoryAlt size={20} color="#878A99" />
        </span>
      }
      className="w-full max-w-[320px]"
    >
      <Dropdown.Header className="flex items-center justify-between gap-2">
        <span className="block text-dark text-[15px] font-[600] tracking-wide">
          Web Apps
        </span>
        <button className="flex items-center gap-1 bg-[#DFF0FA] hover:bg-[#568df3] text-[#299CDB] hover:text-white px-2 py-1 rounded-[4px] text-[11px] tracking-wide font-[500] transition-all duration-300 ease-in-out">
          View All Apps
          <IoIosArrowForward />
        </button>
      </Dropdown.Header>
      <div className="flex items-center justify-center flex-wrap">
        {webAppsData.map((app) => {
          return (
            <Dropdown.Item
              key={app.id}
              className={`flex flex-col justify-center items-center gap-3 w-[100px] h-[90px] rounded-[4px]`}
            >
              <Image
                src={app.appImage}
                alt={app.appName}
                width={20}
                height={20}
              />
              <span className="text-drak text-[13px] tracking-wide">
                {app.appName}
              </span>
            </Dropdown.Item>
          );
        })}
      </div>
    </Dropdown>
  );
};

export default NavbarWebApps;
