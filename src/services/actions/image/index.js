import axios from "axios";

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
