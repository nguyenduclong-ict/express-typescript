import 'module-alias/register'
import './configs'
import { app, server } from './app'
import startup from '@/services/startup'
import initRouter from '@/lib/core/router'
;(async () => {
    // start up service
    await startup(app, server)

    // init router
    initRouter(app)

    // start server
    const port = process.env.PORT || 3000
    server.listen(port, () => {
        console.log('Server listen on', port)
    })
})()
