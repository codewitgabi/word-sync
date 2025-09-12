import type { Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { IUserDocument } from "../models/user.model";
import documentService from "../services/document.service";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

export const createDocument = catchAsync(
  async (req: Request, res: Response) => {
    const response = await documentService.createDocument({
      title: req.body.title,
      user: req.user!,
    });

    res.status(response.httpStatus).json(response);
  }
);

export const getUserDocuments = catchAsync(
  async (req: Request, res: Response) => {
    const response = await documentService.getUserDocuments(req.user!);
    res.status(response.httpStatus).json(response);
  }
);

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const documentId = req.params.id;
    const response = await documentService.deleteDocument(
      documentId,
      req.user!
    );
    res.status(response.httpStatus).json(response);
  }
);
