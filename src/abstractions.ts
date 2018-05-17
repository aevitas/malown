export interface IMessage {
    from: string;
    recipient: string;
    subject: string;
    body: string;
}

export interface IMessageSendResult {
    isSuccessful: boolean;
}

export interface IMessenger {
    sendMessageAsync(message: IMessage): Promise<IMessageSendResult>;
}
