import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import sysLogger from "../utils/logger";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import User, { IUserDocument } from "../models/user.model";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

async function verifyAuth(req: Request, res: Response, next: NextFunction) {
  // Extract authentication token from headers

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    sysLogger.error("Authorization header missing");
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Authorization credentials were not provided" });
    return;
  }

  const [bearer, accessToken] = authHeader.split(" ");

  if (bearer !== "Bearer" || !accessToken) {
    sysLogger.error("Invalid authorization header format");
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Invalid authorization header format" });
    return;
  }

  // Verify token

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    let user = null;

    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      user = await User.findById((decoded as { id: string }).id).select(
        "-password"
      );
    }

    if (!user) {
      sysLogger.error("User not found for the provided token");
      res.status(StatusCodes.FORBIDDEN).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    sysLogger.error(`Token verification failed: ${error}`);
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Invalid or expired token" });
    return;
  }
}

export default verifyAuth;
