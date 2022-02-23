import axios from 'axios';
import cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

import { logger } from './logger';
import { printers } from './printers';
import {
    InkStatusType,
    PrinterDataType,
    PrinterStatusType,
} from './types/printerInfo';
import readline = require('readline');

import { writeFileSync } from 'node:fs';

function waitForNext() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question('enter for continue', (ans) => {
            rl.close();
            resolve(ans);
        })
    );
}

const readStaticPage = async (
    printer: PrinterDataType
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

    for (const [color, element] of Object.entries(printer.elements)) {
        let colorValue;
        let part;

        colorValue = cheerio.text(root(element)).trim();

        if (printer.prepareColor) {
            colorValue = printer.prepareColor(colorValue);
        }

        // if (element.partSelector) {
        //     part = cheerio.text(root(element.partSelector)).trim();

        //     if (printer.preparePart) {
        //         part = printer.preparePart(part);
        //     }
        // }

        status[color] = Number.parseInt(colorValue);
    }

    return status;
};

const emulatePrinterPage = async (
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

        // if (element.partSelector) {
        //     let HTMLelement: puppeteer.ElementHandle;
        //     let shouldContinue = true;

        //     try {
        //         HTMLelement = await page.$(element.partSelector);
        //     } catch {
        //         logger.error(`${printer.name} ${color} part not found`);
        //         shouldContinue = false;
        //     }

        //     if (shouldContinue) {
        //         part = await HTMLelement.evaluate(
        //             (element_) => element_.textContent
        //         );
        //         part = part.trim();

        //         if (printer.preparePart) {
        //             part = printer.preparePart(part);
        //         }
        //     }
        // }

        status[color] = Number.parseInt(value);
    }
    // await waitForNext();
    await page.close();

    return status;
};

const readPrinterInfo = async () => {
    const printerStatuses: PrinterStatusType = {};

    const emulatedBrowser = await puppeteer.launch();

    for (const [printerType, printerTypeData] of Object.entries(printers)) {
        logger.info(`Checking all ${printerType} printers`);

        for (const individualPrinter of printerTypeData.printers) {
            const printerData: PrinterDataType = {
                name: individualPrinter.name,
                url: individualPrinter.url,
                elements: printerTypeData.elements,
                colorInterpreter: printerTypeData.colorInterpreter,
                prepareColor: printerTypeData.prepareColor,
                preparePage: printerTypeData.preparePage,
            };

            if (printerTypeData.emulate) {
                console.log(
                    `Reading printer ${individualPrinter.name} using puppeteer.`
                );

                printerStatuses[individualPrinter.name] = {
                    type: printerType,
                    colors: await emulatePrinterPage(
                        emulatedBrowser,
                        printerData
                    ),
                };
            } else {
                try {
                    console.log(
                        `Reading printer ${individualPrinter.name} using HTML.`
                    );
                    printerStatuses[individualPrinter.name] = {
                        type: printerType,
                        colors: await readStaticPage(printerData),
                    };
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    // for (const printer of printers) {
    //     if (printer.emulate) {
    //         console.log(`Reading printer ${printer.name} using puppeteer.`);
    //         printerStatuses[printer.name] = {
    //             type: printer.type,
    //             colors: await emulatePrinterPage(emulatedBrowser, printer),
    //         };
    //     } else {
    //         try {
    //             console.log(`Reading printer ${printer.name} using HTML.`);
    //             printerStatuses[printer.name] = {
    //                 type: printer.type,
    //                 colors: await readStaticPage(printer),
    //             };
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    await emulatedBrowser.close();

    console.log(JSON.stringify(printerStatuses));
    logger.info(printerStatuses);

    writeFileSync('output.json', JSON.stringify(printerStatuses));
};

(async () => {
    logger.info('Starting');
    await readPrinterInfo();
})();
