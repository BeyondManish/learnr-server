import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";

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