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
        dbName: 'shop_db',
        authDb: 'shop_db',
        host: 'localhost',
        pass: 'password',
        user: 'writer',
        port: '27016',
    },
}
