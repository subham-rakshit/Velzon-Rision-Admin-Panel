import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

// Create instance of S3Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// NOTE UPLOAD NEW IMAGE
export const awsS3ClientUploadNewImage = async (image) => {
  try {
    // Prepare the S3 upload params
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const imageType = image.split(";")[0].split("/")[1]; // data:image/png;base64 -> data:image/png -> png

    const imageParams = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: `${nanoid()}.${imageType}`,
      Body: base64Data,
      ContentEncoding: "base64",
      ContentType: `image/${imageType}`,
    };

    // Upload the image to S3
    await s3Client.send(new PutObjectCommand(imageParams));

    // Construct the public URL for the uploaded image
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageParams.Key}`;

    return {
      success: true,
      imageUrl: imageUrl,
      imageParams: imageParams,
    };
  } catch (error) {
    console.log(`Error in uploading image in AWS S3 CLIENT: ${error}`);
    return {
      success: false,
      message: error.message,
    };
  }
};

// NOTE DELETE IMAGE
export const awsS3ClientDeleteImage = async (imageKey) => {
  try {
    // Prepare the S3 upload params
    const imageParams = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: imageKey,
    };

    // Delete the image in AWS S3
    await s3Client.send(new DeleteObjectCommand(imageParams));

    return {
      success: true,
      message: "Image deleted successfully.",
    };
  } catch (error) {
    console.log(`Error in deleting image in AWS S3 CLIENT: ${error}`);
    return {
      success: false,
      message:
        "Something went wrong in deleting image in AWS S3. Please try again later.",
    };
  }
};

// NOTE DOWNLOAD IMAGE
export const awsS3ClientDownloadImage = async (imageKey) => {
  try {
    // Prepare the S3 upload params
    const imageParams = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: imageKey,
    };

    // Download the image from S3
    const imageResponseData = await s3Client.send(
      new GetObjectCommand(imageParams)
    );

    if (imageResponseData["$metadata"].httpStatusCode === 200) {
      return {
        success: true,
        responseData: imageResponseData,
      };
    }
  } catch (error) {
    console.log(`Error in downloading image in AWS S3 CLIENT: ${error}`);
    return {
      success: false,
      message:
        "Something went wrong in downloading image in AWS S3. Please try again later.",
    };
  }
};
