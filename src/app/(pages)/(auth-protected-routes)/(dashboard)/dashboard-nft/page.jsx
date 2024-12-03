import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.nft.title,
};

const DashboardNft = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardNft</div>
  );
};

export default DashboardNft;
