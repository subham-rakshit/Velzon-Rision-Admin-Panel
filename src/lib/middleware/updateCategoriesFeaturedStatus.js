import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";

export const updateChildCategories = async (categoryId, isFeatured) => {
  // Child featured changes only happen if parent's isFeatured is false
  if (!isFeatured) return;

  // Find all child categories of the category
  const childCategories = await AllBlogsCategoryModel.find({
    parentCategoryId: categoryId,
    isFeatured: true,
  });

  // Update each child category's isFeatured status
  for (let category of childCategories) {
    await AllBlogsCategoryModel.findByIdAndUpdate(
      category._id,
      { $set: { isFeatured: !category.isDefault ? !isFeatured : true } },
      { new: true }
    );

    // Recursively update children of this category (if any)
    await updateChildCategories(category._id, isFeatured);
  }
};

export const updateParentCategories = async (parentId, isFeatured) => {
  // Only update if isFeatured is false and parentId is not null
  if (isFeatured || !parentId) return;

  // Find the unfeatured parent category
  const parentCategoryDetails = await AllBlogsCategoryModel.findOne({
    _id: parentId,
    isFeatured: false,
  });

  if (!parentCategoryDetails) return;

  // Update the parent category
  await AllBlogsCategoryModel.findByIdAndUpdate(
    parentId,
    { $set: { isFeatured: true } },
    { new: true }
  );

  // Recursively update parent categories of this category (if any)
  await updateParentCategories(
    parentCategoryDetails.parentCategoryId,
    isFeatured
  );
};
