import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";

export const updateChildCategories = async (categoryId, userId, isFeatured) => {
  // Find all child categories of the category
  const childCategories = await AllBlogsCategoryModel.find({
    userId,
    parentCategoryId: categoryId,
  });

  // Update each child category's isFeatured status
  for (let category of childCategories) {
    await AllBlogsCategoryModel.findByIdAndUpdate(
      category._id,
      { $set: { isFeatured: !isFeatured } },
      { new: true }
    );

    // Recursively update children of this category (if any)
    await updateChildCategories(category._id, userId, isFeatured);
  }
};
