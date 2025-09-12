import { IUserDocument } from "../models/user.model";
import Document from "../models/document.model";
import { SuccessResponse } from "../utils/responses";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../utils/api-errors";
import sysLogger from "../utils/logger";

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

  async deleteDocument(id: string, user: IUserDocument) {
    /**
     * Delete a document by ID
     */

    const doc = await Document.findById({ _id: id, user: user._id });
    if (!doc) {
      sysLogger.error(`Document with ID ${id} not found for user ${user._id}`);
      throw new NotFoundError("Document not found");
    }

    await doc.deleteOne();

    // Remove document reference from user's documents array

    user.documents = user.documents.filter(
      (documentId: any) => !documentId.equals(doc._id)
    );
    await user.save();

    sysLogger.info(`Document with ID ${id} deleted for user ${user._id}`);

    return SuccessResponse({
      status: "success",
      message: "Document deleted successfully",
      httpStatus: StatusCodes.OK,
    });
  }
}

const documentService = new DocumentService();
export default documentService;
