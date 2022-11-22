import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    required: true,
    max: 20000,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;