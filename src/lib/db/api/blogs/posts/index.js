"use server";

import axios from "axios";

// NOTE CREATE A NEW BLOG POST
export const createNewBlogPost = async (data, userId) => {
  console.log("createNewBlogPost");
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
export const getAllBlogPosts = async (
  userId,
  search,
  page,
  pageSize,
  category,
  status,
  featured
) => {
  console.log("getAllBlogPosts");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/get-all-posts?userId=${userId}&search=${search ? search : ""}&page=${page ? page : 1}&pageSize=${pageSize ? pageSize : 9}&category=${category ? category : ""}&status=${status ? status : ""}&featured=${featured ? featured : ""}`
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

// NOTE GET A PERTICULAR POST
export const getPerticularPost = async (userId, postId) => {
  console.log("getPerticularPost");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/get-post-details?userId=${userId || ""}&postId=${postId || ""}`
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        postData: response.data.postDetails,
      };
    }
  } catch (error) {
    console.log(`Error in getting all categories CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE UPDATE A PERTICULAR POST
export const updatePerticularPost = async (userId, postId, data) => {
  console.log("updatePerticularPost");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/update-post`,
      {
        ...data,
        userId,
        postId,
      }
    );
    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
        postTile: response.data.titleName,
      };
    }
  } catch (error) {
    console.log(`Error in updating the post CLIENT: ${error}`);

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

// NOTE DELETE A PERTICULAR POST
export const deletePerticularPost = async (userId, postId) => {
  console.log("deletePerticularPost");
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/delete-post?userId=${userId}&postId=${postId}`
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
        error.response.data.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE ACTIVE A PERTICULAR POST
export const postToggleActiveStatus = async (userId, postId) => {
  console.log("postToggleActiveStatus");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/change-post-active-status`,
      {
        userId,
        postId,
      }
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in changing post active status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        error.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE FEATURED A PERTICULAR POST
export const postToggleFeaturedStatus = async (userId, postId) => {
  console.log("postToggleFeaturedStatus");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/blog/post/change-post-featured-status`,
      {
        userId,
        postId,
      }
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in changing post featured status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        error.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
