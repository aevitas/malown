require("dotenv").config();

import * as http from "http";
import { Service } from "./service";
import { SendGridMessenger } from "./sendGrid/sendGridMessenger";

const debug = require("debug")("service");

debug("fuck yo couch");

const emailMessenger = new SendGridMessenger({apiKey: "", useHtmlMessages: false});

const service = new Service(emailMessenger);
let listenPort: number;

const envPort = process.env.PORT;
if (envPort) {
    listenPort = parseInt(envPort);

    if (!listenPort) {
        throw new Error(`${envPort} specified in the environment variables is not a valid port number!`);
    }

    // The maximum port number is 0xFFF, or 65535. Port numbers can also not be negative for obvious reasons.
    if (listenPort < 0 || listenPort > 65535) {
        throw new Error("Port number must be larger than zero, and smaller than 65535!");
    }
}
else {
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
