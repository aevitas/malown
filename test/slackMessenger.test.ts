import {
    ISlackOptions,
    SlackMessenger
} from "../src/slack/slackMessenger";
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
        expect(() => new SlackMessenger({} as ISlackOptions)).throws();
    });

    it("empty webhook uri throws", () => {
        expect(() => new SlackMessenger({ webhookUri: "" })).throws();
    });
});

describe("sendMessageAsync", () => {
    const messenger = new SlackMessenger({
        webhookUri: "https://localhost/slack"
    });

    it("empty message", async () => {
        await messenger.sendMessageAsync({} as IMessage).should.throw;
    });

    it("invalid message fails", async () => {
        await messenger.sendMessageAsync({
            body: "hello",
            recipient: "@fwjks",
            from: "helvete"
        } as IMessage).should.eventually.be.rejected;
    });
});
