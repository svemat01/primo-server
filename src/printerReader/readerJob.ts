import { CronJob } from 'cron';
import { writeFileSync } from 'node:fs';

import { logger } from '../logger';
import { getPrinterStatuses, setPrinterStatuses } from './printerStatuses';
import { readPrinterInfo } from './readPrinters';

export const printerJob = new CronJob(
    '* 0 12 * * *',
    async () => {
        logger.info('Checking all printers');

        try {
            const data = await readPrinterInfo();

            setPrinterStatuses({
                updatedAt: new Date(),
                data,
            });
        } catch (error) {
            logger.error(`Failure updating printer statuses: ${error}`);
        }

        logger.debug(getPrinterStatuses());

        logger.info('Writing printer statuses to file');
        writeFileSync('output.json', JSON.stringify(getPrinterStatuses()));
    },
    undefined,
    false,
    'Europe/Stockholm',
    undefined,
    false
);
