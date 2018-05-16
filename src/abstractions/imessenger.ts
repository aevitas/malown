import { IMessage } from "./imessage";
import { IMessageSendResult } from "./imessageSendResult";

export interface IMessenger {
    sendMessageAsync(message: IMessage): Promise<IMessageSendResult>;
}
