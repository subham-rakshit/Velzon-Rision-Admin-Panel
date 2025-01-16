import axios from "axios";

// NOTE UPPY CHECK FILES (List of perticular object [{}]) IN DB
export const checkFilesInDB = async (files) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/files/get-file-info?name=${files[0].name}&type=${files[0].type}&size=${files[0].size}&userId=${files[0].userId}`
    );

    if (response.data.success) {
      return {
        fileData: response.data.file,
      };
    }
  } catch (error) {
    console.log(`Error in get-all-images action: ${error.response}`);
    return {
      fileData: null,
    };
  }
};

// NOTE UPPY UPLOAD Files (List of files [{}, {}, {}]) in DB
export const uploadFilesToDB = async (file) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/files/store-new-files`,
      {
        ...file,
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
    return {
      success: false,
      message:
        error.response.data.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE UPPY GET ALL FILES
export const getAllFilesFromDB = async (
  userId,
  search = "",
  page = 1,
  pageSize = 24,
  selectedFileType = ""
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/files/get-all-files?userId=${userId}&search=${search}&page=${page}&pageSize=${pageSize}&selectedFileType=${selectedFileType}`
    );
    if (response.data.success) {
      return {
        success: true,
        filesList: response.data.files,
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`Error in get-all-images action: ${error}`);
    return {
      success: false,
      filesList: [],
      paginationData: {},
      errorMessage:
        error.response.data.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE UPPY DOWNLOAD FILE
export const downloadFile = async (fileKey, contentType, userId) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/files/download-file?fileKey=${fileKey}&contentType=${contentType}&userId=${userId}`
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
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE UPPY DELETE FILE
export const deleteFileFromDB = async (fileKey, userId) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/files/delete-file?fileKey=${fileKey}&userId=${userId}`
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`Error in deleting file CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response.data.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

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
