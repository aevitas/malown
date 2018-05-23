require("dotenv").config();

import "reflect-metadata";
import * as http from "http";
import { Service } from "./service";
import { Types } from "./types";
import { container } from "./serviceContainer";

interface IServiceOptions {
    port: number;
}

const debug = require("debug")("service");

const options = { ...(process.env as any) } as IServiceOptions;

const service: Service = container.get<Service>(Types.Service);

let listenPort: number;
if (options.port) {
    listenPort = options.port;

    if (!listenPort) {
        throw new Error(
            `${
                options.port
            } specified in the environment variables is not a valid port number!`
        );
    }

    // The maximum port number is 0xFFFF, or 65535. Port numbers can also not be negative for obvious reasons.
    if (listenPort < 0 || listenPort > 65535) {
        throw new Error(
            "Port number must be larger than zero, and smaller than 65535!"
        );
    }
} else {
    listenPort = 5000;
}

service.express.set("port", listenPort);

const server = http.createServer(service.express);

server.on("error", error => {
    debug(`An error occurred: ${error.message}`);
});

server.on("listening", () => {
    debug(`Server is now listening on port ${listenPort}`);
});

server.listen(listenPort);
