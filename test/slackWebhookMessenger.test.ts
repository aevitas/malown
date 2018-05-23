import {
    ISlackWebhookOptions,
    SlackWebhookMessenger
} from "../src/slack/slackWebhookMessenger";
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import { IMessage } from "../src/abstractions";

chai.use(chaiAsPromised);

// Without this call, none of the "eventually" promise-based tests will actually run.
// You'll just be greeted with a "Cannot read property 'eventually' of undefined", which is bollocks.
chai.should();

const expect = chai.expect;

describe("constructor", () => {
    it("empty constructor throws", () => {
        expect(() => new SlackWebhookMessenger({} as ISlackWebhookOptions)).throws();
    });

    it("empty webhook uri throws", () => {
        expect(() => new SlackWebhookMessenger({ webhookUri: "" })).throws();
    });
});

describe("sendMessageAsync", () => {
    const messenger = new SlackWebhookMessenger({
        webhookUri: "https://localhost/slack"
    });

    it("empty message", async () => {
        await messenger.sendMessageAsync({} as IMessage).should.throw;
    });
});
