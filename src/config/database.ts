import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbURL: string | any = process.env.MONGO_DB_URL;
import { Logging } from "../helpers";

export const mongoDBConnection = async () => {
    Logging.info("connecting...");

    try {
        await mongoose.connect(dbURL);
        Logging.success(`Database connected successfully`);
    } catch (err) {
        Logging.error(err);
        Logging.error("Connection refused");
    }
};
