import { IMessage } from "./imessage";
import { MessageSendResult } from "../abstractions/messageSendResult";

export interface IMessenger {
    sendMessageAsync(message: IMessage): Promise<MessageSendResult>;
}
