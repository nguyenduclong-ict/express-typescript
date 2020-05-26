import { Schema, model } from 'mongoose'
import hooks from './hooks'

const schema = new Schema({
    name: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        enum: ['country', 'district', 'city'],
    },
    slug: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    provinceCode: {
        type: String,
    },
    districtCode: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
})

hooks(schema)
export default model('Location', schema)
