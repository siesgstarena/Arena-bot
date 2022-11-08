const { createLogger, format: {
  combine, timestamp, label, prettyPrint,colorize, printf
}, transports } = require('winston');

const infoLog = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'info' }),
    timestamp('YYYY-MM-DD HH:mm:ss'),
    prettyPrint(),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(
        colorize(),
        printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
});

const errorLog = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'error' }),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console({
      level: 'error',
      format: combine(
        printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
});

module.exports = {
  log:infoLog,
  error:errorLog,
};