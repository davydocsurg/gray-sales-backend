import { Request, Response } from "express";
import SwaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";
import { Logging } from "../../../helpers";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GraySales API Documentation",
            version: "1.0.0",
            description: "GraySales API Documentation",
            contact: {
                name: "GraySales API Support",
                email: "davydocsurg@gmail.com",
                url: "https://chibueze.me",
            },
        },

        servers: [
            {
                url: "http://localhost:8080",
                description: "Local Server",
            },
        ],
    },
    apis: ["../../../routes/v1/*.ts"],
};

const specs = SwaggerJSDoc(swaggerOptions);

function swaggerDocs(app: any, port: Number) {
    app.use(
        "/api/v1/docs",
        SwaggerUI.serve,
        SwaggerUI.setup(specs, {
            explorer: true,
        })
    );
    // app.get("/api/v1/docs.json", (req: Request, res: Response) => {
    //     res.setHeader("Content-Type", "application/json");
    //     res.send(specs);
    // });

    // Logging.warn(
    //     `Swagger docs available at http://localhost:${port}/api/v1/docs`
    // );
}

export default swaggerDocs;
