import { Schema, model } from "mongoose";

const schema = new Schema({
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
        type: Schema.Types.ObjectId,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const Warehouse = model("Warehouse", schema);

export default Warehouse;
