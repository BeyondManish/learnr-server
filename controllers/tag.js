import Tag from "../models/Tag.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import slugify from "slugify";

// create tag
export const create = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name).toLowerCase();
  const categoryExist = await Tag.findOne({ slug });

  // if tag already exists
  if (categoryExist) {
    return next(new AppError("Tag already exists.", 400));
  }
  // else create new tag
  const tag = new Tag({
    name, slug
  });
  await tag.save();
  res.status(201).json({
    status: "success",
    message: "Tag created.",
    data: {
      tag
    }
  });
});

// update tag => Nobody updates the tags?

// export const update = catchAsync(async (req, res, next) => {
//   const { slug } = req.params;
//   const { name } = req.body;
//   // update tag
//   const tag = await Tag.findOneAndUpdate({ slug }, { name, slug: slugify(name).toLowerCase() }, { new: true });
// 
//   res.status(200).json({
//     status: "success",
//     message: "Tag updated.",
//     data: { tag },
//   });
// });

// deleting the tag
export const remove = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  // delete tag
  await Tag.findOneAndDelete({ slug });
  res.status(200).json({
    status: "success",
    message: "Tag deleted.",
  });
});

// get all categories

export const getAllTags = catchAsync(async (req, res, next) => {
  const tags = await Tag.find();
  res.status(200).json({
    status: "success",
    message: "Tag fetched.",
    tags
  });
});