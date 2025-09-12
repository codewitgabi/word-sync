import { validateRequest } from "../middlewares/validator.middleware";
import { body } from "express-validator";

export const RegisterUserValidator = [
  body("username").notEmpty().withMessage("This field is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("email")
    .notEmpty()
    .withMessage("This field is required")
    .isEmail()
    .withMessage("Invalid email address"),
  validateRequest, // ! Always add this at the end of the validation chain
];

export const LoginValidator = [
  body("email")
    .notEmpty()
    .withMessage("This field is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  validateRequest, // ! Always add this at the end of the validation chain
];
