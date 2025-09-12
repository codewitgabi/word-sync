/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Document } from "mongoose";
import { DefaultEventsMap, Socket } from "socket.io";
import { IUserDocument } from "../models/user.model";

export type TExtendedSocket = {
  user?: IUser;
  fcmToken?: string;
} & Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export type IUser = Document<unknown, {}, IUserDocument> &
  IUserDocument &
  Required<{
    _id: unknown;
  }>;

export interface IActiveUser {
  id: string;
  user: IUser;
  socketId: string;
  fcmToken: string;
}
