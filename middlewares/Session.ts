import session from "express-session";
import MongoStore from "connect-mongo";
import { ConnectMongoOptions } from "connect-mongo/build/main/lib/MongoStore";

const options: ConnectMongoOptions = {
    mongoUrl: process.env.MONGO_DB_URL,
    ttl: 14 * 24 * 60 * 60,
    collectionName: "sessions",
    stringify: false,
};

export const sessionMiddleware = session({
    secret: "auth-user-session",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create(options),
});
