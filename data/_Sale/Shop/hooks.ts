import { Schema } from 'mongoose'

export default function (schema: Schema) {
    schema.pre('save', async function (next) {
        let slug = this.get('slug')
        // find slug in database
        const sample = await this.model('Shop').find({
            userId: this.get('userId'),
            slug: this.get('slug'),
        })
        if (sample.length > 0) {
            slug += '-' + sample.length
        }
        this.set('slug', slug)
        next()
    })
}
