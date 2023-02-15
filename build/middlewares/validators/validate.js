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
const httpException_1 = __importDefault(require("../../commons/httpException"));
const validate = (validations, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(validations.map((validation) => validation.run(req)));
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }
    let firstError = errors.mapped()[Object.keys(errors.mapped())[0]], remainingErrors = Object.keys(errors.mapped()).length - 1;
    return next(new httpException_1.default(`${firstError}.${remainingErrors ? " (and more errors(s))" : ""}`, 422, errors.mapped()));
});
exports.default = validate;
