"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        var _a;
        (_a = fn(req, res, next)) === null || _a === void 0 ? void 0 : _a.catch(next);
    };
};
exports.default = catchAsync;
