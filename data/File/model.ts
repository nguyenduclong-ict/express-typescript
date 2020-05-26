import { Schema, model } from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    type: { type: String },
    ext: { type: String },
    isPublic: { type: Boolean, default: true },
    owner: {
        type: Schema.Types.ObjectId,
    },
    createdAt: { type: Date, default: Date.now },
})

const File = model('File', schema)

export default File
