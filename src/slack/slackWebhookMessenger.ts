import {
    IMessage,
    IChatMessenger,
    IMessageSendResult
} from "../abstractions";
import { injectable, inject } from "inversify";
import { Types } from "../types";

const { IncomingWebhook } = require("@slack/client");

export interface ISlackWebhookOptions {
    webhookUri: string;
}

@injectable()
export class SlackWebhookMessenger implements IChatMessenger {
    // Slack's client is written in TypeScript, but they don't provide types for it?
    private webhook: any;

    public constructor(
        @inject(Types.SlackOptions) options: ISlackWebhookOptions
    ) {
        if (!options) {
            throw new Error(
                "Can not construct the Slack messenger without valid options!"
            );
        }

        if (!options.webhookUri) {
            throw new Error("Can not construct the Slack messenger without a valid webhook URI!");
        }

        this.webhook = new IncomingWebhook(options.webhookUri);
    }

    public sendMessageAsync(
        message: IMessage
    ): Promise<IMessageSendResult> {
        if (!message) {
            throw new Error(
                "Message is required when sending a Slack message!"
            );
        }

        return new Promise<IMessageSendResult>(async (resolve, reject) => {
            try {
                await this.webhook.send(message.body);

                resolve({isSuccessful: true});
            }
            catch {
                reject("Could not deliver message to Slack!");
            }
        });
    }
}
