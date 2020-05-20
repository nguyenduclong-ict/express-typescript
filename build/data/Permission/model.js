"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    of: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    for: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
    },
    action: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.model("Permission", schema);
