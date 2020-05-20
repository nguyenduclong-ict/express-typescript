"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = __importDefault(require("@/data/User/provider"));
const token_1 = __importDefault(require("@/services/auth/token"));
const bcrypt_1 = __importDefault(require("@/services/auth/bcrypt"));
const lodash_1 = require("lodash");
const _ = __importStar(require("lodash"));
const axios_1 = __importDefault(require("axios"));
const custom_error_1 = __importDefault(require("@/utils/error/custom-error"));
const errors_1 = __importDefault(require("@/constant/errors"));
function handleRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const data = {
                username,
                password: bcrypt_1.default.hash(password),
            };
            const user = yield provider_1.default.createOne(data);
            return res.json({
                success: true,
                user,
            });
        }
        catch (error) {
            console.error("Register error", error);
            return next(error);
        }
    });
}
exports.handleRegister = handleRegister;
function handleLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield provider_1.default.getOne({ username });
            if (!user) {
                throw new custom_error_1.default(errors_1.default.AUTH.USER_NOT_FOUND);
            }
            if (!bcrypt_1.default.compare(password, user.password)) {
                throw new custom_error_1.default(errors_1.default.AUTH.PASSWORD_WRONG);
            }
            if (user.isBlock) {
                throw new custom_error_1.default(errors_1.default.AUTH.ACCOUNT_BLOCK);
            }
            const token = token_1.default.sign({ _id: user._id });
            yield provider_1.default.updateOne({ _id: user._id }, { $push: { tokens: token } });
            return res.json({
                user,
                token,
                success: true,
            });
        }
        catch (error) {
            console.error("Login error", error);
            return res.status(error.code || 500).json({
                message: error.message,
                data: error.data,
            });
        }
    });
}
exports.handleLogin = handleLogin;
function handleGetInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = _.get(req, "user");
        if (!user) {
            return next(new custom_error_1.default(errors_1.default.AUTH.LOGIN_REQUIRED));
        }
        return res.json(user);
    });
}
exports.handleGetInfo = handleGetInfo;
function handleLogout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = _.get(req, "user");
        if (!user) {
            return next(new custom_error_1.default(errors_1.default.AUTH.LOGIN_REQUIRED));
        }
        const token = req.headers.authorization.split("Bearer ").pop();
        yield provider_1.default.updateOne({ username: user.username }, { $pull: { tokens: token } });
        return res.json({ success: true, loggedIn: false });
    });
}
exports.handleLogout = handleLogout;
function handleLoginWithFacebook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = process.env.FACEBOOK_API + "/me";
        try {
            const response = yield axios_1.default.get(endpoint, {
                params: {
                    fields: "id,email,name,picture{url}",
                    access_token: req.body.token,
                },
            });
            const { id, email, name, picture } = response.data;
            let user = yield provider_1.default.getOne({ facebook: id });
            if (!user) {
                // create user if not exist, user as shopAdmin
                user = yield provider_1.default.createShopAdmin({
                    facebook: id,
                    info: {
                        name,
                        image: _.get(picture, "data.url"),
                    },
                });
            }
            const token = token_1.default.sign({ _id: user._id });
            user = yield provider_1.default.updateOne({ _id: user._id }, { $push: { tokens: token } });
            return res.json({ token, user, success: true });
        }
        catch (error) {
            console.log(error);
            next(new custom_error_1.default(errors_1.default.AUTH.LOGIN_FAILURE));
        }
    });
}
exports.handleLoginWithFacebook = handleLoginWithFacebook;
function handleChangePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const newPassword = bcrypt_1.default.hash(req.body.password);
        try {
            const result = yield provider_1.default.updateOne(user._id, {
                password: newPassword,
            });
            return res.json(result);
        }
        catch (error) {
            // MError handle
            return next(error);
        }
    });
}
exports.handleChangePassword = handleChangePassword;
function handleLoginWithGoogle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
exports.handleLoginWithGoogle = handleLoginWithGoogle;
function handleUpdateUserInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = lodash_1.pick(req.body, ["info", "email"]);
            const user = req.user;
            const rs = yield provider_1.default.updateOne({ _id: user._id }, data);
            return res.json({ success: true, user: rs });
        }
        catch (error) {
            console.log("Update User info error", error);
            return next(error);
        }
    });
}
exports.handleUpdateUserInfo = handleUpdateUserInfo;
