import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";

export const metadata = {
  title: titlesObject.projects.title,
};

const DashboardProjects = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>
      DashboardProjects
    </div>
  );
};

export default DashboardProjects;
