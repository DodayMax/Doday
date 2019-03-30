"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const chai = require("chai");
const expect = chai.expect;
describe("GET /login", () => {
    it("should return 200 OK", () => {
        return supertest_1.default(app_1.default).get("/login")
            .expect(200);
    });
});
describe("GET /signup", () => {
    it("should return 200 OK", () => {
        return supertest_1.default(app_1.default).get("/signup")
            .expect(200);
    });
});
describe("POST /login", () => {
    it("should return some defined error message with valid parameters", (done) => {
        return supertest_1.default(app_1.default).post("/login")
            .field("email", "john@me.com")
            .field("password", "Hunter2")
            .expect(302)
            .end(function (err, res) {
            expect(res.error).not.to.be.undefined;
            done();
        });
    });
});
//# sourceMappingURL=user.test.js.map