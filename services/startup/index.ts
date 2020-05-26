import fs from 'fs'
import path from 'path'

export default async function (app, server) {
    const files = fs.readdirSync(__dirname)
    files
        .filter((name) => name !== path.basename(__filename))
        .forEach((fname) => {
            const m = require(path.join(__dirname, fname))
            m.default(app, server)
        })
}
