import "./env.js";
import express from "express";
import cors from "cors";
import winston from "winston";
import responseTime from "response-time";
import animalRouter from "./routes/animal.route.js";
import proprietarioRouter from "./routes/proprietario.route.js";
import { redisConnect } from "./middleware/redis.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "petshop-api.log" }),
  ],
  format: combine(label({ label: "petshop-api" }), timestamp(), myFormat),
});

redisConnect();

const app = express();
app.use(express.json());
app.use(cors());
app.use(responseTime());
app.use("/animal", animalRouter);
app.use("/proprietario", proprietarioRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});
app.listen(3000, () => console.log("API Started!"));
