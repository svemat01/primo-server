import { readFileSync } from 'node:fs';

import { logger } from '../logger';
import { setPrinterStatuses } from './printerStatuses';

export const loadLastOutput = (): string => {
    logger.info('Loading last output');
    const lastOutput = readFileSync('output.json', 'utf8');

    try {
        setPrinterStatuses(JSON.parse(lastOutput));
        logger.info('Loaded last output');
    } catch (error) {
        logger.error(`Failure loading last output: ${error.message}`);
    }

    return lastOutput;
};
