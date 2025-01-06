import mongoose from "mongoose";

const blogsDefaultCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "Uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: "uncategorized",
    },
    description: {
      type: String,
      default: "Posts without a specific category.",
    },
    parentCategoryId: {
      type: String,
      default: null,
    },
    colorTheme: {
      type: String,
      default: "#9fa1ad",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    metaTitle: {
      type: String,
      trim: true,
      default: "Uncategorized Posts",
    },
    metaImage: {
      type: String,
      default: "/assets/logo-sm.png",
    },
    metaDescription: {
      type: String,
      trim: true,
      default: "Posts without a specific category.",
    },
  },
  { timestamps: true }
);

const AllBlogsDefaultCategoryModel =
  mongoose.models.DefaultCategory ||
  mongoose.model("DefaultCategory", blogsDefaultCategorySchema);

export default AllBlogsDefaultCategoryModel;
