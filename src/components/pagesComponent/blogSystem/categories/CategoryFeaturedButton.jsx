import { Switch } from "@/components/ui/switch";

const CategoryFeaturedButton = ({ userId, categoryDetails }) => {
  console.log(categoryDetails.isFeatured);
  return (
    <Switch
      defaultChecked={categoryDetails.isFeatured}
      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20 h-4 w-8"
      thumbClassName="data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20 h-3 w-3"
    />
  );
};

export default CategoryFeaturedButton;
