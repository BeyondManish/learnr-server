import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const signup = catchAsync(async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  // check if user with email already exits already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return next(new AppError('Email already exists.', 400));
  }
  // check if user with username already exits already exists
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return next(new AppError('Username is taken.', 400));
  }

  // create new user
  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password,
  });
  await user.save();
  res.status(201).json({
    status: 'success',
    message: 'User created.',
    data: {
      user,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  // extract the req body
  const { email, password } = req.body;

  // check if user with email exists
  const user = await User.findOne({ email });

  // if user does not exist
  if (!user) {
    return next(new AppError(`User doesn't exist.`, 400));
  } else {
    // if user exists
    // check if the password is correct
    const isCorrectPassword = await user.isCorrectPassword(password);
    if (isCorrectPassword) {
      res.status(200).json({
        status: 'success',
        message: 'Logged in successfully.',
        data: {
          user,
        },
      });
    } else {
      return next(new AppError('Invalid email or password', 401));
    }
  }
});
