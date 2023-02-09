import slugify from 'slugify';
import Post from '../models/Post.js';
import Tag from '../models/Tag.js';
import catchAsync from '../utils/catchAsync.js';
import uniqueSlug from '../utils/uniqueSlug.js';

export const create = catchAsync(async (req, res) => {
  let { title, content, tags, isPublished, featuredImage } = req.body;
  const { _id } = req.user;
  const slug = uniqueSlug(title);
  let tagIds = [];
  // handle tags
  await Promise.all(tags.map(async (tag) => {
    let tagExists = await Tag.findOne({ name: tag });
    if (tagExists) {
      tagIds.push(tagExists._id.toString());
      console.log(tagIds);
    } else {
      await Tag.create({ name: tag, slug: slugify(tag).toLowerCase() }).then((newTag) => { tagIds.push(newTag._id.toString()); });
    }
  }));

  let newPost;
  if (!featuredImage) {
    newPost = await Post.create({ title, content, tags: tagIds, isPublished, slug, author: _id });
  } else {
    newPost = await Post.create({ title, content, tags: tagIds, isPublished, slug, author: _id, featuredImage });
  };
  // send response
  return res.status(201).json({
    status: 'success',
    message: 'Post created successfully',
    post: newPost
  });
});

// read post

export const getPost = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug })
    .populate('author', 'firstname lastname username photo')
    .populate('tags', 'name slug')
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
  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const total = await Post.countDocuments();
  const totalPages = Math.ceil(total / limit);

  const posts = await Post.find({})
    .populate('author', 'username firstname lastname photo')
    .populate('tags', 'name slug')
    .populate('featuredImage', 'url')
    .sort({ createdAt: -1 }).limit(limit).skip(skip);

  res.status(200).json({
    status: 'success',
    message: 'All posts fetched successfully',
    posts,
    page,
    totalPages,
  });
});

export const deletePost = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findByIdAndDelete({ slug });
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
  let tagIds = [];

  let { title, content, tags, isPublished, featuredImage } = req.body;
  featuredImage = featuredImage ? featuredImage : null;
  // handle tags
  await Promise.all(tags.map(async (tag) => {
    let tagExists = await Tag.findOne({ name: tag });
    if (tagExists) {
      tagIds.push(tagExists._id.toString());
    } else {
      await Tag.create({ name: tag, slug: slugify(tag).toLowerCase() }).then((newTag) => { tagIds.push(newTag._id.toString()); });
    }
  }));
  // update post
  const post = await Post.findByIdAndUpdate(id, {
    title, content, tags: tagIds, isPublished, featuredImage
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

export const getTagPosts = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const tag = await Tag.findOne({ slug });
  const posts = await Post.find({ tags: tag._id })
    .populate('author', 'firstname lastname username photo')
    .populate('tags', 'name slug')
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
      posts, tag
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