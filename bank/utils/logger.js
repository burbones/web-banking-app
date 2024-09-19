const pino = require('pino');

const logger = pino(
    {
        timestamp: () => `",timestamp":"${new Date(Date.now()).toISOString()}"`,
        level: process.env.PINO_LOG_LEVEL || 'info',
        redact: ['password', 'hashedPassword', 'phone']
    }
);

module.exports = logger;