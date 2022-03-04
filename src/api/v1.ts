import * as express from 'express';

import { logger } from '../logger';
import { getPrinterStatuses } from '../printerReader/printerStatuses';

export const V1Router = express.Router();

V1Router.get('/status', (request, response) => {
    logger.debug('Received request for printer statuses');
    response.send(getPrinterStatuses());
});
