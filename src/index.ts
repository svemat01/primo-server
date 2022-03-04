import { logger } from './logger';
import readline = require('readline');

import * as express from 'express';

import { V1Router } from './api/v1';
import { loadLastOutput } from './printerReader/loadLastOutput';
import { printerJob } from './printerReader/readerJob';
import cors = require('cors');

// eslint-disable-next-line unused-imports/no-unused-vars
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

export const app = express();

app.use(cors());

app.use('/v1', V1Router);

(async () => {
    logger.info('Initializing');

    loadLastOutput();

    printerJob.start();

    logger.info('Starting web server');
    app.listen(3000);
})();
