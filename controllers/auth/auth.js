import User from '../../models/User.js';

export const signup = async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    // check if user with email already exits already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: 'Email is taken. Please login.',
      });
    }

    // check if user with username already exits already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        message: 'Username is taken.',
      });
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
      message: 'User created.',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Something went wrong.',
    });
  }
};

export const login = async (req, res, next) => {
  // extract the req body
  const { email, password } = req.body;

  // check if user with email exists
  const user = await User.findOne({ email });

  // if user does not exist
  if (!user) {
    return res.status(400).json({
      message: "User doesn't exist. Please signup.",
    });
  } else {
    // if user exists
    // check if the password is correct
    const isCorrectPassword = await user.isCorrectPassword(password);
    if (isCorrectPassword) {
      res.status(200).json({
        message: 'Logged in successfully.',
        data: {
          user,
        },
      });
    } else {
      res.status(200).json({
        message: 'Incorrect email or password.',
      });
    }
  }
};
