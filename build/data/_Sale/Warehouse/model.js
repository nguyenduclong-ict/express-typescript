"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
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
            countryCode: "",
        },
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});
const Warehouse = mongoose_1.model("Warehouse", schema);
exports.default = Warehouse;
