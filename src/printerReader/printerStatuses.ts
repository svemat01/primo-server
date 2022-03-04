import { OutputType } from '../types/printerInfo';

// eslint-disable-next-line prefer-const
export let printerStatuses: OutputType = {
    updatedAt: new Date(),
    data: {},
};

export const setPrinterStatuses = (data: OutputType) => {
    printerStatuses = data;
};

export const getPrinterStatuses = () => {
    return printerStatuses;
};
