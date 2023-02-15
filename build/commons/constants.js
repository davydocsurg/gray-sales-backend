"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.DEFAULT_PROFILE_PHOTO = exports.DEFAULT_STOCK_PHOTO = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = "@davydocsurg@Mobile";
exports.DEFAULT_STOCK_PHOTO = "stocks/images/default.png";
exports.DEFAULT_PROFILE_PHOTO = "users/default.png";
exports.cookieOptions = {
    expires: new Date(Date.now() + parseInt("90", 10) * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
};
