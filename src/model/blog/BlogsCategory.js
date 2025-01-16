import mongoose from "mongoose";

const blogsCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },
    metaImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const AllBlogsCategoryModel =
  mongoose.models.Category || mongoose.model("Category", blogsCategorySchema);

export default AllBlogsCategoryModel;
