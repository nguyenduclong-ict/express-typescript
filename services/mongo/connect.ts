import env from '@/env'
import mongoose from 'mongoose'
import { initData } from './init-data'

export default async function (app, server) {
    const config = env.MONGODB_CONFIG
    mongoose.connection.on('connected', () => {
        console.log('connected to mongodb:', mongoose.connection.name)
        // check init data for database
        initData()
    })

    if (config) {
        const { host, port, dbName, user, pass, authDb } = config
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
        const uri = `mongodb://${host}:${port}`

        mongoose.connect(uri, {
            ...options,
            authSource: authDb || dbName,
            dbName,
            user,
            pass,
        })
    }
}
