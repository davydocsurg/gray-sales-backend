import express, { Express, Request, Response } from "express";
import cors from "cors";

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
app.use(express.static("public"));
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "You have reached Example api home page",
        success: true,
    });
});

export default app;
