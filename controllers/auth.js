import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
// import { sendEmailOnRegister } from '../utils/sendEmail.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const createAndSendToken = (res, message, statusCode, user) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), //convert into ms
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // remove password
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message: message,
    token,
    data: {
      user,
    },
  });
};


export const signup = catchAsync(async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  // TODO: add this on line 30+ send email
  // sendEmailOnRegister(email, firstname, res);
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
  const user = await User.create({ firstname, lastname, username, email, password });
  // takes in the response, message, status code, and user
  createAndSendToken(res, "Registered Successfully", 201, user);
});

export const login = catchAsync(async (req, res, next) => {
  // extract the req body
  const { email, password } = req.body;

  // check if user with email exists
  const user = await User.findOne({ email }).select('+password');

  // if user does not exist
  if (!user) {
    return next(new AppError(`User doesn't exist.`, 400));
  } else {
    // if user exists
    // check if the password is correct
    const isCorrectPassword = await user.isCorrectPassword(password);
    if (isCorrectPassword) {
      createAndSendToken(res, "Logged in successfully", 201, user);
    } else {
      return next(new AppError('Invalid email or password', 401));
    }
  }
});

export const requireLogin = async (req, res, next) => {
  let token;
  // getting token and check if it exists
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  // verification token
  if (!token) {
    return next(new AppError('You are not logged in. Please log in.', 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  console.log(decoded);
  // check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User no longer exists.', 401));
  }
  // check if the user changed its password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(new AppError('User recently changed password. Please log in again.', 401));
  // }
  // grant access to protected route
  req.user = currentUser;
  next();
};

export const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role != "admin") {
    return next(new AppError("Access Denied!", 403));
  } else {
    next();
  }
};