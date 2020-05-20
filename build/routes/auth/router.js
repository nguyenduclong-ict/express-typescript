"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service = __importStar(require("./service"));
const router = express_1.Router();
const guard_1 = __importDefault(require("@/middlewares/guard"));
// ------- Declare router -------
router.post("/register", service.handleRegister);
router.post("/login", service.handleLogin);
router.post("/google", service.handleLoginWithGoogle);
router.post("/facebook", service.handleLoginWithFacebook);
router.get("/me", guard_1.default(), service.handleGetInfo);
router.post("/logout", guard_1.default(), service.handleLogout);
// profile
router.post("/me", guard_1.default(), service.handleUpdateUserInfo);
// ------------------------------
exports.default = router;
