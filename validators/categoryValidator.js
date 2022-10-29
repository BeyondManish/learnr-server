import { body } from "express-validator";

const categoryValidator = [
  body("name").not().isEmpty().withMessage("Category name is required")
];

export default categoryValidator;