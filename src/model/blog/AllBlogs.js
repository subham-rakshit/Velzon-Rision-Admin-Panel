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
    slug: {
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
    bannerImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    shortDescription: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      index: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    source: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },
    metaImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
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
