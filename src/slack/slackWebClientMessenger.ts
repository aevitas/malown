const { WebClient } = require("@slack/client");
import { injectable, inject } from "inversify";
import { IMessenger, IMessageSendResult, IMessage } from "../abstractions";
import { Types } from "../types";

export interface ISlackWebClientOptions {
    token: string;
    conversationId: string;
}

@injectable()
export class SlackWebClientMessenger implements IMessenger {

    // Same as with the webhook, idk why we can't specify the type here.
    private readonly client: any;
    private readonly conversationId: string;

    public constructor(@inject(Types.SlackWebClientOptions) options: ISlackWebClientOptions) {
        if (!options) {
            throw new Error("You must specify valid web client options when constructing a SlackWebClientMessenger!");
        }

        if (!options.token) {
            throw new Error("You must specify a valid token when constructing a SlackWebClientMessenger!");
        }

        if (!options.conversationId) {
            throw new Error("You must specify a valid conversation ID when constructing a SlackWebClientMessenger!");
        }

        this.client = new WebClient(options.token);
        this.conversationId = options.conversationId;
    }

    public sendMessageAsync(message: IMessage): Promise<IMessageSendResult> {
        if (!message) {
            throw new Error("You must specify a valid message when sending a message!");
        }

        return new Promise<IMessageSendResult>(async (resolve, reject) => {
            // web.chat.postMessage({ channel: conversationId, text: 'Hello there' })
            try {
                const result = await this.client.chat.postMessage({channel: this.conversationId, text: message.body});

                if (result) {
                    resolve({isSuccessful: true});
                }
            }
            catch {
                return reject(`Could not deliver your message to conversation ${this.conversationId}`);
            }
        });
    }
}
