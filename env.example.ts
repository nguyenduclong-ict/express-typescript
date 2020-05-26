import path from 'path'
import { homedir } from 'os'
import { config } from 'dotenv'
config()

/**
 * Development envrironment
 */
const envDev = {
    ROUTER_PATH: path.join(__dirname, 'routes'),
    UPLOAD_PATH: path.join(__dirname, '../upload'),
    STATIC_PATH: path.join(__dirname, '../public'),

    FACEBOOK_API: 'https://graph.facebook.com/v6.0',
    JWT_SECRET: 'long23dksxgfe',

    MONGODB_CONFIG: {
        type: 'mongo',
        dbName: 'crm',
        authDb: 'crm',
        host: 'localhost',
        pass: 'long@123',
        user: 'crm-writer',
        port: '27016',
    },
}

/**
 * Production envrironment
 */
const envProd = {
    ...envDev,
}

const env = process.env.NODE_ENV === 'production' ? envProd : envDev

Object.assign(process.env, env)
export default env
