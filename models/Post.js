import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {},
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
    featuredImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    isPublished: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
