import type { IAuthUser } from "../types/auth.types";
import User from "../models/user.model";
import sysLogger from "../utils/logger";
import { BadRequestError } from "../utils/api-errors";
import { SuccessResponse } from "../utils/responses";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";

class AuthService {
  async registerUser({ username, password, email }: IAuthUser) {
    /**
     * Register a new user
     */

    sysLogger.info("Registering a new user");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sysLogger.error("User with email already exists");
      throw new BadRequestError("Email already in use");
    }

    // Create new account

    const newUser = await User.create({ username, password, email });
    sysLogger.info("User registered successfully");

    sysLogger.info("Generating access token");

    const accessToken = await this.generateAccessToken({
      id: (newUser._id as string).toString(),
      email: newUser.email,
    });

    sysLogger.info("Access token generated successfully");

    // Return success response

    return SuccessResponse({
      status: "success",
      message: "User registered successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        accessToken,
      },
      httpStatus: StatusCodes.CREATED,
    });
  }

  async generateAccessToken({
    id,
    email,
  }: Pick<IAuthUser, "email"> & { id: string }) {
    const token = jwt.sign({ id, email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  }
}

const authService = new AuthService();
export default authService;
