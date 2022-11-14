import Post from '../models/Post.js';
import catchAsync from '../utils/catchAsync.js';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

export const create = catchAsync(async (req, res) => {
  const { title, content, categories, isPublished, featuredImage } = req.body;
  const { _id } = req.user;
  const slug = (slugify(title) + '-' + nanoid(6)).toLowerCase();


  const post = await Post.create({ title, content, categories, isPublished, slug, author: _id, featuredImage: featuredImage });

  // send response
  res.status(201).json({
    status: 'success',
    message: 'Post created successfully',
    data: {
      post
    }
  });
});

// read post

export const read = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug })
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
    .populate('categories', 'name slug').sort({ createdAt: -1 })
    .populate('featuredImage', 'url');
  res.status(200).json({
    status: 'success',
    message: 'All posts fetched successfully',
    data: {
      posts
    }
  });
});