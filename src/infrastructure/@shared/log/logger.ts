import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, json, prettyPrint } = format;

const logger = createLogger({
    format: combine(
        label({ label: 'default logger' }),
        timestamp(),
        json(),
        prettyPrint()
    ),
    level: 'info',
    transports: [new transports.Console()],
});

export default logger;
