import { body } from "express-validator";

const commentValidator = [
  body("content").trim().not().isEmpty().withMessage("Comment content is required")
];

export default commentValidator;