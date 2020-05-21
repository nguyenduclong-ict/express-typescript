"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hooks_1 = __importDefault(require("./hooks"));
const extras_1 = require("@/lib/fesjs/extras");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        default() {
            return extras_1.nonAccentVietnamese(this.name)
                .replace(/ |\.|\/|,|&|\?|\:|\^|~/g, "-")
                .replace(/-+/g, "-")
                .toLowerCase();
        },
        required: true,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: {
            address: String,
            districtCode: String,
            provinceCode: String,
            countryCode: String,
        },
        default: {
            address: "",
            provinceCode: "",
            districtCode: "",
            countryCode: "84",
        },
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});
hooks_1.default(schema);
exports.default = mongoose_1.model("Shop", schema);
