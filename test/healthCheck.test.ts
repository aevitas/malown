import "reflect-metadata";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { Service } from "../src/service";

import { fakeMessenger } from "./infrastructure/fakeMessenger";

chai.use(chaiHttp);
const expect = chai.expect;
const service = new Service(fakeMessenger);

describe("health", () => {
    it("should return 200", () => {
        return chai
            .request(service.express)
            .get("/health")
            .then(result => {
                expect(result.status).to.eql(200);
            });
    });
});
