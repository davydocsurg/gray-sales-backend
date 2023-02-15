import { Request } from "express";
import type { User } from "./User";

export interface AuthRequest extends Request {
    user: any;
}
