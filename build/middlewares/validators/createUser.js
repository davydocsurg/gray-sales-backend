"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("./validate"));
const ValidateCreateUserRequest = (req, res, next) => {
    return (0, validate_1.default)([
        (0, express_validator_1.check)("name")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Name is required"),
        (0, express_validator_1.check)("email")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Email is required"),
        (0, express_validator_1.check)("password")
            .exists({
            checkNull: true,
            checkFalsy: true,
        })
            .withMessage("Password is required"),
    ], req, res, next);
};
exports.default = ValidateCreateUserRequest;
