import axios from "axios";

// NOTE GET ALL CATEGORIES
export const getAllCategories = async (userId, search) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/post/get-all-categories?userId=${userId}&search=${search}`
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        fetchData: response.data.categories,
      };
    }
  } catch (error) {
    console.log(`Error in getting all categories CLIENT: ${error}`);
    return {
      success: false,
      fetchData: [],
    };
  }
};

// NOTE CREATE A NEW CATEGORY
export const createNewCategory = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/post/create-new-category`,
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
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.errors ||
          error.response.data.message ||
          error.message ||
          "Something went wrong",
      };
    }
  }
};

// NOTE UPDATE A PERTICULAR CATEGORY
export const updatePerticularCategory = async (userId, categoryId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/post/update-category`,
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
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.errors ||
          error.response.data.message ||
          error.message ||
          "Something went wrong",
      };
    }
  }
};

// NOTE DELETE A PERTICULAR CATEGORY
export const deletePerticularCategory = async (userId, categoryId) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/post/delete-category?userId=${userId}&categoryId=${categoryId}`
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
