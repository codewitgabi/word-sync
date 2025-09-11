import { config } from "dotenv";

config();

export const DATABASE_URI = process.env.DATABASE_URI as string;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
