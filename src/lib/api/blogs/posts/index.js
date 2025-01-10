import axios from "axios";

// NOTE CREATE A NEW BLOG POST
export const createNewBlogPost = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/create-post`,
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
    console.log(`Error in creating new post CLIENT: ${error}`);
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

// NOTE GET ALL BLOG POSTS
export const getAllBlogPosts = async (userId, search, page, limit) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/get-all-posts?userId=${userId}&search=${search ? search : ""}&page=${page ? page : 1}&limit=${limit ? limit : 9}`
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        fetchData: response.data.posts,
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`Error in getting all posts CLIENT: ${error}`);
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
