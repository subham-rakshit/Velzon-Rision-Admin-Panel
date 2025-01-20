"use server";

import axios from "axios";

// NOTE UPPY CHECK FILES (List of perticular object [{}]) IN DB
export const checkFilesInDB = async (files) => {
  console.log("checkFilesInDB");
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
  console.log("uploadFilesToDB");
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
  console.log("getAllFilesFromDB");
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
  console.log("downloadFile");
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
  console.log("deleteFileFromDB");
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
