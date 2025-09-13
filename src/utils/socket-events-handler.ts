import { DefaultEventsMap, Server } from "socket.io";
import type {
  DocumentActiveUsers,
  IUser,
  TExtendedSocket,
  TMousePosition,
} from "../types/socket.types";
import sysLogger from "./logger";

const ACTIVE_DOCUMENTS: DocumentActiveUsers = {};

export const onEnterDocument = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: TExtendedSocket,
  documentId: string,
  user: IUser
) => {
  sysLogger.info(
    `User with id => ${user.id} entered document => ${documentId}`
  );

  // Join room (document)
  socket.join(documentId);
  sysLogger.info(`User ${user.id} successfully entered room => ${documentId}`);

  // New active user object
  const newActiveUser = { id: user.id, user, socketId: socket.id };

  if (documentId in ACTIVE_DOCUMENTS) {
    // Check if user with id already exists and then override it

    const activeUsers = ACTIVE_DOCUMENTS[documentId];
    const filteredActiveUsers = activeUsers.filter(({ id }) => id !== user.id);

    ACTIVE_DOCUMENTS[documentId] = [...filteredActiveUsers, newActiveUser];
  } else {
    ACTIVE_DOCUMENTS[documentId] = [newActiveUser];
  }

  // Broadcast active users

  io.to(documentId).emit("active_users", ACTIVE_DOCUMENTS[documentId]);
};

export const onExitDocument = (
  socket: TExtendedSocket,
  documentId: string,
  user: IUser
) => {
  sysLogger.info(`Removing user => ${user.id} from document => ${documentId}`);

  // Check if document is active
  if (documentId in ACTIVE_DOCUMENTS) {
    const activeUsers = ACTIVE_DOCUMENTS[documentId];
    const filteredActiveUsers = activeUsers.filter(({ id }) => id !== user.id);
    ACTIVE_DOCUMENTS[documentId] = [...filteredActiveUsers];
  }

  // Send updated active users to connected clients
  socket.to(documentId).emit("active_users", ACTIVE_DOCUMENTS[documentId]);
  socket.leave(documentId);
  sysLogger.info(`User ${user.id} left document ${documentId}`);
};

export const onMousePositionChange = (
  socket: TExtendedSocket,
  documentId: string,
  user: IUser,
  mousePosition: TMousePosition
) => {
  socket.to(documentId).emit("mouse_position_change", {
    id: user.id,
    mousePosition,
  });
};
