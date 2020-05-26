import { Schema, model } from 'mongoose'

const schema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Schema.Types.Mixed,
        default: null,
    },
    type: {
        type: String,
        enum: ['app', 'user'],
    },
    for: {
        type: Schema.Types.ObjectId,
    },
    createdAt: { type: Date, default: Date.now },
})

const Config = model('Config', schema)

export default Config
