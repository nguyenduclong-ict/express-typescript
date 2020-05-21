"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    type: { type: String },
    ext: { type: String },
    isPublic: { type: Boolean, default: true },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    createdAt: { type: Date, default: Date.now },
});
const File = mongoose_1.model("File", schema);
exports.default = File;
