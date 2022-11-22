import Post from "../models/Post.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import Media from "../models/Media.js";
import catchAsync from '../utils/catchAsync.js';

export const getStats = catchAsync(async (req, res, next) => {
  const posts = await Post.countDocuments();
  const users = await User.countDocuments();
  const categories = await Category.countDocuments();
  const comments = await Comment.countDocuments();
  const medias = await Media.countDocuments();

  res.status(200).json({
    success: true,
    message: "Stats retrieved successfully",
    data:
      [
        { name: "Posts", number: posts },
        { name: "Users", number: users },
        { name: "Categories", number: categories },
        { name: "Comments", number: comments },
        { name: "Medias", number: medias }
      ]

  });
});