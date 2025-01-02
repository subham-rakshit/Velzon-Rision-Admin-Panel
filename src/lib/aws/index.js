import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

// Create instance of S3Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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
