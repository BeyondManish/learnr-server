import mongoose from "mongoose";
import { ObjectId } from "mongoose.Schema.Types";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true,
    max: 20000,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  post: {
    type: ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;