import { Router } from "express";
import {
  createDocument,
  getUserDocuments,
} from "../controllers/document.controller";
import verifyAuth from "../middlewares/verify-auth.middleware";
import { createDocumentValidator } from "../validators/document.validator";

const router = Router();

router
  .route("")
  .post(verifyAuth, createDocumentValidator, createDocument)
  .get(verifyAuth, getUserDocuments);

export default router;
