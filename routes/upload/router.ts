import { Router } from "express";
import * as service from "./service";
const router = Router();
import AuthGuard from "@/middlewares/guard";
import upload from "@/services/upload";
// ------- Declare router -------
router.post(
    "/multiple",
    AuthGuard(),
    upload.array("files"),
    service.handleUploadMultiple
);

router.post(
    "/single",
    AuthGuard(),
    upload.single("file"),
    service.handleUploadSingle
);
// ------------------------------
export default router;
