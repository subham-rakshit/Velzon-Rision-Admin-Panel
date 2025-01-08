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
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    colorTheme: {
      type: String,
      default: "#495057",
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },
    metaImage: {
      type: String,
      default: "",
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
