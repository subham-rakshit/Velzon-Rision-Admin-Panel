import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uploaderInfo: {
      type: Object,
      required: true,
    },
    imageS3Key: {
      type: String,
      required: true,
    },
    imageFileName: {
      type: String,
      required: true,
    },
    imageType: {
      type: String,
      required: true,
    },
    minWidth: {
      type: Number,
      default: 0,
    },
    minHeight: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const ImageModel =
  mongoose.models.Image || mongoose.model("Image", imageSchema);

export default ImageModel;
