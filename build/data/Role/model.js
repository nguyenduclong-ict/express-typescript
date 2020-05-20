"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        default() {
            return this.id + " role";
        },
    },
    type: {
        type: String,
        enum: ["system", "custom"],
        default: "custom",
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
    },
    // For custom staff role
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shop",
    },
    // Danh sách các quyền trong
    permissionOfStaff: {
        type: [String],
    },
});
const Role = mongoose_1.model("Role", schema);
exports.default = Role;
