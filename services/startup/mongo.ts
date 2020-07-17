import configs from '@/configs'
import mongoose from 'mongoose'
import { initData } from '../mongo/init-data'

export default async function (app, server) {
    return new Promise((resolve) => {
        const config = configs.mongo

        mongoose.connection.on('connected', async () => {
            console.log('connected to mongodb:', mongoose.connection.name)
            // check init data for database
            await initData()
            // DONE
            resolve()
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
    })
}
