import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { RegisterUserValidator } from "../validators/auth.validator";

const router = Router();

router.post("/register", RegisterUserValidator, registerUser);

export default router;
