import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

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
    data: {
      users,
    }
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
    data: {
      user,
    }
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  await user.remove();
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

export const editUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const { firstname, lastname, email, photo } = req.body;
  const user = await User.findOneAndUpdate({ username }, {
    firstname, lastname, email, photo
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: {
      user,
    }
  });
});