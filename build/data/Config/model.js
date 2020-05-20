"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: mongoose_1.Schema.Types.Mixed,
        default: null,
    },
    type: {
        type: String,
        enum: ["app", "user"],
    },
    for: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    createdAt: { type: Date, default: Date.now },
});
const Config = mongoose_1.model("Config", schema);
exports.default = Config;
