import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import Post from "../models/Post.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return res.status(200).json({
      status: "success",
      message: "No users found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "All users fetched",
    users
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    user
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  await Post.deleteMany({ author: user._id });
  await user.remove();
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

export const editUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  console.log(username);
  const { firstname, lastname, email, photo, role } = req.body;
  let user;
  if (photo) {
    user = await User.findOneAndUpdate({ username }, {
      firstname, lastname, email, photo, role
    });
  } else {
    user = await User.findOneAndUpdate({ username }, {
      firstname, lastname, email, role
    });
  }
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    user
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const { firstname, lastname, email, photo } = req.body;
  const user = await User.findOne({ username });
  // check if the user requesting is same as the user being updated
  if (user._id.toString() !== req.user._id.toString()) {
    return next(new AppError("You are not authorized to update this user", 403));
  }
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  await user.updateOne({
    firstname, lastname, email, photo
  });
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    user
  });
});

// get user posts
export const getUserPosts = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const posts = await Post.find({ author: user._id })
    .populate("author", "firstname lastname username photo")
    .populate("featuredImage", "url")
    .populate("tags", "name slug");
  console.log(posts);
  res.status(200).json({
    status: "success",
    message: "User posts fetched successfully",
    posts
  });
});