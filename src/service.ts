import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";

export class Service {

    public express: express.Application;

     public constructor() {
         this.express = express();
         this.configureMiddleware();
         this.configureRoutes();
     }

     private configureMiddleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private configureRoutes(): void {
        const router = express.Router();

        router.get("/health", (_request, response, _next) => {
            return response.sendStatus(200);
        });

        this.express.use("/", router);
    }
}
