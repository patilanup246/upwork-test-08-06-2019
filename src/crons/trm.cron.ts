import { TransferwiseConverter } from "../services/TransferwiseConverter";
import { ICurrencyConverter } from "../services/ICurrencyConverter";
import { TRM, Currency } from "../models/TRM";
import { IDAL } from "../dal/IDAL";
import { TrmDAL } from "../dal/TrmDAL";
import logger from "../configs/winstom.config";
const converter: ICurrencyConverter = new TransferwiseConverter();
const trmDAL: IDAL<TRM> = new TrmDAL();
const CronJob = require("cron").CronJob;

// every day at 7 AM
const cronPattern = "0 0 7 1/1 * *";
const everySecondCronJob = new CronJob(cronPattern, async () => {
  try {
    const result = await converter.GetLastConversionRate(
      Currency.USD,
      Currency.UYU
    );
    trmDAL.InsertRecords([result]);
  } catch (err) {
    logger.log("cron error: ", err.message);
  }
});

export const startCronJob = () => {
  everySecondCronJob.start();
};
