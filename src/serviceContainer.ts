import { IEmailMessenger, IChatMessenger } from "./abstractions";
import { Container } from "inversify";
import { Types } from "./types";
import {
  SendGridMessenger,
  ISendGridOptions
} from "./sendGrid/sendGridMessenger";
import { Service } from "./service";
import { SlackMessenger } from "./slack/slackMessenger";

const container = new Container();

const sendGridApiKey: string = process.env.SENDGRID_API_KEY || "";

container.bind<IEmailMessenger>(Types.EmailMessenger).to(SendGridMessenger);
container.bind<IChatMessenger>(Types.ChatMessenger).to(SlackMessenger);
container
  .bind<ISendGridOptions>(Types.SendGridOptions)
  .toConstantValue({ apiKey: sendGridApiKey, useHtmlMessages: true });

container.bind<Service>(Types.Service).to(Service);

export { container };
