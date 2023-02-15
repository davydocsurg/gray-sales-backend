import dotenv from "dotenv";
dotenv.config();
// Uncaught Exceptions
process.on("uncaughtException", (err) => {
    Logging.error(err);
    process.exit(1);
});

import app from "./app";
import { mongoDBConnection } from "./config";
import { Logging } from "./helpers";

mongoDBConnection();
if (!process.env.APP_PORT) {
    process.exit(1);
}
exports.APP_PORT = parseInt(process.env.APP_PORT, 10);
const server = app.listen(exports.APP_PORT, () => {
    Logging.info(`🚀 Server ready at port: ${exports.APP_PORT}`);
});
process.on("unhandledRejection", (err) => {
    Logging.error(err);
    server.close(() => {
        process.exit(1);
    });
});
