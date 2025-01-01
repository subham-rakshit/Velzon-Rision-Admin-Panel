import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";

export const metadata = {
  title: titlesObject.job.title,
};

const DashboardJob = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardJob</div>
  );
};

export default DashboardJob;
