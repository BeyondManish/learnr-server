import catchAsync from '../utils/catchAsync.js';
import uniqueSlug from '../utils/uniqueSlug.js';
import Question from '../models/Question.js';

export const createQuestion = catchAsync(async (req, res, next) => {
  const { title, description, tags, options, correctOptions } = req.body;
  const { user } = req;
  const slug = uniqueSlug(title);

  const newQuestion = await Question.create({
    title,
    description,
    tags,
    options,
    correctOptions,
    slug,
    author: user._id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Question created successfully',
    question: newQuestion,
  });
});

export const getQuestions = catchAsync(async (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const questions = await Question.find({}).populate('tags').populate('author').limit(limit).skip(skip);
  const count = await Question.countDocuments();

  res.status(200).json({
    status: 'success',
    message: 'Questions fetched successfully',
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    questions,
  });
});

export const getQuestion = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const question = await Question.findOne({ slug }).populate('tags').populate('author');
  res.status(200).json({
    status: 'success',
    message: 'Question fetched successfully',
    question,
  });
});

export const updateQuestion = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { title, description, tags, options, correctOptions } = req.body;

  const question = await Question.findOneAndUpdate({ slug }, { title, description, tags, options, correctOptions }, { new: true, runValidators: true });
  res.status(200).json({
    status: 'success',
    message: 'Question updated successfully',
    question,
  });
});