import { Schema } from "mongoose";

export default function (schema: Schema) {
    schema.pre("save", async function (next) {
        next();
    });
}
