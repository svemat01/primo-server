import * as puppeteer from 'puppeteer';

import { logger } from '../logger';
import { printers } from '../printers';
import { PrinterDataType, PrinterStatusType } from '../types/printerInfo';
import { emulatePrinterPage } from './emulatePrinterPage';
import { readStaticPage } from './readStaticPage';

export const readPrinterInfo = async (): Promise<PrinterStatusType> => {
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

                try {
                    printerStatuses[individualPrinter.name] = {
                        type: printerType,
                        colors: await emulatePrinterPage(
                            emulatedBrowser,
                            printerData
                        ),
                    };
                } catch {
                    printerStatuses[individualPrinter.name] = {
                        type: printerType,
                    };
                }
            } else {
                try {
                    console.log(
                        `Reading printer ${individualPrinter.name} using HTML.`
                    );
                    printerStatuses[individualPrinter.name] = {
                        type: printerType,
                        colors: await readStaticPage(printerData),
                    };
                } catch {
                    printerStatuses[individualPrinter.name] = {
                        type: printerType,
                    };
                }
            }
        }
    }

    await emulatedBrowser.close();

    return printerStatuses;
};
