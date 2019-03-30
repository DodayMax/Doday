"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("GET /", () => {
    it("should return 200 OK", (done) => {
        supertest_1.default(app_1.default).get("/")
            .expect(200, done);
    });
});
//# sourceMappingURL=home.test.js.map