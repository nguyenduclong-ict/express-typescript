"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("@/utils/fesjs/mongo");
const model_1 = __importDefault(require("./model"));
class LocationProvider extends mongo_1.Provider {
}
exports.default = new LocationProvider(model_1.default);
