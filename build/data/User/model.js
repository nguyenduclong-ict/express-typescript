"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        default() {
            return "fb" + this.facebook;
        },
        unique: true,
        required: true,
    },
    password: String,
    facebook: {
        type: String,
        default: null,
    },
    info: {
        type: {
            name: String,
            age: Number,
            image: String,
            gender: {
                type: String,
                enum: ["male", "female"],
            },
        },
        default: {
            name: "",
            age: 0,
            image: "",
            gender: "male",
        },
    },
    email: {
        type: String,
        unique: true,
        required: false,
    },
    roles: [
        {
            type: [mongoose_1.Schema.Types.ObjectId],
            ref: "Role",
        },
    ],
    tokens: { type: [String], default: [] },
    isBlock: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
});
const User = mongoose_1.model("User", schema);
exports.default = User;
