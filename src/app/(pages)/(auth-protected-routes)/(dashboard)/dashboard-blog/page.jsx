import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";

export const metadata = {
  title: titlesObject.blog.title,
};

const DashboardBlog = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardBlog</div>
  );
};

export default DashboardBlog;
