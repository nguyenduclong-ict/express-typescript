import { Schema, model } from "mongoose";
import declareHooks from "./hooks";
import { nonAccentVietnamese } from "@/utils/extras";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        default() {
            return nonAccentVietnamese(this.name)
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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

declareHooks(schema);
export default model("Shop", schema);
