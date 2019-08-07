// index

import helmet from "helmet";

import express, { Router } from "express";

import "./configs/dotenv.config";

import logger from "./configs/winstom.config";

import { trmController, errorHandler } from "./controllers";
import { startCronJob } from "./crons/trm.cron";

// //constrollers
const router = Router();
router.use("/trm", trmController);

const app = express();
//configs
app.use(helmet());
app.use(express.json());
app.use(router);
app.use('/public', express.static('public'));
errorHandler(app);

export const server = app.listen(process.env.PORT, () => {
  logger.info(`================================================`);
  logger.info(`Server is running...`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`Port: ${process.env.PORT}`);
  startCronJob();
});
export const stop = () => {
  server.close();
};
