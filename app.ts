import express from "express";
import http from "http";

import logger from "morgan";
import cors from "cors";

export const app = express();
// ===============================
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.env.STATIC_PATH));
// ===============================
export const server = http.createServer(app);
