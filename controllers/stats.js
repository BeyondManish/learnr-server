import Post from "../models/Post.js";
import catchAsync from '../utils/catchAsync.js';

export const getUserPostsStats = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ postedBy: req.user._id }).countDocuments();

  res.status(200).json({
    success: true,
    message: "Stats retrieved successfully",
    data:
      [
        { name: "posts", number: posts },
      ]

  });
});