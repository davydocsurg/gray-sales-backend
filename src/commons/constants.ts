export const JWT_SECRET = "@davydocsurg@Mobile";
export const DEFAULT_STOCK_PHOTO = "stocks/images/default.png";
export const DEFAULT_PROFILE_PHOTO = "users/default.png";
export const cookieOptions = {
    expires: new Date(Date.now() + parseInt("90", 10) * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
};
