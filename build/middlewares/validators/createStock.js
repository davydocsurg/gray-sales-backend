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
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("./validate"));
const models_1 = require("../../models");
const helpers_1 = require("../../helpers");
const ValidateCreateStockRequest = (req, res, next) => {
    return (0, validate_1.default)([
        (0, express_validator_1.check)("title")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Title is required")
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield models_1.Stock.findOne({
                where: {
                    title: value,
                },
            });
            if ((data === null || data === void 0 ? void 0 : data.title) == value) {
                helpers_1.Logging.info((data === null || data === void 0 ? void 0 : data.title) + "...." + value);
                return Promise.reject("Title already taken");
            }
        })),
        (0, express_validator_1.check)("description")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Description is required"),
        (0, express_validator_1.check)("price")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Price is required"),
        (0, express_validator_1.check)("images")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Minimum of one image is required"),
        (0, express_validator_1.check)("categoryId")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Category is required"),
    ], req, res, next);
};
exports.default = ValidateCreateStockRequest;
