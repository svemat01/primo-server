import { createLogger, shimLog } from '@lvksh/logger';
import chalk = require('chalk');

export const logger = createLogger({
    debug: chalk.blueBright`debug`,
    info: chalk.green`info`,
    error: chalk.red`error`,
});

shimLog(logger, 'debug');
