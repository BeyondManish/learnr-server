import Comment from "../models/Comment.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res, next) => {
  // get post id from the slug in url and comment author from the req.url
  const userId = req.user._id;
  const { content, postId } = req.body;
  const comment = await Comment.create({ author: userId, content, postId });
  const commentDetail = await comment.populate("author", "firstname lastname username photo");
  res.status(201).json({ status: "success", message: "Comment posted successfully", commentDetail });
  //
});

export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();
  return res.status(200).json({
    status: "success",
    message: "All comment fetched successfully",
    data: comments
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const comment = Comment.find();
});