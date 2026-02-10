import logger from "../lib/logger.js";

export const requestLoggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    // Only log success requests
    if (res.statusCode < 400) {
      logger.info("HTTP Request", {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${duration}ms`,
      });
    }
  });

  next();
};

export const errorLoggerMiddleware = (err, req, res, next) => {
  logger.error("Login error", {
    errorMessage: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
