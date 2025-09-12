import type {
  DocumentActiveUsers,
  IUser,
  TExtendedSocket,
} from "../types/socket.types";
import sysLogger from "./logger";

const ACTIVE_USERS: DocumentActiveUsers = {};

export const onEnterDocument = (
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

  if (documentId in ACTIVE_USERS) {
    // Check if user with id already exists and then override it

    const activeUsers = ACTIVE_USERS[documentId];
    const filteredActiveUsers = activeUsers.filter(({ id }) => id !== user.id);

    ACTIVE_USERS[documentId] = [...filteredActiveUsers, newActiveUser];
  } else {
    ACTIVE_USERS[documentId] = [newActiveUser];
  }

  // Broadcast active users

  socket.to(documentId).emit("document_active_users", ACTIVE_USERS[documentId]);
};
