"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const User_1 = __importDefault(require("../models/User"));
class UserController {
    constructor() {
        this.getAuthUser = this.getAuthUser.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }
    getAuthUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const authUserStocks = yield models_1.Stock.find({
                    user: req.user,
                });
                return res.json({
                    success: true,
                    data: {
                        user,
                        authUserStocks,
                    },
                });
            }
            catch (error) {
                helpers_1.Logging.error(error);
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    findUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield User_1.default.findById(id);
                const userStocksCount = yield models_1.Stock.find({
                    user: req.user,
                }).countDocuments();
                return res.json({
                    success: true,
                    data: {
                        user,
                        userStocksCount,
                    },
                });
            }
            catch (error) {
                helpers_1.Logging.error(error);
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { name, email } = req.body;
                const profilePhoto = req.file;
                const user = yield User_1.default.findById(id);
                const profileUpdates = {
                    name: name,
                    email: email,
                    photo: profilePhoto === null || profilePhoto === void 0 ? void 0 : profilePhoto.path,
                };
                if (!user) {
                    return next(new helpers_1.AppError("This user does not exist", 404));
                }
                const updatedData = yield User_1.default.findByIdAndUpdate(id, profileUpdates);
                yield user.save({ validateBeforeSave: false });
                const defaultPhoto = "users/default.png";
                const oldPhoto = user === null || user === void 0 ? void 0 : user.photo;
                yield (0, helpers_1.deleteOldPhoto)(oldPhoto, defaultPhoto);
                return res.json({
                    success: true,
                    message: "Profile updated successfully",
                    data: {
                        updatedData,
                    },
                });
            }
            catch (error) {
                helpers_1.Logging.error(error);
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
}
exports.default = new UserController();
