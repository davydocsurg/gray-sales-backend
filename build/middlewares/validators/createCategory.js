"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("./validate"));
const ValidateCreateCategoryRequest = (req, res, next) => {
    return (0, validate_1.default)([
        (0, express_validator_1.check)("icon")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Icon is required"),
        (0, express_validator_1.check)("label")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Label is required"),
        (0, express_validator_1.check)("backgroundColor")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Background color is required"),
        (0, express_validator_1.check)("value")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Value is required"),
    ], req, res, next);
};
exports.default = ValidateCreateCategoryRequest;
