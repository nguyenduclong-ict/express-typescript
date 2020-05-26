import { Request, Response, NextFunction } from 'express'
import path from 'path'
import FileProvider from '@/data/File/provider'

export async function handleUploadMultiple(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const promises = []
    const { user } = req as any
    const { isPublic, owner } = req.body
    try {
        ;(req as any).files?.forEach(async (element, i) => {
            const f = {
                name: element.filename,
                path: element.path,
                type: element.mimetype.split('/').shift(),
                ext: path.extname(element.filename),
                owner: owner || (user && user._id),
                isPublic,
            }
            promises.push(FileProvider.createOne(f))
        })

        Promise.all(promises).then((result) => {
            return res.json(result)
        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

export async function handleUploadSingle(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.json({ success: true })
}
