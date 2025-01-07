import { SelectItem } from "@/components/ui/select";

const renderOptions = (categoryList, level = 0) => {
  return categoryList.map((category) => (
    <div key={category._id}>
      <SelectItem
        value={category._id}
        disabled={!category.isFeatured}
        className={`${category.parentCategoryId === "none" ? "text-[14px] bg-green-500/10 font-poppins-md" : "text-[12px]"} font-poppins-rg text-dark-weight-600 dark:text-light-weight-550`}
      >
        {"- ".repeat(level)} {category.name}
      </SelectItem>

      {category.children.length > 0 &&
        renderOptions(category.children, level + 1)}
    </div>
  ));
};

const RenderCategoryOptions = ({ categoryList }) => {
  return <>{renderOptions(categoryList)}</>;
};

export default RenderCategoryOptions;
