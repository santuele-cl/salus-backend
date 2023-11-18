import rateLimit from "express-rate-limit";
import { logEvents } from "./logger.middleware.js";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 login request per IP per window per minute
  message: {
    message:
      "Login attempts per minute reached. Try again later after 1 minute.",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "error.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
  legacyHeaders: false, // Disable the "X-RateLimit-*" headers
});

export default loginLimiter;
