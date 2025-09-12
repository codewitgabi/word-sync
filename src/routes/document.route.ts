import { Router } from "express";
import { createDocument } from "../controllers/document.controller";
import verifyAuth from "../middlewares/verify-auth.middleware";
import { createDocumentValidator } from "../validators/document.validator";

const router = Router();

router.post("", verifyAuth, createDocumentValidator, createDocument);

export default router;
