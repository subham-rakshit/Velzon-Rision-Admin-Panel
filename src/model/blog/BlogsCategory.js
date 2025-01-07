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
      type: mongoose.Schema.Types.Mixed, // Allowing mixed type for both ObjectId and "none"
      default: "none",
      validate: {
        validator: async function (value) {
          if (value === "none") return true; // Allow "none" as a valid value
          return mongoose.Types.ObjectId.isValid(value); // Otherwise check for valid ObjectId
        },
        message:
          "Parent category must be 'none' or a valid existing category id.",
      },
    },
    colorTheme: {
      type: String,
      default: "#495057",
    },
    isFeatured: {
      type: Boolean,
      default: true,
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
