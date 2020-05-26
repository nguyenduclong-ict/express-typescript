import { Schema, model } from 'mongoose'

const schema = new Schema({
    of: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    for: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    action: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
})

export default model('Permission', schema)
