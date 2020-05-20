import { Schema, model } from "mongoose";

const schema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "Role",
    },
    // For custom staff role
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
    },
    // Danh sách các quyền trong
    permissionOfStaff: {
        type: [String],
    },
});

const Role = model("Role", schema);

export default Role;
