import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  getUserDocuments,
} from "../controllers/document.controller";
import verifyAuth from "../middlewares/verify-auth.middleware";
import { createDocumentValidator } from "../validators/document.validator";

const router = Router();

router
  .route("")
  .post(verifyAuth, createDocumentValidator, createDocument)
  .get(verifyAuth, getUserDocuments);

router.route("/:id").delete(verifyAuth, deleteDocument);

export default router;
