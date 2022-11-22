import { body } from "express-validator";

const commentValidator = [
  body("comment").trim().not().isEmpty().withMessage("Comment is required")
];

export default commentValidator;