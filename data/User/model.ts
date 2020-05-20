import { Schema, model } from "mongoose";

const schema = new Schema({
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
            type: [Schema.Types.ObjectId],
            ref: "Role",
        },
    ],
    tokens: { type: [String], default: [] },
    isBlock: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
});

const User = model("User", schema);

export default User;
