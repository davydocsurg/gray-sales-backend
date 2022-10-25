import dotenv from "dotenv";

dotenv.config();

const dbURL: string | undefined = process.env.MONGO_DB_URL;
