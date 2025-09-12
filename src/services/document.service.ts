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

    const newDoc = await Document.create({ title, owner: user._id });
    user.documents.push(newDoc._id);
    await user.save();

    return SuccessResponse({
      status: "success",
      message: "Document created successfully",
      data: newDoc,
      httpStatus: StatusCodes.CREATED,
    });
  }
}

const documentService = new DocumentService();
export default documentService;
