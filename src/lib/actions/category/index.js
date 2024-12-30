import axios from "axios";

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

// TODO NEED TO WORK ------>
export const updatePerticularCategory = async (userId, categoryId) => {};

export const deletePerticularCategory = async (userId, categoryId) => {};
