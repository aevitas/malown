import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { injectable, inject } from "inversify";
import { IMessage, IEmailMessenger, IMessageSendResult } from "./abstractions";
import { Types } from "./types";

@injectable()
export class Service {
    public express: express.Application;

    private emailMessenger: IEmailMessenger;

    public constructor(
        @inject(Types.EmailMessenger) emailMessenger: IEmailMessenger
    ) {
        this.express = express();
        this.configureMiddleware();
        this.configureRoutes();

        if (!emailMessenger) {
            throw new Error(
                "Can not start the service without a valid e-mail messenger. Check the configuration!"
            );
        }

        this.emailMessenger = emailMessenger;
    }

    private configureMiddleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));

        this.express.use((_request, response, next) => {
            response.removeHeader("x-powered-by");

            next();
        });
    }

    private configureRoutes(): void {
        const router = express.Router();

        router.get("/health", (_request, response, _next) => {
            return response.sendStatus(200);
        });

        router.post("/email/send", async (request, response, _next) => {
            const messageOptions: IMessage = request.body;

            if (!messageOptions) {
                return response.sendStatus(400);
            }

            // There has to be a better way of doing individual property validation here,
            // but we'll go with this for the mean time.
            if (!messageOptions.recipient) {
                response.statusCode = 400;
                return response.json({
                    message: "Recipient is required when sending e-mails."
                });
            }

            if (!messageOptions.subject) {
                response.statusCode = 400;
                return response.json({
                    message: "Subject is required when sending e-mails."
                });
            }

            if (!messageOptions.body) {
                response.statusCode = 400;
                return response.json({
                    message: "Body is required when sending e-mails."
                });
            }

            let result: IMessageSendResult;
            try {
                result = await this.emailMessenger.sendMessageAsync(messageOptions);
            } catch {
                result = {isSuccessful: false};
            }

            if (result.isSuccessful) {
                return response.sendStatus(200);
            }

            return response.sendStatus(400);
        });

        this.express.use("/", router);
    }
}
