import express from "express";
import cors from "cors";
import {carRouter} from "./routes/cars.js";
import {userRouter} from "./routes/users.js";
import {authRouter} from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();


function errorHandler(error, req, res) {
    console.log(error);
    if (error.name === "ValidationError") {
        return res.status(400).json({error: "Validation error", errors: error.errors});
    }

    res.status(500).json({error: error.message});
}

export function createServer() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use("/cars", carRouter);
    app.use("/users", userRouter);
    app.use("/auth", authRouter);
    app.use(errorHandler);

    return app;
}