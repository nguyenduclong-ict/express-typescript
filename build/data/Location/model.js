"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hooks_1 = __importDefault(require("./hooks"));
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        enum: ["country", "district", "city"],
    },
    slug: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    provinceCode: {
        type: String,
    },
    districtCode: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
});
hooks_1.default(schema);
exports.default = mongoose_1.model("Location", schema);
