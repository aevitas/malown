import { IMessenger } from "../abstractions/imessenger";
import { IMessage } from "../abstractions/imessage";
import { IMessageSendResult } from "../abstractions/imessageSendResult";

import sendGridMailer = require("@sendgrid/mail");

export interface ISendGridOptions {
    apiKey: string;
    useHtmlMessages: boolean;
}

export class SendGridMessenger implements IMessenger {
    private useHtmlMessages: boolean;

    public constructor(options: ISendGridOptions) {
        if (!options) {
            throw new Error("Can not construct a SendGridMessenger without valid options!");
        }

        this.useHtmlMessages = options.useHtmlMessages;

        if (!options.apiKey) {
            throw new Error("You need to provide a SendGrid API key in order to use the SendGridMessenger!");
        }

        sendGridMailer.setApiKey(options.apiKey);
    }

    public async sendMessageAsync(message: IMessage): Promise<IMessageSendResult> {
        if (!message) {
            throw new Error("Message can not be empty!");
        }

        return new Promise<IMessageSendResult>(async (resolve, reject) => {
            try {
                await sendGridMailer.send({
                    from: message.from,
                    to: message.recipient,
                    subject: message.subject,
                    text: (!this.useHtmlMessages ? message.body : undefined),
                    html: (this.useHtmlMessages ? message.body : undefined)
                });

                return resolve({isSuccessful: true});
            }
            catch (err) {
                return reject(`An error occurred while sending a message: ${err}`);
            }
        });
    }
}
