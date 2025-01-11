import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";

export const updateChildCategories = async (categoryId, active) => {
  // Child featured changes only happen if parent want to be inactive (means when active = true)
  if (!active) return;

  // Find all child categories of the category
  const childCategories = await AllBlogsCategoryModel.find({
    parentCategoryId: categoryId,
    activeStatus: true,
  }).exec();

  // Update each child category's activeStatus
  for (let category of childCategories) {
    await AllBlogsCategoryModel.findByIdAndUpdate(
      category._id,
      { $set: { activeStatus: !active } },
      { new: true }
    ).exec();

    // Recursively update children of this category (if any)
    await updateChildCategories(category._id, active);
  }
};

export const updateParentCategories = async (parentId, active) => {
  // Only update if activeStatus is false and parentId is not null
  if (active || !parentId) return;

  // Find the unfeatured parent category
  const parentCategoryDetails = await AllBlogsCategoryModel.findOne({
    _id: parentId,
    activeStatus: false,
  }).exec();

  if (!parentCategoryDetails) return;

  // Update the parent category
  await AllBlogsCategoryModel.findByIdAndUpdate(
    parentId,
    { $set: { activeStatus: true } },
    { new: true }
  ).exec();

  // Recursively update parent categories of this category (if any)
  await updateParentCategories(parentCategoryDetails.parentCategoryId, active);
};

export const checkDefaultChildCategoryPresence = async (categoryId) => {
  // Find all child categories of the category
  const childCategories = await AllBlogsCategoryModel.find({
    parentCategoryId: categoryId,
  }).exec();

  // Check if any child is a default category
  for (let category of childCategories) {
    if (category.isDefault) {
      return true; // Found a default category
    }

    // Recursively check the child's children
    const hasDefaultInChildren = await checkDefaultChildCategoryPresence(
      category._id
    );
    if (hasDefaultInChildren) {
      return true; // Found a default category in children
    }
  }

  // No default category found in this branch
  return false;
};
