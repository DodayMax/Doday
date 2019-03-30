"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const chai = require("chai");
const expect = chai.expect;
describe("GET /contact", () => {
    it("should return 200 OK", (done) => {
        supertest_1.default(app_1.default).get("/contact")
            .expect(200, done);
    });
});
describe("POST /contact", () => {
    it("should return false from assert when no message is found", (done) => {
        supertest_1.default(app_1.default).post("/contact")
            .field("name", "John Doe")
            .field("email", "john@me.com")
            .end(function (err, res) {
            expect(res.error).to.be.false;
            done();
        })
            .expect(302);
    });
});
//# sourceMappingURL=contact.test.js.map