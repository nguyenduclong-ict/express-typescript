import { Request, Response, NextFunction } from "express";
import UserProvider from "@/data/User/provider";
import jwt from "@/services/auth/token";
import bcrypt from "@/services/auth/bcrypt";
import { pick } from "lodash";
import * as _ from "lodash";
import axios from "axios";
import CustomError from "@/lib/core/error/custom-error";
import errors from "@/constant/errors";

export async function handleRegister(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { username, password } = req.body;
        const data = {
            username,
            password: bcrypt.hash(password),
        };
        const user = await UserProvider.createOne(data);
        return res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Register error", error);
        return next(error);
    }
}

export async function handleLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { username, password } = req.body;
        const user = await UserProvider.getOne({ username });
        if (!user) {
            throw new CustomError(errors.AUTH.USER_NOT_FOUND);
        }
        if (!bcrypt.compare(password, user.password)) {
            throw new CustomError(errors.AUTH.PASSWORD_WRONG);
        }
        if (user.isBlock) {
            throw new CustomError(errors.AUTH.ACCOUNT_BLOCK);
        }
        const token = jwt.sign({ _id: user._id });
        await UserProvider.updateOne(
            { _id: user._id },
            { $push: { tokens: token } }
        );
        return res.json({
            user,
            token,
            success: true,
        });
    } catch (error) {
        console.error("Login error", error);
        return res.status(error.code || 500).json({
            message: error.message,
            data: error.data,
        });
    }
}

export async function handleGetInfo(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = _.get(req, "user");
    if (!user) {
        return next(new CustomError(errors.AUTH.LOGIN_REQUIRED));
    }
    return res.json(user);
}

export async function handleLogout(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = _.get(req, "user");
    if (!user) {
        return next(new CustomError(errors.AUTH.LOGIN_REQUIRED));
    }
    const token = req.headers.authorization.split("Bearer ").pop();
    await UserProvider.updateOne(
        { username: user.username },
        { $pull: { tokens: token } }
    );
    return res.json({ success: true, loggedIn: false });
}

export async function handleLoginWithFacebook(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const endpoint = process.env.FACEBOOK_API + "/me";
    try {
        const response = await axios.get(endpoint, {
            params: {
                fields: "id,email,name,picture{url}",
                access_token: req.body.token,
            },
        });
        const { id, email, name, picture } = response.data;
        let user = await UserProvider.getOne({ facebook: id });
        if (!user) {
            // create user if not exist, user as shopAdmin
            user = await UserProvider.createShopAdmin({
                facebook: id,
                info: {
                    name,
                    image: _.get(picture, "data.url"),
                },
            });
        }
        const token = jwt.sign({ _id: user._id });
        user = await UserProvider.updateOne(
            { _id: user._id },
            { $push: { tokens: token } }
        );
        return res.json({ token, user, success: true });
    } catch (error) {
        console.log(error);
        next(new CustomError(errors.AUTH.LOGIN_FAILURE));
    }
}

export async function handleChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { user } = req as any;
    const newPassword = bcrypt.hash(req.body.password);
    try {
        const result = await UserProvider.updateOne(user._id, {
            password: newPassword,
        });
        return res.json(result);
    } catch (error) {
        // MError handle
        return next(error);
    }
}

export async function handleLoginWithGoogle(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return;
}

export async function handleUpdateUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data = pick(req.body, ["info", "email"]);
        const user: any = (req as any).user;
        const rs = await UserProvider.updateOne({ _id: user._id }, data);
        return res.json({ success: true, user: rs });
    } catch (error) {
        console.log("Update User info error", error);
        return next(error);
    }
}
