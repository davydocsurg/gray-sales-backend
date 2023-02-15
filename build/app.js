"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// local imports
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
const allowlist = ["http://localhost:3000", process.env.FRONT_END_URL];
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    }
    else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions);
};
app.use((0, cors_1.default)(corsOptionsDelegate));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(middlewares_1.sessionMiddleware);
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.status(200).json({
        message: "You have reached Gray Sales api home page",
        success: true,
    });
});
// app.use(
//     multer({ storage: fileStorage, fileFilter: fileValidation }).single(
//         "images"
//     )
// );
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/public/stocks/images", express_1.default.static(path_1.default.join(__dirname, "public/stocks/images")));
app.use("/api", auth_route_1.default);
app.use("/api/category", routes_1.categoryRoutes);
app.use("/api/stock", routes_1.stockRoutes);
app.use("/api", routes_1.userRoutes);
app.use(middlewares_1.errorHandler);
exports.default = app;
