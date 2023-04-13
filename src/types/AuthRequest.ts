import { Request } from "express";
import UserType from "./User";

export interface AuthRequest extends Request {
    user: UserType | any;
}
