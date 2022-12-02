import Post from '../models/Post.js';
import Category from '../models/Category.js';
import catchAsync from '../utils/catchAsync.js';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

export const create = catchAsync(async (req, res) => {
  let { title, content, categories, isPublished, featuredImage } = req.body;
  const { _id } = req.user;
  const slug = (slugify(title) + '-' + nanoid(6)).toLowerCase();
  let newPost;
  if (!featuredImage) {
    newPost = await Post.create({ title, content, categories, isPublished, slug, author: _id });
  } else {
    newPost = await Post.create({ title, content, categories, isPublished, slug, author: _id, featuredImage });
  };
  // send response
  res.status(201).json({
    status: 'success',
    message: 'Post created successfully',
    data: {
      newPost
    }
  });
});

// read post

export const getPost = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug: slug })
    .populate('author', 'firstname lastname username photo')
    .populate('categories', 'name slug')
    .populate('featuredImage', 'url');
  if (!post) {
    return res.status(404).json({
      status: 'error',
      message: 'Post not found'
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'Post fetched successfully',
    data: {
      post
    }
  });
});


// get all post
export const getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find({})
    .populate('author', 'username firstname lastname photo')
    .populate('categories', 'name slug')
    .populate('featuredImage', 'url')
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    message: 'All posts fetched successfully',
    data: {
      posts
    }
  });
});

export const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete({ _id: id });
  if (!post) {
    return res.status(404).json({
      status: 'error',
      message: 'Post not found'
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'Post deleted successfully',
  });
});

export const editPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, categories, isPublished, featuredImage } = req.body;
  const post = await Post.findByIdAndUpdate(id, {
    title, content, categories, isPublished, featuredImage
  });
  if (!post) {
    return res.status(404).json({
      status: 'error',
      message: 'Post not found'
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'Post updated successfully',
    data: {
      post
    }
  });
});

export const getCategoryPosts = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug });
  const posts = await Post.find({ categories: category._id })
    .populate('author', 'firstname lastname username photo')
    .populate('categories', 'name slug')
    .populate('featuredImage', 'url')
    .sort({ createdAt: -1 });
  if (!posts) {
    return next(new AppError("No posts found", 404));
  }
  console.log(posts);
  res.status(200).json({
    status: 'success',
    message: 'Posts fetched successfully',
    data: {
      posts, category
    }
  });
});

export const getPosts = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const posts = await Post.find({ author: _id });
  if (!posts) {
    return next(new AppError("No posts found", 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Posts fetched successfully',
    data: {
      posts
    }
  });
});