import path from 'path'
import 'dotenv/config'
import { getPriorityEnv } from './lib/core/env'

/**
 * Development envrironment
 */
const envDev = {
    ROUTER_PATH: path.join(__dirname, 'routes'),
    UPLOAD_PATH: path.join(__dirname, '../upload'),
    STATIC_PATH: path.join(__dirname, '../public'),
    PORT: 3040,
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
    PORT: 3051,
    ROUTER_PATH: path.join(__dirname, 'routes'),
    UPLOAD_PATH: path.join(__dirname, '/upload'),
    STATIC_PATH: path.join(__dirname, '../public'),
    FACEBOOK_API: 'https://graph.facebook.com/v6.0',
    JWT_SECRET: 'long23dksxgfe',

    MONGODB_CONFIG: {
        type: 'mongo',
        dbName: 'crm',
        authDb: 'crm',
        host: 'mongodb-server',
        pass: 'long@123',
        user: 'crm-writer',
        port: '27017',
    },
}

const env = process.env.NODE_ENV === 'production' ? envProd : envDev

Object.assign(process.env, env)
Object.assign(process.env, getPriorityEnv())

export default env
