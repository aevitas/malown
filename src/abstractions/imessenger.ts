import { Message } from "../message";

export interface IMessenger {
    sendMessageAsync(message: Message): void;
}
