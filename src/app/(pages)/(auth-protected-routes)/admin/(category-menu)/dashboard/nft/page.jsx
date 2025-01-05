import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";

export const metadata = {
  title: titlesObject.nft.title,
};

const DashboardNft = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardNft</div>
  );
};

export default DashboardNft;
