import { validateRequest } from "../middlewares/validator.middleware";
import { body } from "express-validator";

export const createDocumentValidator = [
  body("title")
    .notEmpty()
    .withMessage("This field is required")
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters"),
  validateRequest, // ! Always add this at the end of the validation chain
];
