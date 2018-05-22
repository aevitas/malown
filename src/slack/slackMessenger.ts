import { IMessage, IMessenger, IMessageSendResult } from "../abstractions";
import { injectable, inject } from "inversify";
import { Types } from "../types";

const slackImport = require("slack-node");

export interface ISlackOptions {
    webhookUri: string;
}

@injectable()
export class SlackMessenger implements IMessenger {

    private slack: any;

    public constructor(@inject (Types.SlackOptions) options: ISlackOptions) {
        if (!options) {
            throw new Error("Can not construct the Slack messenger without valid options!");
        }

        this.slack = new slackImport();
        this.slack.setWebhook(options.webhookUri);
    }

    public sendMessageAsync(message: IMessage): Promise<IMessageSendResult> {
        if (!message) {
            throw new Error("Message is required when sending a Slack message!");
        }

        return new Promise<IMessageSendResult>((resolve, reject) => {
            const result = this.slack.webhook({
                channel: message.recipient,
                username: message.from,
                text: message.body
            });

            if (result) {
                return resolve({isSuccessful: true});
            }

            return reject("Could not send the specified message to a slack channel!");
        });
    }

}
