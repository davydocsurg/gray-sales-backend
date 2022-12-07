import { NextFunction, Request, Response } from "express";

// locals
import { AppError, deleteOldPhoto, Logging } from "../helpers";
import { Stock } from "../models";
import User from "../models/User";

class UserController {
    constructor() {
        this.getAuthUser = this.getAuthUser.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    async getAuthUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const authUserStocks = await Stock.find({
                user: req.user,
            });

            return res.json({
                success: true,
                data: {
                    user,
                    authUserStocks,
                },
            });
        } catch (error) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: {
                    error,
                },
            });
        }
    }

    async findUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const user = await User.findById(id);
            const userStocksCount = await Stock.find({
                user: req.user,
            }).countDocuments();

            return res.json({
                success: true,
                data: {
                    user,
                    userStocksCount,
                },
            });
        } catch (error: unknown) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: {
                    error,
                },
            });
        }
    }

    async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const { name, email } = req.body;
            const profilePhoto = req.file;

            const user = await User.findById(id);
            // return Logging.info(profilePhoto);
            const profileUpdates = {
                name: name,
                email: email,
                photo: profilePhoto?.path,
            };

            if (!user) {
                return next(new AppError("This user does not exist", 404));
            }

            const updatedData = await User.findByIdAndUpdate(
                id,
                profileUpdates
            );
            await user.save({ validateBeforeSave: false });

            const defaultPhoto = "users/default.png";
            const oldPhoto = user?.photo;
            await deleteOldPhoto(oldPhoto, defaultPhoto);

            return res.json({
                success: true,
                message: "Profile updated successfully",
                data: {
                    updatedData,
                },
            });
        } catch (error) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: {
                    error,
                },
            });
        }
    }
}

export default new UserController();
