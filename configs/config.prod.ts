import path from 'path'

// Override Env
Object.assign(process.env, {
    ROUTER_PATH: path.join(process.env.ROOT, 'build/routes'),
    UPLOAD_PATH: path.join(process.env.ROOT, 'upload'),
    STATIC_PATH: path.join(process.env.ROOT, 'public'),
    JWT_SECRET: 'long23dksxgfe',
})

export default {
    mongo: {
        dbName: 'crm',
        authDb: 'crm',
        host: 'localhost',
        pass: 'long@123',
        user: 'crm-writer',
        port: '27016',
    },
}
