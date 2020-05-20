import fs from "fs";
import { execSync } from "child_process";
import multer from "multer";
import path from "path";
import { Request } from "express";
import CustomErorr from "@/utils/error/custom-error";
import errors from "@/constant/errors";

// Setup multer
const uploadPath = process.env.UPLOAD_PATH;
const MIME_TYPE_MAP = [
    /image\/(jpg|jpeg|png|gif)/,
    /video\/*/,
    /audio\/*/,
    /\.zip/,
    /text\/*/,
    /application\/*/,
];

// Storage
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();
        const { user } = req as any;
        const arr = [];
        // Prepare upload dir
        if (user) {
            const userPath = user.username;
            const timePath = `${now.getFullYear()}-${now.getMonth() + 1}`;
            arr.push("private", userPath, timePath);
        } else {
            arr.push("anonymus");
        }
        const des = path.join(uploadPath, ...arr);
        execSync(`mkdir -p ${des}`);
        cb(null, des);
    },
    filename: (req, file, cb) => {
        const { name, ext } = path.parse(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}-${name}${ext}`;
        cb(null, filename);
    },
});

function fileFilter(req: Request, file: Express.Multer.File, cb) {
    if (!MIME_TYPE_MAP.find((mimetype) => mimetype.test(file.mimetype))) {
        return cb(new CustomErorr(errors.UPLOAD.FILE_NOT_SUPPORT), false);
    }
    cb(null, true);
}

export default multer({ storage, fileFilter });
