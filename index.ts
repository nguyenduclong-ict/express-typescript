import 'module-alias/register'
import './env'
import { Response } from 'express'
import { app, server } from './app'
import startup from '@/services/startup'
import initRouter from '@/lib/core/router'
import CustomError from '@/lib/core/error/custom-error'

;(async () => {
    // start up service
    await startup(app, server)

    // init router
    initRouter(app)

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

    // start server
    const port = process.env.PORT || 3000
    server.listen(port, () => {
        console.log('Server listen on', port)
    })
})()
