import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.crypto.title,
};

const DashboardCrypto = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardCrypto</div>
  );
};

export default DashboardCrypto;
