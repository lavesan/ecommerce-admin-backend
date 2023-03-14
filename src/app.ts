import "reflect-metadata";
import "express-async-errors";

import express from "express";
import cors from "cors";

import "./shared/container";
import { router } from "./routes";
import { AppError } from "./shared/errors/AppError";
import { createConnection } from "@config/mongo";

const app = express();

createConnection();

app.use(cors());
app.use(express.json());

app.use("/v1", router);

app.use(
  (
    err: Error,
    request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    console.log("Error: ", err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Erro interno do servidor - ${err.message} `,
    });
  }
);

export { app };
