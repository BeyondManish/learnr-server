import Comment from "../models/Comment.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res, next) => {
  // get post id from the slug in url and comment author from the req.url
  const userId = req.user._id;
  const { comment, postId } = req.body;
  const newComment = await Comment.create({ author: userId, comment: comment, post: postId });
  console.log(newComment);
  const commentDetail = await Comment.findById(newComment._id).populate("author", "firstname lastname username photo").populate("post", "title slug");
  console.log(commentDetail);
  res.status(201).json({ status: "success", message: "Comment posted successfully", comment: commentDetail });
});

export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find().populate("author", "username").populate("post", "title slug");
  console.log(comments);
  return res.status(200).json({
    status: "success",
    message: "All comment fetched successfully",
    data: { comments }
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const comment = Comment.findOne({ _id: req.params.id });
  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }
  await comment.deleteOne();
  return res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
  });
});

export const getPostComments = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ post: postId })
    .populate("author", "firstname lastname username photo");
  return res.status(200).json({
    status: "success",
    message: "All comment fetched successfully",
    data: { comments }
  });
});