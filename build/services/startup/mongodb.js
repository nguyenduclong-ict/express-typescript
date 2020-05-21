"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("@/services/mongo/connect"));
function default_1(app, server) {
    connect_1.default(app, server);
}
exports.default = default_1;
