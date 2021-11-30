const rateLimit = require('express-rate-limit');
const { messages } = require('./errors');

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1rps ( 600 requests per 10 min per ip)
  max: 600,
  message: messages.rpsOverlimit,
});

module.exports = rateLimiter;
