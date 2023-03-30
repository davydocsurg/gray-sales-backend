import express, { Express, Request, Response } from "express";
import cors from "cors";

// local imports
import { errorHandler, sessionMiddleware } from "./middlewares";
import {
    cartRoute,
    categoryRoutes,
    orderRoutes,
    stockRoutes,
    userRoutes,
} from "./routes/v1";
import path from "path";
import authRoutes from "./routes/v1/auth.route";
import { swaggerDocs } from "./config";

const app: Express = express();
const allowlist = ["http://localhost:3000", process.env.FRONT_END_URL];
const corsOptionsDelegate = function (
    req: Request,
    callback: (err: any, corsOptions: any) => void
) {
    let corsOptions: any;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded());
app.use(sessionMiddleware);

app.use(express.static("public"));
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "You have reached Gray Sales api home page",
        success: true,
    });
});

app.use(express.static(path.join(__dirname, "public")));
app.use(
    "/public/stocks/images",
    express.static(path.join(__dirname, "public/stocks/images"))
);

app.use("/api/v1", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/stocks", stockRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoutes);

app.use(errorHandler);

export default app;
