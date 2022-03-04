import * as puppeteer from 'puppeteer';

import { logger } from '../logger';
import { InkStatusType, PrinterDataType } from '../types/printerInfo';

export const emulatePrinterPage = async (
    browser: puppeteer.Browser,
    printer: PrinterDataType
): Promise<InkStatusType | undefined> => {
    const page = await browser.newPage();

    await page.goto(printer.url);
    await page.screenshot({ path: 'example.png' });

    if (printer.preparePage) {
        try {
            await printer.preparePage(page);
        } catch {
            logger.error(`Failed preparing page for ${printer.name}`);

            return;
        }
    }

    const status: InkStatusType = {};

    for (const [color, element] of Object.entries(printer.elements)) {
        let HTMLelement: puppeteer.ElementHandle;
        let value: string;

        try {
            await page.waitForSelector(element);
            HTMLelement = await page.$(element);

            value = await (printer.colorInterpreter
                ? printer.colorInterpreter(HTMLelement)
                : HTMLelement.evaluate((element_) => element_.textContent));
        } catch {
            logger.error(`${printer.name} ${color} not found`);
            continue;
        }

        value = value.trim();

        if (printer.prepareColor) {
            value = printer.prepareColor(value);
        }

        value = value.match(/\d+/g)?.at(0);

        status[color] = Number.parseInt(value);
    }
    // await waitForNext();
    await page.close();

    return status;
};
