import { IUserDocument } from "../models/user.model";
import Document from "../models/document.model";
import { SuccessResponse } from "../utils/responses";
import { StatusCodes } from "http-status-codes";

class DocumentService {
  async createDocument({
    title,
    user,
  }: {
    title: string;
    user: IUserDocument;
  }) {
    /**
     * Create document for user
     */

    const newDoc = await Document.create({ title, user: user._id });
    user.documents.push(newDoc._id);
    await user.save();

    return SuccessResponse({
      status: "success",
      message: "Document created successfully",
      data: newDoc,
      httpStatus: StatusCodes.CREATED,
    });
  }

  async getUserDocuments(user: IUserDocument) {
    /**
     * Fetch all documents for a user
     */

    const documents = await Document.find({ user: user._id }).sort({
      createdAt: -1,
    });

    return SuccessResponse({
      status: "success",
      message: "Documents fetched successfully",
      data: documents,
      httpStatus: StatusCodes.OK,
    });
  }
}

const documentService = new DocumentService();
export default documentService;
