import { SendGridMessenger, ISendGridOptions } from "../src/sendGrid/sendGridMessenger";
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import { IMessage } from "../src/abstractions";

chai.use(chaiAsPromised);

// Without this call, none of the "eventually" promise-based tests will actually run.
// You'll just be greeted with a "Cannot read property 'eventually' of undefined", which is bollocks.
chai.should();

const expect = chai.expect;

describe("constructor", () => {
    it("empty options throws", () => {
        expect(() => new SendGridMessenger({} as ISendGridOptions)).throws();
    });

    it("empty api key throws", () => {
        expect(() => new SendGridMessenger({apiKey: "", useHtmlMessages: true})).throws();
    });
});

describe("sendMessageAsync", () => {
    // This actually doesn't mock the messaging functionality included in SendGridMessenger, which means
    // that if we do hit the code that sends a message, we'll make a call to their API. For now, that doesn't
    // matter too much as these tests pretty much only hit preconditions and not the actual functionality.
    const messenger = new SendGridMessenger({apiKey: "something something test", useHtmlMessages: true});

    it("empty message throws", async () => {
        await messenger.sendMessageAsync({} as IMessage).should.eventually.be.rejected;
    });
});
