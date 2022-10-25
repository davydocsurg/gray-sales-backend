import dotenv from "dotenv";
dotenv.config();
// Uncaught Exceptions
process.on("uncaughtException", (err) => {
    process.exit(1);
});

import app from "./app";
