"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const custom_error_1 = __importDefault(require("@/utils/error/custom-error"));
const errors_1 = __importDefault(require("@/constant/errors"));
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
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();
        const { user } = req;
        const arr = [];
        // Prepare upload dir
        if (user) {
            const userPath = user.username;
            const timePath = `${now.getFullYear()}-${now.getMonth() + 1}`;
            arr.push("private", userPath, timePath);
        }
        else {
            arr.push("anonymus");
        }
        let uPath = "";
        arr.forEach((e) => {
            uPath = path_1.default.join(uPath, e);
            const pp = path_1.default.join(uploadPath, uPath);
            if (!fs_1.default.existsSync(pp)) {
                fs_1.default.mkdirSync(pp, "774");
            }
        });
        cb(null, path_1.default.join(uploadPath, ...arr));
    },
    filename: (req, file, cb) => {
        const { name, ext } = path_1.default.parse(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}-${name}${ext}`;
        cb(null, filename);
    },
});
function fileFilter(req, file, cb) {
    if (!MIME_TYPE_MAP.find((mimetype) => mimetype.test(file.mimetype))) {
        return cb(new custom_error_1.default(errors_1.default.UPLOAD.FILE_NOT_SUPPORT), false);
    }
    cb(null, true);
}
exports.default = multer_1.default({ storage: exports.storage, fileFilter });
