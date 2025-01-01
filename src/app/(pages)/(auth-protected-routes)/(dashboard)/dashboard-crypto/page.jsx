import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";

export const metadata = {
  title: titlesObject.crypto.title,
};

const DashboardCrypto = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardCrypto</div>
  );
};

export default DashboardCrypto;
