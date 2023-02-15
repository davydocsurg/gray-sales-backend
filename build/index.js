"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Uncaught Exceptions
process.on("uncaughtException", (err) => {
    helpers_1.Logging.error(err);
    process.exit(1);
});
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const helpers_1 = require("./helpers");
(0, config_1.mongoDBConnection)();
if (!process.env.APP_PORT) {
    process.exit(1);
}
exports.APP_PORT = parseInt(process.env.APP_PORT, 10);
const server = app_1.default.listen(exports.APP_PORT, () => {
    helpers_1.Logging.info(`🚀 Server ready at port: ${exports.APP_PORT}`);
});
process.on("unhandledRejection", (err) => {
    helpers_1.Logging.error(err);
    server.close(() => {
        process.exit(1);
    });
});
