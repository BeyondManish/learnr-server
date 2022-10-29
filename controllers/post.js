import Post from '../models/Post.js';
import catchAsync from '../utils/catchAsync.js';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

export const create = catchAsync(async (req, res) => {
  const { title, content, categories, isPublished } = req.body;
  const { _id } = req.user;
  const slug = slugify(title) + '-' + nanoid(8);


  const post = await Post.create({ title, content, categories, isPublished, slug, author: _id });
  console.log(post);

  // save post
  await post.save();
  // send response
  res.status(201).json({
    status: 'success',
    message: 'Post created successfully',
    data: {
      post
    }
  });
});

// get all post
export const getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find({}).populate('author', 'username firstname lastname photo').populate('categories', 'name slug').sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    message: 'All posts fetched successfully',
    data: {
      posts
    }
  });
});