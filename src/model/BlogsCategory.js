import mongoose from "mongoose";

const blogsCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const AllBlogsCategoryModel =
  mongoose.models.Category || mongoose.model("Category", blogsCategorySchema);

export default AllBlogsCategoryModel;
