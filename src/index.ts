import axios from 'axios';
import cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

import { printers } from './printers';
import { InkStatusType, PrinterInfoType } from './types/printerInfo';

const readStaticPage = async (
    printer: PrinterInfoType
): Promise<InkStatusType> => {
    const printerPage = await axios({
        method: 'GET',
        url: printer.url,
    });
    const root = cheerio.load(printerPage.data);

    const status: InkStatusType = {};

    // printer.elements.forEach(async (element) => {
    //     let colorValue;
    //     let part;

    //     colorValue = cheerio.text(root(element.colorSelector)).trim();

    //     if (printer.prepareColor) {
    //         colorValue = printer.prepareColor(colorValue);
    //     }

    //     if (element.partSelector) {
    //         part = cheerio.text(root(element.partSelector)).trim();

    //         if (printer.preparePart) {
    //             part = printer.preparePart(part);
    //         }
    //     }

    //     status[element.color!] = {
    //         level: colorValue,
    //         part,
    //     };
    // });

    for (const element of printer.elements) {
        let colorValue;
        let part;

        colorValue = cheerio.text(root(element.colorSelector)).trim();

        if (printer.prepareColor) {
            colorValue = printer.prepareColor(colorValue);
        }

        if (element.partSelector) {
            part = cheerio.text(root(element.partSelector)).trim();

            if (printer.preparePart) {
                part = printer.preparePart(part);
            }
        }

        status[element.color!] = {
            level: colorValue,
            part,
        };
    }

    return status;
};

const emulatePrinterPage = async (
    browser: puppeteer.Browser,
    printer: PrinterInfoType
): Promise<InkStatusType> => {
    const page = await browser.newPage();

    await page.goto(printer.url);
    await page.screenshot({ path: 'example.png' });

    const status: InkStatusType = {};

    for (const element of printer.elements) {
        await page.waitForSelector(element.colorSelector);
        const HTMLelement = await page.$(element.colorSelector);
        let value = await HTMLelement.evaluate(
            (element_) => element_.textContent
        );

        value = value.trim();
        let part;

        if (printer.prepareColor) {
            value = printer.prepareColor(value);
        }

        if (element.partSelector) {
            const HTMLelement = await page.$(element.partSelector);

            part = await HTMLelement.evaluate(
                (element_) => element_.textContent
            );
            part = part.trim();

            if (printer.preparePart) {
                part = printer.preparePart(part);
            }
        }

        status[element.color!] = {
            level: value,
            part,
        };
    }

    await page.close();

    return status;
};

const readPrinterInfo = async () => {
    const printerStatuses: {
        [key: string]: {
            type: string;
            colors: InkStatusType;
        };
    } = {};

    const emulatedBrowser = await puppeteer.launch();

    for (const printer of printers) {
        if (printer.emulate) {
            console.log(`Reading printer ${printer.name} using puppeteer.`);
            printerStatuses[printer.name] = {
                type: printer.type,
                colors: await emulatePrinterPage(emulatedBrowser, printer),
            };
        } else {
            try {
                console.log(`Reading printer ${printer.name} using HTML.`);
                printerStatuses[printer.name] = {
                    type: printer.type,
                    colors: await readStaticPage(printer),
                };
            } catch (error) {
                console.log(error);
            }
        }
    }

    await emulatedBrowser.close();

    console.log(printerStatuses);
    console.log(JSON.stringify(printerStatuses));
};

(async () => {
    await readPrinterInfo();
})();
