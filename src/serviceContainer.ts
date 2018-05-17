import { IMessenger } from "./abstractions";
import { Container } from "inversify";
import { Types } from "./types";
import {
  SendGridMessenger,
  ISendGridOptions
} from "./sendGrid/sendGridMessenger";
import { Service } from "./service";

const container = new Container();

const sendGridApiKey: string = process.env.SENDGRID_API_KEY || "";

container.bind<IMessenger>(Types.IMessenger).to(SendGridMessenger);
container
  .bind<ISendGridOptions>(Types.SendGridOptions)
  .toConstantValue({ apiKey: sendGridApiKey, useHtmlMessages: true });

container.bind<Service>(Types.Service).to(Service);

export { container };
