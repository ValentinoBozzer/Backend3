const winston = require('winston');
const path = require('path');

const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: 'blue',
        http: 'green',
        info: 'cyan',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
};

winston.addColors(customLevels.colors);

const customFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

const createLogger = (env) => {
    const transports = [
        new winston.transports.Console({
            level: env === 'development' ? 'debug' : 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, ...meta }) => {
                    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
                })
            )
        })
    ];

    if (env === 'production') {
        transports.push(
            new winston.transports.File({
                filename: path.join(__dirname, '../logs/errors.log'),
                level: 'error',
                format: customFormat,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                tailable: true
            })
        );
    }

    return winston.createLogger({
        levels: customLevels.levels,
        format: customFormat,
        transports,
        exitOnError: false
    });
};

const logger = createLogger(process.env.NODE_ENV || 'development');

module.exports = logger; 