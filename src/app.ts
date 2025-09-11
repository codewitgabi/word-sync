import express, { Express, Request, Response } from "express";
import logger from "morgan";
import connectDb from "./config/db.config";
import {
  RequestErrorHandler,
  NotFoundErrorHandler,
} from "./middlewares/errors.middleware";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { SuccessResponse } from "./utils/responses";
import { StatusCodes } from "http-status-codes";
import compression from "compression";
import sysLogger from "./utils/logger";
import { PORT } from "./utils/constants";

const app: Express = express();

const corsOrigin = ["http://localhost:3000"];

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
  },
  connectionStateRecovery: {
    skipMiddlewares: false,
    maxDisconnectionDuration: 15 * 60 * 1000,
  },
  connectTimeout: 5 * 60 * 1000,
});

app.use(
  cors({
    origin: corsOrigin,
  })
);

app.use(logger("combined"));
app.set("port", PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
// io.use(SocketAuthenticationMiddleware);

// Routes

// Metrics endpoint

app.get("/", (req: Request, res: Response) => {
  const response = SuccessResponse({
    status: "success",
    message: "Welcome to Word Sync API",
    data: null,
  });

  res.status(StatusCodes.OK).json(response);
});

// Middlewares

app.use(NotFoundErrorHandler);
app.use(RequestErrorHandler);

// Start server using IIFE

(() => {
  connectDb()
    .then(() => {
      sysLogger.info("Database connection successful");

      server.listen(app.get("port"), () => {
        sysLogger.info(`Server is running on port ${app.get("port")}`);
      });
    })
    .catch((e) => {
      sysLogger.error(`An error occurred connecting to database: ${e}`);
    });
})();
