export const buildCategoryTree = (categories) => {
  // NOTE 1: Create a map to hold each category by its _id and initialize an empty children array for each category
  const map = {};
  categories.forEach((category) => {
    // Store each category in the map using its _id as the key and initialize an empty children array
    map[category._id] = { ...category, children: [] };
  });

  // NOTE 2: Initialize an empty array to store the final tree structure
  const tree = [];

  // NOTE 3: Iterate through the categories again to build the tree
  categories.forEach((category) => {
    if (category.parentCategoryId) {
      // If the category has a parent, find the parent in the map and add this category to the parent's children array
      map[category.parentCategoryId].children.push(map[category._id]);
    } else {
      // If the category has no parent (i.e., it's a top-level category), add it directly to the tree array

      tree.push(map[category._id]);
    }
  });

  // NOTE 4: Return the final tree structure
  return tree;
};
