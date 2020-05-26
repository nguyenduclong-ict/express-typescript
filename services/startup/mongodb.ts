import connect from '@/services/mongo/connect'

export default function (app, server) {
    connect(app, server)
}
