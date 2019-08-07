import { TRM } from "../models/TRM";

export interface ICurrencyConverter {
    GetConversionRateHistory(source: string, target: string): Promise<TRM[]> 
    GetLastConversionRate(source: string, target: string): Promise<TRM>
}

