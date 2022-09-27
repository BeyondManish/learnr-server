import Category from "../models/Category.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import slugify from "slugify";

// create category
export const create = catchAsync(async (req, res, next) => {
  const {name}  = req.body;
  const slug = slugify(name).toLowerCase();
  const categoryExist = await Category.findOne({slug});

  // if category already exists
  if (categoryExist) {
    return next(new AppError("Category already exists.", 400));
  }
  // else create new category
  const category = new Category({
    name, slug
  })
  await category.save();
  res.status(201).json({
    status: "success",
    message: "Category created.",
    data: {
      category
    }
  });
});

// updating category
export const update = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { name } = req.body;
  // update category
  const category = await Category.findOneAndUpdate({ slug }, { name, slug: slugify(name).toLowerCase() }, { new: true });

  res.status(200).json({
    status: "success",
    message: "Category updated.",
    data: { category },
  });
});

// deleting the category
export const remove = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  // delete category
  await Category.findOneAndDelete({ slug });
  res.status(200).json({
    status: "success",
    message: "Category deleted.",
  });
});

// get all categories

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    message: "Categories fetched.",
    data: {
      categories
    },
  })
});