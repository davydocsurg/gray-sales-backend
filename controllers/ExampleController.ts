import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import { Example } from "../models";

class ExampleController {
    constructor() {
        this.createExample = this.createExample.bind(this);
    }

    async createExample(req: Request, res: Response, next: NextFunction) {
        Logging.info("creating...");
        let example = await Example.create({
            title: req.body.title,
            description: req.body.description,
        });
        res.status(200).json({
            success: true,
            results: 1,
            data: {
                example,
            },
        });
    }
}

export default new ExampleController();
