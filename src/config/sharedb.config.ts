import { DATABASE_URI } from "../utils/constants";
import ShareDB from "sharedb";

// @ts-ignore
import sharedbMongo from "sharedb-mongo";

const db = sharedbMongo(DATABASE_URI);
export const sharedbBackend = new ShareDB({ db });
