import axios from "axios";

// NOTE CREATE NEW IMAGE
export const createNewImage = async (
  uri,
  data,
  userId,
  handleZodValidationError
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/image/upload-image`,
      {
        ...data,
        userId,
        image: uri,
        imageFileName: data.imageFile.name,
      }
    );

    if (response.data.success && response.status === 201) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in creating new image CLIENT: ${error}`);
    if (error.response) {
      handleZodValidationError(error.response.data);
    } else {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
};

// NOTE GET ALL IMAGES
export const getAllImages = async (userId, search) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/image/get-all-images?userId=${userId}&search=${search || ""}`
    );
    if (response.data.success) {
      return {
        success: true,
        images: response.data.images,
      };
    }
  } catch (error) {
    console.log(`Error in get-all-images action: ${error}`);
    return {
      success: false,
      images: [],
    };
  }
};

// NOTE DELETE PERTICULAR IMAGE
export const deletePerticularImage = async (imageId, userId) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/image/delete-perticular-image?imageId=${imageId}&userId=${userId}`
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in deleting perticular image CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        error.message ||
        "Something went wrong deleting image. Please try again.",
    };
  }
};

// NOTE DOWNLOAD IMAGE
export const downloadPerticularImage = async (imageId, userId) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/image/download-perticular-image?imageId=${imageId}&userId=${userId}`,
      // {
      //   headers: {
      //     // 'Content-Encoding': 'binary',
      //     responseType: 'blob'
      //   }
      // }
      {
        responseType: "arraybuffer",
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        responseData: response,
      };
    }
  } catch (error) {
    console.log(`Error in downloading image CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        error.message ||
        "Something went wrong while downloading image. Please try again.",
    };
  }
};
