"use server";

import axios from "axios";

// NOTE CREATE A NEW CATEGORY
export const createNewCategory = async (data, userId) => {
  console.log("createNewCategory");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/create-new-category`,
      {
        ...data,
        userId,
      }
    );

    if (response.data.success && response.status === 201) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in creating new category CLIENT: ${error}`);
    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// NOTE GET ALL CATEGORIES
export const getAllCategories = async (userId, search) => {
  console.log("getAllCategories");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/get-all-categories?userId=${userId}&search=${search ? search : ""}`
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        fetchData: response.data.categories,
      };
    }
  } catch (error) {
    console.log(`Error in getting all categories CLIENT: ${error}`);
    const errorMessage =
      error?.response?.data?.errors ||
      error?.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
      fetchData: [],
    };
  }
};

// NOTE Change Category Active Status
export const changeCategoryStatus = async (userId, categoryId, active) => {
  console.log("changeCategoryStatus");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/change-category-active-status`,
      {
        userId,
        categoryId,
        active,
      }
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in changing category active status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        error.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE Change Category Default Status
export const changeCategoryDefaultStatus = async (
  userId,
  categoryId,
  defaultStatus
) => {
  console.log("changeCategoryDefaultStatus");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/change-category-default-status`,
      {
        userId,
        categoryId,
        defaultStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in changing category default status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        error.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE Change Category Featured Status
export const changeCategoryFeaturedStatus = async (
  userId,
  categoryId,
  featuredStatus
) => {
  console.log("changeCategoryFeaturedStatus");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/change-category-featured-status`,
      {
        userId,
        categoryId,
        featuredStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in changing category featured status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        error.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE GET A PERTICULAR CATEGORY
export const getPerticularCategory = async (userId, categoryId) => {
  console.log("getPerticularCategory");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/get-category-details?userId=${userId}&categoryId=${categoryId ? categoryId : ""}`
    );

    if (response.data.success && response.status === 200) {
      return {
        successStatus: true,
        categoryData: response.data.categoryDetails,
      };
    }
  } catch (error) {
    console.log(`Error in getting all categories CLIENT: ${error}`);
    return {
      successStatus: false,
      message:
        error.response.data.message ||
        "An unexpected error occurred. Please try again later.",
      categoryData: {},
    };
  }
};

// NOTE UPDATE A PERTICULAR CATEGORY
export const updatePerticularCategory = async (userId, categoryId, data) => {
  console.log("updatePerticularCategory");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/update-category`,
      {
        userId,
        categoryId,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in updating the category CLIENT: ${error}`);
    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors || "Something went wrong",
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message || "Something went wrong",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// NOTE DELETE A PERTICULAR CATEGORY
export const deletePerticularCategory = async (userId, categoryId) => {
  console.log("deletePerticularCategory");
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/category/delete-category?userId=${userId}&categoryId=${categoryId}`
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in deleting the category CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message || error.message || "Something went wrong",
    };
  }
};
