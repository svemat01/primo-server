import axios from 'axios';
import cheerio from 'cheerio';

import { InkStatusType, PrinterDataType } from '../types/printerInfo';
export const readStaticPage = async (
    printer: PrinterDataType
): Promise<InkStatusType> => {
    const printerPage = await axios({
        method: 'GET',
        url: printer.url,
    });
    const root = cheerio.load(printerPage.data);

    const status: InkStatusType = {};

    for (const [color, element] of Object.entries(printer.elements)) {
        let colorValue;

        colorValue = cheerio.text(root(element)).trim();

        if (printer.prepareColor) {
            colorValue = printer.prepareColor(colorValue);
        }

        status[color] = Number.parseInt(colorValue);
    }

    return status;
};
