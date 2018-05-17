import { IMessage } from "../../src/abstractions/imessage";
import { IMessenger } from "../../src/abstractions/imessenger";
import { IMessageSendResult } from "../../src/abstractions/imessageSendResult";

export class FakeMessenger implements IMessenger {
    public async sendMessageAsync(_message: IMessage): Promise<IMessageSendResult> {
        return new Promise<IMessageSendResult>((resolve, _reject) => {
            return resolve({isSuccessful: true});
        });
    }
}

export const fakeMessenger = new FakeMessenger();
