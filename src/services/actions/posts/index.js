import axios from "axios";

export const createNewPost = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/post/create-post`,
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
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
