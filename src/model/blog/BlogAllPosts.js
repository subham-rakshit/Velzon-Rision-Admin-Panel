import mongoose from "mongoose";

const blogAllPostsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
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
      trim: true,
    },
    description: {
      type: String,
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

const AllBlogPostsModel =
  mongoose.models.Blog || mongoose.model("Blog", blogAllPostsSchema);

export default AllBlogPostsModel;