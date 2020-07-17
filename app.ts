import express from 'express'
import http from 'http'
import { Response } from 'express'

import logger from 'morgan'
import cors from 'cors'
import CustomError from './lib/core/error/custom-error'

export const app = express()
// ===============================
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.env.STATIC_PATH))
// Handle Error
app.use((error, req, res: Response, next) => {
    if (error) {
        if (error instanceof CustomError) {
            res.status(error.code)
            res.send(error.message)
            res.end()
            return
        }
    }
    next()
})
// ===============================
export const server = http.createServer(app)
