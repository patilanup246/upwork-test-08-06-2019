
import * as rp from "request-promise-native";
import { ICurrencyConverter } from "./ICurrencyConverter";
import { TRM, Currency } from "../models/TRM";
export class TransferwiseConverter implements ICurrencyConverter {
    async GetConversionRateHistory(source: Currency, target: Currency): Promise<TRM[]> {
        const url = `https://transferwise.com/gb/currency-converter/api/historic?source=${source}&target=${target}&period=30`;
        try {
            return await rp.get(url, { json: true });
        }
        catch (err) {
            throw err;
        }
    }
    async GetLastConversionRate(source: Currency, target: Currency): Promise<TRM> {
        const lastConversionResult = await this.GetConversionRateHistory(source, target);
        return lastConversionResult[0];
    }
}
