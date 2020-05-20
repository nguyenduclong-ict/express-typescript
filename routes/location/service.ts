import { Request, Response, NextFunction } from "express";
import LocationProvider from "@/data/Location/provider";
export async function handleGetListLocation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const list = await LocationProvider.getMany({}, { pagination: false });
    return res.json(list);
}
