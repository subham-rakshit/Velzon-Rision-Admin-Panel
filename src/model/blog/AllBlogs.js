import mongoose from "mongoose";

const allBlogsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
    },
    bannerImage: {
      type: String,
      default: "/assets/auth-images/auth-one-bg.jpg",
    },
    shortDescription: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      index: true,
      trim: true,
    },
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },
    metaImage: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const AllBlogsModel =
  mongoose.models.Blog || mongoose.model("Blog", allBlogsSchema);

export default AllBlogsModel;
