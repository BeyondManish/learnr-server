import mongoose from "mongoose";
import { ObjectId } from "mongoose.Schema.Types";

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
      type: ObjectId,
      ref: "User",
      required: true,
    },
    category: [{ type: ObjectId, ref: "Category", required: true }],
    tags: [{ type: ObjectId, ref: "Tag", required: true }],
    featuredImage: {
      type: ObjectId,
      ref: "Media",
    },
    published: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
