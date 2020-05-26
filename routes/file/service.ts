import { Request, Response, NextFunction } from 'express'
import FileProvider from '@/data/File/provider'
import * as _ from 'lodash'

export async function handleGetFile(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { filename } = req.params
        const { user } = req as any
        const file = await FileProvider.getOne(
            {
                name: filename,
            },
            ['permissions']
        )

        if (!file) {
            return res.sendStatus(404)
        }
        let canSeeFile = false
        if (file.isPublic) canSeeFile = true
        else {
            if (
                file.owner === _.get(user, '_id') ||
                file.permissions.some(
                    (p) =>
                        p.of === _.get(user, '_id') &&
                        p.for === file._id &&
                        ['read', 'all'].includes(p.action)
                )
            ) {
                canSeeFile = true
            }
        }

        if (canSeeFile) {
            res.sendFile(file.path)
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        return next(error)
    }
}
