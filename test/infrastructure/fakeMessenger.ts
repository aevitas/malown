import { IMessage, IMessenger, IMessageSendResult } from "../../src/abstractions";

export class FakeMessenger implements IMessenger {
    public async sendMessageAsync(_message: IMessage): Promise<IMessageSendResult> {
        return new Promise<IMessageSendResult>((resolve, _reject) => {
            return resolve({isSuccessful: true});
        });
    }
}

export const fakeMessenger = new FakeMessenger();
