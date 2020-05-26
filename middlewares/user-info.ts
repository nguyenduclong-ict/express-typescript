import { NextFunction, Response, Request } from 'express'
import UserProvider from '@/data/User/provider'
import Permission from '@/data/Permission/model'
import Shop from '@/data/_Sale/Shop/model'
import jwt from '@/services/auth/token'

export default async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    if ((req as any).user) {
        return next()
    }
    try {
        const token = req.headers.authorization?.split('Bearer ').pop()
        if (token) {
            const tokenData: any = jwt.verify(token)
            const [user, permissions, shops] = await Promise.all([
                UserProvider.getOne(
                    {
                        _id: tokenData._id,
                        tokens: token,
                    },
                    ['roles']
                ),
                Permission.find({
                    of: tokenData._id,
                }),
                Shop.find({
                    userId: tokenData._id,
                }),
            ])
            user.permissions = permissions
            user.shops = shops
            ;(req as any).user = user
        }
    } catch (error) {
        console.log('Get user info Erorr', error)
    }
    return next()
}
