import { body } from 'express-validator';

const postValidator = [
  body('title').not().isEmpty().withMessage("Post title is required"),
  body('content').not().isEmpty().withMessage("Post content is required"),
  body('tags').isArray({ min: 1, max: 5 }).withMessage("Tags can be minimum one and maximum 5")
];

export default postValidator;