import { Currency } from '../types/Currency';

export const convert = (value: string, currency: Currency): string => {
    const { Cur_OfficialRate, Cur_Scale } = currency;
    const calculated = Number(value) / Cur_OfficialRate * Cur_Scale;

    return calculated.toFixed(2).replace(/\.?0+$/, '');
};
