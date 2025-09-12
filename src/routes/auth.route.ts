import { Router } from "express";
import { registerUser, login } from "../controllers/auth.controller";
import {
  RegisterUserValidator,
  LoginValidator,
} from "../validators/auth.validator";

const router = Router();

router.post("/register", RegisterUserValidator, registerUser);
router.post("/login", LoginValidator, login);

export default router;
